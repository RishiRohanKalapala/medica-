
import React from "react";
import { Message } from "../types/chat";
import { cn } from "@/lib/utils";
import { User, Stethoscope } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatMessageProps {
  message: Message;
}

const formatContent = (content: string): React.ReactNode => {
  // Convert markdown-style formatting to JSX
  const parts = content.split(/(\*\*.*?\*\*|\n)/g);
  
  return parts.map((part, index) => {
    // Bold text
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    // Line breaks
    else if (part === '\n') {
      return <br key={index} />;
    }
    // Regular text
    else {
      return <span key={index}>{part}</span>;
    }
  });
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={cn(
      "flex w-full mb-4 message-appear",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "flex gap-3 max-w-[90%]",
        isUser && "flex-row-reverse"
      )}>
        <div className="flex-shrink-0 mt-1">
          <Avatar className={cn(
            "h-8 w-8",
            isUser ? "bg-blue-600" : "bg-medical-primary"
          )}>
            <AvatarFallback className="text-white">
              {isUser ? <User size={14} /> : <Stethoscope size={14} />}
            </AvatarFallback>
          </Avatar>
        </div>
        
        <Card className={cn(
          "shadow-sm border-0",
          isUser ? "bg-blue-600 text-white" : "bg-white border border-blue-100"
        )}>
          <CardContent className={cn(
            "p-3 text-sm",
            isUser ? "text-white" : "text-gray-800"
          )}>
            <div className="whitespace-pre-wrap">
              {formatContent(message.content)}
            </div>
            <div className={cn(
              "text-[10px] mt-1 text-right",
              isUser ? "text-blue-200" : "text-gray-400"
            )}>
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatMessage;
