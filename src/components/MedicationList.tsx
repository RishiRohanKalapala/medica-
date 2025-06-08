
import React from "react";
import { MedicationRecommendation } from "../types/chat";
import { Pill, Clock, AlertCircle } from "lucide-react";

interface MedicationListProps {
  medications: MedicationRecommendation[];
}

const MedicationList: React.FC<MedicationListProps> = ({ medications }) => {
  if (!medications || medications.length === 0) {
    return (
      <div className="text-center py-4">
        <AlertCircle className="mx-auto h-8 w-8 text-gray-300 mb-2" />
        <p className="text-sm text-gray-500 font-medium">No medications to recommend yet</p>
        <p className="text-xs text-gray-400 mt-1">
          Please provide more information about the symptoms
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {medications.map((med, index) => (
        <div 
          key={index} 
          className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm animate-fade-in" 
          style={{animationDelay: `${index * 150}ms`}}
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-medical-primary rounded-md flex-shrink-0">
              <Pill size={16} className="text-white" />
            </div>
            <div className="space-y-1 w-full">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-sm">{med.name}</h4>
                <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                  {med.frequency}
                </span>
              </div>
              <div className="flex items-center text-xs text-gray-600 gap-1">
                <Clock size={12} />
                <span>{med.dosage}</span>
              </div>
              <p className="text-xs text-gray-600">{med.description}</p>
            </div>
          </div>
        </div>
      ))}
      <p className="text-xs text-gray-500 mt-2 italic">
        Note: This is for educational purposes only. Always consult a healthcare professional for proper medication guidance.
      </p>
    </div>
  );
};

export default MedicationList;
