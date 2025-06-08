
export type MessageRole = 'user' | 'assistant';

export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
}

export interface DiagnosisResult {
  condition: string;
  probability: number;
  description: string;
}

export interface MedicationRecommendation {
  name: string;
  dosage: string;
  frequency: string;
  description: string;
}

export interface AnalysisResult {
  diagnoses: DiagnosisResult[];
  medications: MedicationRecommendation[];
  advice: string;
}
