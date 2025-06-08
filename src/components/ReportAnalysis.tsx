
import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Upload, AlertTriangle, CheckCircle, File, X } from "lucide-react";
import { analyzeReportText } from "../utils/diseasesDataset";
import { useToast } from "@/hooks/use-toast";

interface ReportAnalysisProps {
  onAnalysisComplete: (analysis: {
    keyFindings: string[];
    suspectedConditions: string[];
    recommendedTests: string[];
    urgencyLevel: number;
  }) => void;
}

const ReportAnalysis: React.FC<ReportAnalysisProps> = ({ onAnalysisComplete }) => {
  const [reportText, setReportText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = file.type === 'text/plain' || 
                         file.type === 'application/pdf' || 
                         file.name.endsWith('.txt') ||
                         file.name.endsWith('.pdf');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      
      if (!isValidType) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported format. Please use PDF or TXT files.`,
          variant: "destructive",
        });
        return false;
      }
      
      if (!isValidSize) {
        toast({
          title: "File too large",
          description: `${file.name} is too large. Maximum size is 10MB.`,
          variant: "destructive",
        });
        return false;
      }
      
      return true;
    });

    setUploadedFiles(prev => [...prev, ...validFiles]);
    
    // Process text files immediately
    validFiles.forEach(file => {
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setReportText(prev => prev ? `${prev}\n\n--- ${file.name} ---\n${content}` : content);
        };
        reader.readAsText(file);
      }
    });

    if (validFiles.length > 0) {
      toast({
        title: "Files uploaded successfully",
        description: `${validFiles.length} file(s) ready for analysis.`,
      });
    }
  };

  const removeFile = (indexToRemove: number) => {
    setUploadedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleAnalyzeReport = async () => {
    if (!reportText.trim() && uploadedFiles.length === 0) {
      toast({
        title: "No content to analyze",
        description: "Please enter text or upload medical reports to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const analysisResult = analyzeReportText(reportText);
      setAnalysis(analysisResult);
      onAnalysisComplete(analysisResult);
      
      toast({
        title: "Analysis completed",
        description: "Medical report has been successfully analyzed with AI insights.",
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing the report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getUrgencyColor = (level: number) => {
    if (level >= 8) return "text-red-600 bg-red-50 border-red-200";
    if (level >= 6) return "text-orange-600 bg-orange-50 border-orange-200";
    if (level >= 4) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-green-600 bg-green-50 border-green-200";
  };

  const getUrgencyLabel = (level: number) => {
    if (level >= 8) return "Urgent - Immediate Attention";
    if (level >= 6) return "Moderate Priority";
    if (level >= 4) return "Low Priority";
    return "Routine Follow-up";
  };

  return (
    <Card className="h-full shadow-lg border-0">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-t-xl">
        <h2 className="text-lg font-bold flex items-center">
          <FileText size={20} className="mr-2" />
          AI Medical Report Analysis
        </h2>
        <p className="text-sm opacity-90 mt-1">
          Upload or paste medical reports for comprehensive AI analysis
        </p>
      </div>
      <CardContent className="p-6 space-y-6">
        {/* File Upload Section */}
        <div className="space-y-4">
          <div className="border-2 border-dashed border-blue-200 rounded-lg p-6 text-center hover:border-blue-300 transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".txt,.pdf,text/plain,application/pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="space-y-2">
              <Upload size={32} className="mx-auto text-blue-500" />
              <div>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="mb-2"
                >
                  <Upload size={16} className="mr-2" />
                  Upload Medical Reports
                </Button>
                <p className="text-sm text-gray-500">
                  Support: PDF, TXT files (Max 10MB each)
                </p>
              </div>
            </div>
          </div>
          
          {/* Uploaded Files Display */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Uploaded Files:</h4>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2">
                    <File size={16} className="text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">{file.name}</span>
                    <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                  </div>
                  <Button
                    onClick={() => removeFile(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                  >
                    <X size={14} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Text Input Section */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Medical Report Text (Optional)
          </label>
          <Textarea
            placeholder="Paste additional medical report text here (lab results, imaging reports, pathology findings, etc.)..."
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            className="min-h-[120px] text-sm border-gray-200 focus:border-blue-400"
          />
        </div>
        
        <Button 
          onClick={handleAnalyzeReport}
          disabled={isAnalyzing || (!reportText.trim() && uploadedFiles.length === 0)}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Analyzing with AI...
            </>
          ) : (
            <>
              <AlertTriangle size={16} className="mr-2" />
              Analyze Medical Report
            </>
          )}
        </Button>

        {analysis && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-800 text-lg">AI Analysis Results</h3>
              <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getUrgencyColor(analysis.urgencyLevel)}`}>
                {getUrgencyLabel(analysis.urgencyLevel)}
              </span>
            </div>

            {analysis.keyFindings.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-gray-700 flex items-center">
                  <AlertTriangle size={16} className="mr-2 text-orange-500" />
                  Key Clinical Findings
                </h4>
                <div className="space-y-2">
                  {analysis.keyFindings.map((finding: string, index: number) => (
                    <div key={index} className="text-sm text-gray-700 bg-orange-50 p-3 rounded-lg border border-orange-200 flex items-start">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {finding}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {analysis.suspectedConditions.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-gray-700 flex items-center">
                  <CheckCircle size={16} className="mr-2 text-blue-500" />
                  Suspected Medical Conditions
                </h4>
                <div className="space-y-2">
                  {analysis.suspectedConditions.map((condition: string, index: number) => (
                    <div key={index} className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-200 flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {condition}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {analysis.recommendedTests.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-gray-700 flex items-center">
                  <FileText size={16} className="mr-2 text-green-500" />
                  Recommended Diagnostic Tests
                </h4>
                <div className="space-y-2">
                  {analysis.recommendedTests.map((test: string, index: number) => (
                    <div key={index} className="text-sm text-gray-700 bg-green-50 p-3 rounded-lg border border-green-200 flex items-start">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {test}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportAnalysis;
