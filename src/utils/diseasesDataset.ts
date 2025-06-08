// This file contains disease and symptom data focusing on lung cancer, thyroid, and heart disease
// Based on medical literature and clinical guidelines

// Dataset structure for specialized disease analysis
export interface DiseaseData {
  disease: string;
  symptoms: string[];
  description: string;
  severity: number; // 1-10 scale
  precautions: string[];
  treatments: string[];
  riskFactors: string[];
  diagnosticTests: string[];
}

// Specialized dataset for lung cancer, thyroid, and heart disease
export const diseasesDataset: DiseaseData[] = [
  // Lung Cancer Diseases
  {
    disease: "Non-Small Cell Lung Cancer (NSCLC)",
    symptoms: ["persistent cough", "shortness of breath", "chest pain", "coughing up blood", "weight loss", "fatigue", "hoarseness", "bone pain"],
    description: "The most common type of lung cancer, accounting for about 85% of all lung cancers.",
    severity: 9,
    precautions: ["quit smoking immediately", "avoid secondhand smoke", "test home for radon", "avoid asbestos exposure"],
    treatments: ["surgery", "chemotherapy", "radiation therapy", "targeted therapy", "immunotherapy"],
    riskFactors: ["smoking", "secondhand smoke", "radon exposure", "asbestos", "family history"],
    diagnosticTests: ["chest X-ray", "CT scan", "PET scan", "biopsy", "molecular testing"]
  },
  {
    disease: "Small Cell Lung Cancer (SCLC)",
    symptoms: ["rapid onset cough", "severe shortness of breath", "chest pain", "weight loss", "fatigue", "swelling in face"],
    description: "A fast-growing type of lung cancer that spreads quickly to other parts of the body.",
    severity: 10,
    precautions: ["immediate smoking cessation", "avoid all tobacco products", "regular follow-ups"],
    treatments: ["chemotherapy", "radiation therapy", "immunotherapy", "prophylactic cranial irradiation"],
    riskFactors: ["heavy smoking", "exposure to chemicals", "radiation exposure"],
    diagnosticTests: ["chest CT", "brain MRI", "bone scan", "bronchoscopy", "blood tests"]
  },
  {
    disease: "Lung Adenocarcinoma",
    symptoms: ["persistent cough", "shortness of breath", "chest pain", "weight loss", "fatigue", "pleural effusion"],
    description: "A subtype of non-small cell lung cancer that often occurs in the outer areas of the lungs.",
    severity: 8,
    precautions: ["smoking cessation", "regular screening if high risk", "healthy lifestyle"],
    treatments: ["surgical resection", "targeted therapy", "chemotherapy", "radiation therapy"],
    riskFactors: ["smoking", "genetic mutations", "environmental toxins"],
    diagnosticTests: ["low-dose CT screening", "tissue biopsy", "genetic testing", "staging scans"]
  },

  // Thyroid Diseases
  {
    disease: "Hypothyroidism",
    symptoms: ["fatigue", "weight gain", "cold intolerance", "dry skin", "hair loss", "constipation", "depression", "memory problems"],
    description: "A condition where the thyroid gland doesn't produce enough thyroid hormones.",
    severity: 4,
    precautions: ["regular thyroid monitoring", "consistent medication timing", "iodine-rich diet"],
    treatments: ["levothyroxine replacement therapy", "lifestyle modifications", "regular monitoring"],
    riskFactors: ["autoimmune disease", "family history", "age over 60", "previous thyroid surgery"],
    diagnosticTests: ["TSH test", "Free T4 test", "thyroid antibodies", "thyroid ultrasound"]
  },
  {
    disease: "Hyperthyroidism",
    symptoms: ["weight loss", "rapid heartbeat", "anxiety", "tremors", "sweating", "heat intolerance", "insomnia", "frequent bowel movements"],
    description: "A condition where the thyroid gland produces too much thyroid hormone.",
    severity: 6,
    precautions: ["avoid excessive iodine", "manage stress", "regular heart monitoring"],
    treatments: ["antithyroid medications", "radioactive iodine", "beta-blockers", "surgery"],
    riskFactors: ["Graves disease", "toxic nodular goiter", "excessive iodine intake"],
    diagnosticTests: ["TSH test", "Free T3 and T4", "thyroid scan", "radioactive iodine uptake"]
  },
  {
    disease: "Thyroid Cancer",
    symptoms: ["neck lump", "difficulty swallowing", "voice changes", "neck pain", "swollen lymph nodes"],
    description: "Cancer that forms in the tissues of the thyroid gland.",
    severity: 7,
    precautions: ["regular neck examination", "avoid radiation exposure", "genetic counseling if family history"],
    treatments: ["thyroidectomy", "radioactive iodine therapy", "hormone therapy", "chemotherapy"],
    riskFactors: ["radiation exposure", "family history", "genetic syndromes", "iodine deficiency"],
    diagnosticTests: ["thyroid ultrasound", "fine needle biopsy", "blood tests", "genetic testing"]
  },
  {
    disease: "Hashimoto's Thyroiditis",
    symptoms: ["fatigue", "weight gain", "depression", "muscle weakness", "joint pain", "dry skin", "hair thinning"],
    description: "An autoimmune condition that causes the immune system to attack the thyroid gland.",
    severity: 5,
    precautions: ["stress management", "selenium supplementation", "gluten-free diet consideration"],
    treatments: ["levothyroxine therapy", "selenium supplements", "stress reduction"],
    riskFactors: ["family history", "other autoimmune diseases", "pregnancy", "stress"],
    diagnosticTests: ["TPO antibodies", "thyroglobulin antibodies", "TSH test", "thyroid ultrasound"]
  },

  // Heart Diseases
  {
    disease: "Coronary Artery Disease",
    symptoms: ["chest pain", "shortness of breath", "fatigue", "irregular heartbeat", "dizziness", "nausea"],
    description: "The most common type of heart disease caused by narrowed or blocked coronary arteries.",
    severity: 8,
    precautions: ["heart-healthy diet", "regular exercise", "stress management", "smoking cessation"],
    treatments: ["lifestyle changes", "medications", "angioplasty", "bypass surgery"],
    riskFactors: ["high cholesterol", "high blood pressure", "diabetes", "smoking", "family history"],
    diagnosticTests: ["ECG", "stress test", "echocardiogram", "cardiac catheterization", "CT angiography"]
  },
  {
    disease: "Heart Attack (Myocardial Infarction)",
    symptoms: ["severe chest pain", "shortness of breath", "nausea", "sweating", "lightheadedness", "pain in arm or jaw"],
    description: "Occurs when blood flow to part of the heart muscle is blocked, usually by a blood clot.",
    severity: 10,
    precautions: ["immediate emergency care", "lifestyle modifications", "medication compliance"],
    treatments: ["emergency angioplasty", "clot-busting drugs", "bypass surgery", "medications"],
    riskFactors: ["coronary artery disease", "high blood pressure", "diabetes", "smoking", "age"],
    diagnosticTests: ["ECG", "cardiac enzymes", "echocardiogram", "coronary angiography"]
  },
  {
    disease: "Heart Failure",
    symptoms: ["shortness of breath", "fatigue", "swollen legs", "rapid weight gain", "persistent cough", "reduced exercise tolerance"],
    description: "A condition where the heart muscle doesn't pump blood as well as it should.",
    severity: 8,
    precautions: ["salt restriction", "fluid monitoring", "daily weight checks", "medication adherence"],
    treatments: ["ACE inhibitors", "beta-blockers", "diuretics", "lifestyle changes", "device therapy"],
    riskFactors: ["coronary artery disease", "high blood pressure", "diabetes", "previous heart attack"],
    diagnosticTests: ["echocardiogram", "BNP blood test", "chest X-ray", "stress test", "cardiac MRI"]
  },
  {
    disease: "Atrial Fibrillation",
    symptoms: ["irregular heartbeat", "palpitations", "shortness of breath", "fatigue", "dizziness", "chest pain"],
    description: "An irregular and often rapid heart rate that can increase risk of stroke and other heart complications.",
    severity: 6,
    precautions: ["stroke prevention", "rate control", "avoid triggers", "regular monitoring"],
    treatments: ["blood thinners", "rate control medications", "rhythm control", "ablation"],
    riskFactors: ["age", "heart disease", "high blood pressure", "diabetes", "sleep apnea"],
    diagnosticTests: ["ECG", "Holter monitor", "echocardiogram", "stress test", "blood tests"]
  },
  {
    disease: "Hypertensive Heart Disease",
    symptoms: ["shortness of breath", "chest pain", "fatigue", "irregular heartbeat", "dizziness"],
    description: "Heart problems caused by high blood pressure over time.",
    severity: 7,
    precautions: ["blood pressure control", "salt restriction", "regular exercise", "stress management"],
    treatments: ["antihypertensive medications", "lifestyle modifications", "regular monitoring"],
    riskFactors: ["chronic high blood pressure", "diabetes", "obesity", "smoking"],
    diagnosticTests: ["blood pressure monitoring", "echocardiogram", "ECG", "stress test"]
  }
];

/**
 * Searches the disease dataset for matches based on reported symptoms
 */
export const findDiseaseMatches = (symptoms: string[]): {
  disease: string;
  matchedSymptoms: string[];
  confidence: number;
  description: string;
  severity: number;
  riskFactors: string[];
  diagnosticTests: string[];
}[] => {
  const normalizedSymptoms = symptoms.map(s => s.toLowerCase().trim());
  const matches = diseasesDataset.map(disease => {
    const matchedSymptoms = disease.symptoms.filter(symptom => 
      normalizedSymptoms.some(s => symptom.includes(s) || s.includes(symptom))
    );
    
    // Calculate confidence based on percentage of matched symptoms
    const confidence = matchedSymptoms.length / disease.symptoms.length;
    
    return {
      disease: disease.disease,
      matchedSymptoms,
      confidence,
      description: disease.description,
      severity: disease.severity,
      riskFactors: disease.riskFactors,
      diagnosticTests: disease.diagnosticTests,
    };
  }).filter(match => match.confidence > 0)
    .sort((a, b) => b.confidence - a.confidence);
  
  return matches;
};

/**
 * Gets recommended treatments for a given disease
 */
export const getTreatments = (diseaseName: string): string[] => {
  const disease = diseasesDataset.find(d => 
    d.disease.toLowerCase() === diseaseName.toLowerCase()
  );
  return disease ? disease.treatments : [];
};

/**
 * Gets precautions for a given disease
 */
export const getPrecautions = (diseaseName: string): string[] => {
  const disease = diseasesDataset.find(d => 
    d.disease.toLowerCase() === diseaseName.toLowerCase()
  );
  return disease ? disease.precautions : [];
};

/**
 * Gets diagnostic tests for a given disease
 */
export const getDiagnosticTests = (condition: string): string[] => {
  const conditionLower = condition.toLowerCase();
  
  // Lung cancer diagnostic tests
  if (conditionLower.includes('lung') || conditionLower.includes('cancer') || conditionLower.includes('respiratory')) {
    return [
      "Chest X-ray",
      "CT scan of chest",
      "PET-CT scan",
      "Bronchoscopy with biopsy",
      "Sputum cytology",
      "Pulmonary function tests",
      "Complete blood count (CBC)",
      "Liver function tests"
    ];
  }
  
  // Thyroid diagnostic tests
  if (conditionLower.includes('thyroid') || conditionLower.includes('hyperthyroid') || conditionLower.includes('hypothyroid')) {
    return [
      "TSH (Thyroid Stimulating Hormone)",
      "Free T4 (Thyroxine)",
      "Free T3 (Triiodothyronine)",
      "Thyroid ultrasound",
      "Thyroid antibody tests",
      "Fine needle aspiration biopsy",
      "Radioactive iodine uptake test",
      "Thyroglobulin test"
    ];
  }
  
  // Heart disease diagnostic tests
  if (conditionLower.includes('heart') || conditionLower.includes('cardiac') || conditionLower.includes('cardiovascular')) {
    return [
      "Electrocardiogram (ECG/EKG)",
      "Echocardiogram",
      "Stress test",
      "Cardiac catheterization",
      "Coronary angiography",
      "Holter monitor",
      "Chest X-ray",
      "Blood tests (troponin, CK-MB)",
      "Lipid profile"
    ];
  }
  
  // General diagnostic tests
  return [
    "Complete blood count (CBC)",
    "Comprehensive metabolic panel",
    "Urinalysis",
    "Chest X-ray",
    "Physical examination"
  ];
};

/**
 * Extracts symptoms from user input text
 */
export const extractSymptomsFromText = (userInput: string): string[] => {
  const normalizedInput = userInput.toLowerCase();
  
  // Collect all symptoms from our dataset for symptom extraction
  const allSymptoms = new Set<string>();
  diseasesDataset.forEach(disease => {
    disease.symptoms.forEach(symptom => {
      allSymptoms.add(symptom);
    });
  });
  
  // Check which symptoms are mentioned in the input
  const extractedSymptoms = Array.from(allSymptoms).filter(symptom => 
    normalizedInput.includes(symptom)
  );
  
  return extractedSymptoms;
};

/**
 * Analyzes medical report text for key findings
 */
export const analyzeReportText = (reportText: string): {
  keyFindings: string[];
  suspectedConditions: string[];
  recommendedTests: string[];
  urgencyLevel: number;
} => {
  const normalizedText = reportText.toLowerCase();
  const keyFindings: string[] = [];
  const suspectedConditions: string[] = [];
  const recommendedTests: string[] = [];
  let urgencyLevel = 1;

  // Analyze for lung cancer indicators
  if (normalizedText.includes('lung nodule') || normalizedText.includes('pulmonary mass')) {
    keyFindings.push('Lung nodule/mass detected');
    suspectedConditions.push('Possible lung cancer');
    recommendedTests.push('CT-guided biopsy', 'PET scan');
    urgencyLevel = Math.max(urgencyLevel, 8);
  }

  // Analyze for thyroid indicators
  if (normalizedText.includes('thyroid nodule') || normalizedText.includes('thyroid enlargement')) {
    keyFindings.push('Thyroid abnormality detected');
    suspectedConditions.push('Thyroid disorder');
    recommendedTests.push('Thyroid ultrasound', 'Fine needle biopsy');
    urgencyLevel = Math.max(urgencyLevel, 6);
  }

  // Analyze for heart disease indicators
  if (normalizedText.includes('cardiac') || normalizedText.includes('coronary')) {
    keyFindings.push('Cardiac abnormality noted');
    suspectedConditions.push('Heart disease');
    recommendedTests.push('Echocardiogram', 'Stress test');
    urgencyLevel = Math.max(urgencyLevel, 7);
  }

  return {
    keyFindings,
    suspectedConditions,
    recommendedTests,
    urgencyLevel
  };
};
