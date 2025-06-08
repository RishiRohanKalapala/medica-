
import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { Message } from "../types/chat";
import { generateId } from "../utils/chatUtils";
import { fetchMedicalArticles, generateDiagnosisAnalysis } from "../utils/apiUtils";
import { useToast } from "@/hooks/use-toast";
import { extractDrugNamesFromText } from "../utils/pharmacyDataset";

interface ChatProps {
  onAnalysisUpdate: (analysis: Awaited<ReturnType<typeof generateDiagnosisAnalysis>>) => void;
}

const Chat: React.FC<ChatProps> = ({ onAnalysisUpdate }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Add welcome message when component mounts
    const welcomeMessage: Message = {
      id: generateId(),
      content: "Hello! I'm ymptoms or medication inquiries, and I'll help analyze possible conditions and suggest relevant medications.\n\nRemember, this is for educational purposes only and should not replace professional medical or pharmaceutical advice.",
      role: "assistant",
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = async (content: string) => {
    if (isProcessing) {
      toast({
        title: "Processing in progress",
        description: "Please wait while I process your previous message.",
        variant: "destructive",
      });
      return;
    }
    
    // Add user message to chat
    const userMessage: Message = {
      id: generateId(),
      content,
      role: "user",
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsTyping(true);
    setIsProcessing(true);
    
    try {
      // Extract drugs for visual feedback
      const extractedDrugs = extractDrugNamesFromText(content);
      let acknowledgmentContent = "Analyzing your input...";
      
      if (extractedDrugs.length > 0) {
        acknowledgmentContent = `Analyzing medications: ${extractedDrugs.join(", ")}...`;
      }
      
      // First show an immediate acknowledgment
      const acknowledgmentMessage: Message = {
        id: generateId(),
        content: acknowledgmentContent,
        role: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, acknowledgmentMessage]);
      
      // Fetch medical articles in parallel with diagnosis generation
      const articlesPromise = fetchMedicalArticles(content);
      const diagnosisPromise = generateDiagnosisAnalysis(content);
      
      // Process diagnosis results first
      const diagnosis = await diagnosisPromise;
      
      // Update the analysis display in the parent component
      onAnalysisUpdate(diagnosis);
      
      // Create bot response content based on the analysis
      let responseContent = createBotResponseContent(content, diagnosis);
      
      // Remove the "analyzing" message
      setMessages(prevMessages => prevMessages.filter(msg => msg.id !== acknowledgmentMessage.id));
      
      // Get the articles results
      const articles = await articlesPromise;
      
      // Add a mention of the retrieved articles
      if (articles.length > 0) {
        responseContent += "\n\nI've also retrieved some relevant pharmaceutical literature that might be helpful for your understanding. You can review them in the Medical Literature section.";
      }
      
      // Create and add final bot response
      const botResponse: Message = {
        id: generateId(),
        content: responseContent,
        role: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
    } catch (error) {
      console.error("Error during analysis:", error);
      toast({
        title: "Analysis Error",
        description: "There was an error analyzing the input. Please try again.",
        variant: "destructive",
      });
      
      // Add error message
      const errorMessage: Message = {
        id: generateId(),
        content: "I'm sorry, I encountered an issue while analyzing your request. Please try again or provide more details about the medications or symptoms.",
        role: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsProcessing(false);
    }
  };

  const createBotResponseContent = (
    userInput: string, 
    analysis: Awaited<ReturnType<typeof generateDiagnosisAnalysis>>
  ): string => {
    let response = "Based on your query, here's my pharmaceutical analysis:\n\n";
    
    // Extract drug names for improved explanation
    const extractedDrugs = extractDrugNamesFromText(userInput);
    if (extractedDrugs.length > 0) {
      response += `**Identified medications:** ${extractedDrugs.join(", ")}\n\n`;
    }
    
    if (analysis.diagnoses.length > 0) {
      response += "**Relevant conditions:**\n";
      analysis.diagnoses.forEach(diagnosis => {
        const probability = Math.round(diagnosis.probability * 100);
        response += `- ${diagnosis.condition} (${probability}% relevance)\n`;
      });
      response += "\n";
    } else {
      response += "I couldn't identify any specific conditions based on the information provided. Please provide more details about the symptoms or medications.\n\n";
    }
    
    if (analysis.medications.length > 0) {
      response += "**Recommended medications:**\n";
      analysis.medications.slice(0, 3).forEach(med => {
        response += `- ${med.name}: ${med.dosage}\n`;
      });
      response += "\n";
    }
    
    response += "**Pharmaceutical advice:**\n";
    response += analysis.advice;
    
    return response;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-2" id="chat-messages">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messageEndRef} />
      </div>
      <div className="p-4 border-t border-gray-200 bg-white">
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping || isProcessing} />
      </div>
    </div>
  );
};

export default Chat;
