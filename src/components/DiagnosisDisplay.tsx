
import React from "react";
import { DiagnosisResult } from "../types/chat";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Info, AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DiagnosisDisplayProps {
  diagnoses: DiagnosisResult[];
}

const DiagnosisDisplay: React.FC<DiagnosisDisplayProps> = ({ diagnoses }) => {
  if (!diagnoses || diagnoses.length === 0) {
    return (
      <div className="text-center py-4">
        <AlertCircle className="mx-auto h-8 w-8 text-gray-300 mb-2" />
        <p className="text-sm text-gray-500 font-medium">No conditions identified yet</p>
        <p className="text-xs text-gray-400 mt-1">
          Please provide more information about the symptoms
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {diagnoses.map((diagnosis, index) => (
        <div key={index} className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm animate-fade-in" style={{animationDelay: `${index * 150}ms`}}>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="font-medium text-sm">{diagnosis.condition}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="ml-1 focus:outline-none">
                      <Info size={14} className="text-gray-400 hover:text-gray-600 transition-colors" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs bg-white p-2 shadow-md border border-gray-200 rounded-md">
                    <p className="text-xs">{diagnosis.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
              {Math.round(diagnosis.probability * 100)}%
            </div>
          </div>
          <Progress 
            value={diagnosis.probability * 100} 
            className="h-1.5 mt-2" 
            indicatorClassName="bg-gradient-to-r from-blue-400 to-medical-primary"
          />
        </div>
      ))}
    </div>
  );
};

export default DiagnosisDisplay;
