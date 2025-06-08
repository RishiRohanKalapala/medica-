
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle, Activity, Heart, Thermometer, Brain } from "lucide-react";
import { generateDiagnosisAnalysis } from "@/utils/apiUtils";
import { DiagnosisResult, MedicationRecommendation } from "@/types/chat";

interface SymptomCheckerProps {
  onSymptomAnalysis: (analysis: {
    diagnoses: DiagnosisResult[],
    medications: MedicationRecommendation[],
    advice: string
  }) => void;
}

const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onSymptomAnalysis }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const symptomCategories = [
    {
      category: "Respiratory",
      icon: <Activity size={16} className="text-blue-500" />,
      symptoms: [
        "Persistent cough", "Shortness of breath", "Chest pain", 
        "Coughing up blood", "Wheezing", "Difficulty breathing"
      ]
    },
    {
      category: "Cardiovascular", 
      icon: <Heart size={16} className="text-red-500" />,
      symptoms: [
        "Chest pain", "Irregular heartbeat", "Palpitations", 
        "Swelling in legs", "Dizziness", "Reduced exercise tolerance"
      ]
    },
    {
      category: "Thyroid/Endocrine",
      icon: <Thermometer size={16} className="text-purple-500" />,
      symptoms: [
        "Rapid heartbeat", "Anxiety", "Tremors", "Heat intolerance", 
        "Cold intolerance", "Hair loss", "Weight changes", "Fatigue"
      ]
    },
    {
      category: "Neurological",
      icon: <Brain size={16} className="text-green-500" />,
      symptoms: [
        "Headaches", "Memory problems", "Depression", "Confusion", 
        "Mood changes", "Sleep disturbances", "Concentration issues"
      ]
    }
  ];

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleAnalyze = async () => {
    if (selectedSymptoms.length === 0) return;
    
    setIsAnalyzing(true);
    try {
      const symptomsText = selectedSymptoms.join(", ");
      const analysis = await generateDiagnosisAnalysis(symptomsText);
      onSymptomAnalysis(analysis);
    } catch (error) {
      console.error("Error analyzing symptoms:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearAllSymptoms = () => {
    setSelectedSymptoms([]);
  };

  return (
    <Card className="h-fit shadow-lg border-0">
      <CardHeader className="pb-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-t-xl">
        <CardTitle className="text-sm flex items-center justify-between">
          <div className="flex items-center">
            <Search size={18} className="mr-2" />
            AI Symptom Checker
          </div>
          {selectedSymptoms.length > 0 && (
            <Badge variant="secondary" className="bg-white/20 text-white">
              {selectedSymptoms.length} selected
            </Badge>
          )}
        </CardTitle>
        <p className="text-xs opacity-90">
          Select symptoms for AI-powered analysis
        </p>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="max-h-80 overflow-y-auto space-y-4">
          {symptomCategories.map((category) => (
            <div key={category.category} className="space-y-2">
              <div className="flex items-center space-x-2 pb-1 border-b border-gray-100">
                {category.icon}
                <h4 className="text-xs font-semibold text-gray-700">
                  {category.category}
                </h4>
              </div>
              <div className="grid grid-cols-1 gap-2 pl-6">
                {category.symptoms.map((symptom) => (
                  <div key={symptom} className="flex items-center space-x-2 group">
                    <Checkbox
                      id={symptom}
                      checked={selectedSymptoms.includes(symptom)}
                      onCheckedChange={() => handleSymptomToggle(symptom)}
                      className="h-3 w-3"
                    />
                    <label 
                      htmlFor={symptom} 
                      className="text-xs cursor-pointer hover:text-green-600 transition-colors group-hover:font-medium"
                    >
                      {symptom}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="space-y-2 pt-3 border-t border-gray-100">
          {selectedSymptoms.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {selectedSymptoms.slice(0, 3).map((symptom) => (
                <Badge key={symptom} variant="outline" className="text-xs px-2 py-1">
                  {symptom.length > 15 ? `${symptom.substring(0, 15)}...` : symptom}
                </Badge>
              ))}
              {selectedSymptoms.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-1">
                  +{selectedSymptoms.length - 3} more
                </Badge>
              )}
            </div>
          )}
          
          <div className="flex space-x-2">
            <Button 
              onClick={handleAnalyze}
              disabled={selectedSymptoms.length === 0 || isAnalyzing}
              className="flex-1 text-xs h-8 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
              size="sm"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <CheckCircle size={12} className="mr-1" />
                  Analyze ({selectedSymptoms.length})
                </>
              )}
            </Button>
            
            {selectedSymptoms.length > 0 && (
              <Button
                onClick={clearAllSymptoms}
                variant="outline"
                size="sm"
                className="text-xs h-8 px-3"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SymptomChecker;
