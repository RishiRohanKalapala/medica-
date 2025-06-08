
import { DiagnosisResult, MedicationRecommendation } from "../types/chat";

// Very simplified medical condition database for demo purposes
// In a real application, this would be a much more comprehensive database
export const medicalConditions = [
  {
    id: "cold",
    name: "Common Cold",
    symptoms: ["runny nose", "sneezing", "cough", "sore throat", "congestion"],
    description: "A viral infectious disease of the upper respiratory tract that primarily affects the nose.",
  },
  {
    id: "flu",
    name: "Influenza",
    symptoms: ["fever", "chills", "body aches", "fatigue", "cough", "headache"],
    description: "A contagious respiratory illness caused by influenza viruses that infect the nose, throat, and sometimes the lungs.",
  },
  {
    id: "covid",
    name: "COVID-19",
    symptoms: ["fever", "cough", "shortness of breath", "fatigue", "loss of taste", "loss of smell"],
    description: "An infectious disease caused by the SARS-CoV-2 virus that primarily affects the respiratory system.",
  },
  {
    id: "allergies",
    name: "Allergic Rhinitis",
    symptoms: ["sneezing", "itchy eyes", "runny nose", "congestion", "watery eyes"],
    description: "An allergic response to specific allergens such as pollen, dust mites, pet dander, or mold.",
  },
  {
    id: "migraine",
    name: "Migraine",
    symptoms: ["severe headache", "nausea", "sensitivity to light", "sensitivity to sound", "visual disturbances"],
    description: "A neurological condition that causes recurring headaches ranging from moderate to severe intensity.",
  },
  {
    id: "hypertension",
    name: "Hypertension",
    symptoms: ["headache", "shortness of breath", "chest pain", "dizziness", "blurred vision"],
    description: "A long-term medical condition in which the blood pressure in the arteries is persistently elevated.",
  },
  {
    id: "diabetes",
    name: "Type 2 Diabetes",
    symptoms: ["increased thirst", "frequent urination", "hunger", "fatigue", "blurred vision", "slow-healing sores"],
    description: "A chronic condition that affects the way the body processes blood sugar (glucose).",
  },
];

// Sample medication database for demo purposes
export const medications = [
  {
    id: "acetaminophen",
    name: "Acetaminophen",
    brandNames: ["Tylenol", "Panadol"],
    treatedConditions: ["cold", "flu", "migraine"],
    dosage: "500-1000mg every 4-6 hours",
    maxDosage: "4000mg per day",
    description: "Used to treat pain and fever. Does not treat inflammation."
  },
  {
    id: "ibuprofen",
    name: "Ibuprofen",
    brandNames: ["Advil", "Motrin"],
    treatedConditions: ["cold", "flu", "migraine"],
    dosage: "200-400mg every 4-6 hours",
    maxDosage: "1200mg per day",
    description: "NSAID that treats pain, fever, and inflammation."
  },
  {
    id: "loratadine",
    name: "Loratadine",
    brandNames: ["Claritin"],
    treatedConditions: ["allergies"],
    dosage: "10mg once daily",
    maxDosage: "10mg per day",
    description: "Second-generation antihistamine used to treat allergies."
  },
  {
    id: "oseltamivir",
    name: "Oseltamivir",
    brandNames: ["Tamiflu"],
    treatedConditions: ["flu"],
    dosage: "75mg twice daily for 5 days",
    maxDosage: "150mg per day",
    description: "Antiviral medication that blocks the actions of influenza virus in the body."
  },
  {
    id: "sumatriptan",
    name: "Sumatriptan",
    brandNames: ["Imitrex"],
    treatedConditions: ["migraine"],
    dosage: "50-100mg at onset of migraine",
    maxDosage: "200mg per day",
    description: "Triptan that narrows blood vessels around the brain and reduces substances that cause pain."
  },
  {
    id: "lisinopril",
    name: "Lisinopril",
    brandNames: ["Prinivil", "Zestril"],
    treatedConditions: ["hypertension"],
    dosage: "10mg once daily",
    maxDosage: "40mg per day",
    description: "ACE inhibitor that helps relax veins and arteries to lower blood pressure."
  },
  {
    id: "metformin",
    name: "Metformin",
    brandNames: ["Glucophage"],
    treatedConditions: ["diabetes"],
    dosage: "500mg twice daily with meals",
    maxDosage: "2000mg per day",
    description: "Helps control blood sugar levels by improving the body's sensitivity to insulin."
  },
];

// Simple analyzer function for demonstration purposes
export const analyzeSymptoms = (input: string): { diagnoses: DiagnosisResult[], relatedConditions: string[] } => {
  const inputLower = input.toLowerCase();
  const foundSymptoms: string[] = [];
  const matchedConditions = new Map<string, number>();

  // Extract mentioned symptoms from input
  medicalConditions.forEach(condition => {
    condition.symptoms.forEach(symptom => {
      if (inputLower.includes(symptom) && !foundSymptoms.includes(symptom)) {
        foundSymptoms.push(symptom);
      }
    });
  });

  // Calculate condition matches based on symptoms
  medicalConditions.forEach(condition => {
    let matchCount = 0;
    let matchedSymptoms = 0;

    condition.symptoms.forEach(symptom => {
      if (foundSymptoms.includes(symptom)) {
        matchCount++;
      }
    });

    if (matchCount > 0) {
      const matchRatio = matchCount / condition.symptoms.length;
      const probability = Math.min(matchRatio * (foundSymptoms.length > 2 ? 1.5 : 1), 0.95);
      
      if (probability > 0.2) { // Only include conditions with some reasonable probability
        matchedConditions.set(condition.id, probability);
      }
    }
  });

  // Sort conditions by probability and create results
  const sortedConditions = Array.from(matchedConditions.entries())
    .sort((a, b) => b[1] - a[1]);
  
  const diagnoses: DiagnosisResult[] = sortedConditions.map(([conditionId, probability]) => {
    const condition = medicalConditions.find(c => c.id === conditionId)!;
    return {
      condition: condition.name,
      probability,
      description: condition.description
    };
  });

  return { 
    diagnoses, 
    relatedConditions: sortedConditions.map(([id]) => id)
  };
};

export const recommendMedications = (conditionIds: string[]): MedicationRecommendation[] => {
  const recommendations: MedicationRecommendation[] = [];
  
  conditionIds.forEach(conditionId => {
    const matchingMeds = medications.filter(med => 
      med.treatedConditions.includes(conditionId)
    );
    
    matchingMeds.forEach(med => {
      if (!recommendations.some(r => r.name === med.name)) {
        recommendations.push({
          name: med.name,
          dosage: med.dosage,
          frequency: med.dosage.split(' ').slice(-2).join(' '),
          description: med.description
        });
      }
    });
  });
  
  return recommendations;
};

export const generateMedicalAdvice = (input: string, diagnoses: DiagnosisResult[]): string => {
  if (diagnoses.length === 0) {
    return "Based on the information provided, I couldn't identify a clear condition. Please provide more details about your symptoms or consult a healthcare professional.";
  }

  const topCondition = diagnoses[0];
  let advice = `Based on the symptoms described, the most likely condition may be ${topCondition.condition}. `;
  
  if (topCondition.condition === "Common Cold") {
    advice += "Rest, stay hydrated, and consider over-the-counter medications for symptom relief. If symptoms worsen after 7-10 days, consult a healthcare provider.";
  } else if (topCondition.condition === "Influenza") {
    advice += "Rest, increase fluid intake, and monitor for complications like difficulty breathing. Antiviral medications are most effective when started within 48 hours of symptom onset.";
  } else if (topCondition.condition === "COVID-19") {
    advice += "Isolate yourself to prevent spreading, monitor symptoms closely, and seek medical care immediately if you experience difficulty breathing, persistent chest pain, or bluish lips or face.";
  } else if (topCondition.condition === "Allergic Rhinitis") {
    advice += "Try to identify and avoid allergen triggers. Over-the-counter antihistamines can help manage symptoms. For persistent allergies, consider consulting with an allergist.";
  } else if (topCondition.condition === "Migraine") {
    advice += "Rest in a dark, quiet room. Stay hydrated and consider prescribed medications. Identify and avoid personal triggers such as certain foods, stress, or lack of sleep.";
  } else if (topCondition.condition === "Hypertension") {
    advice += "Lifestyle modifications including reduced sodium intake, regular exercise, stress management, and medication adherence are crucial for management. Regular blood pressure monitoring is recommended.";
  } else if (topCondition.condition === "Type 2 Diabetes") {
    advice += "Monitor blood glucose levels regularly, follow a balanced diet, exercise regularly, and take prescribed medications as directed. Regular check-ups with healthcare providers are essential.";
  } else {
    advice += "It's recommended to consult with a healthcare provider for proper diagnosis and treatment.";
  }

  advice += "\n\nRemember: This is an educational tool for medical students. Always consult a licensed healthcare professional before making any medical decisions.";
  
  return advice;
};
