// This file contains pharmaceutical data focusing on lung cancer, thyroid, and heart disease medications
// Based on current medical guidelines and treatment protocols

// Dataset structure types for our application
export interface Doctor {
  physID: string;
  name: string;
  specialty: string;
  address: string;
  phone: string;
}

export interface Drug {
  brandName: string;
  genericName: string;
  NDC: number;
  dosage: number;
  expDate: string;
  supID: string;
  purchasePrice: number;
  sellPrice: number;
  indication: string;
  category: string;
}

export interface Insurance {
  name: string;
  phone: string;
  coPay: boolean;
}

export interface Patient {
  firstName: string;
  lastName: string;
  birthdate: string;
  address: string;
  phone: string;
  gender: string;
  insurance: string;
  patientID: string;
}

export interface Prescription {
  patientID: string;
  physID: string;
  NDC: number;
  qty: number;
  days: number;
  refills: number;
  status: string;
}

export interface Supplier {
  name: string;
  address: string;
  phone: string;
  supID: string;
}

// Specialized doctors for lung cancer, thyroid, and heart disease
export const doctors: Doctor[] = [
  { physID: "P001", name: "Dr. Sarah Chen", specialty: "Oncology", address: "123 Cancer Center Dr, Detroit, MI", phone: "313-555-0111" },
  { physID: "P002", name: "Dr. Michael Rodriguez", specialty: "Cardiology", address: "456 Heart Institute Ave, Detroit, MI", phone: "313-555-0222" },
  { physID: "P003", name: "Dr. Emily Watson", specialty: "Endocrinology", address: "789 Thyroid Clinic Blvd, Detroit, MI", phone: "313-555-0333" },
  { physID: "P004", name: "Dr. Robert Kim", specialty: "Pulmonology", address: "321 Lung Health Center, Detroit, MI", phone: "313-555-0444" },
  { physID: "P005", name: "Dr. Jennifer Adams", specialty: "Oncology", address: "654 Comprehensive Cancer Center, Detroit, MI", phone: "313-555-0555" }
];

// Specialized medications for lung cancer, thyroid, and heart disease
export const drugs: Drug[] = [
  // Lung Cancer Medications
  { 
    brandName: "Opdivo", 
    genericName: "Nivolumab", 
    NDC: 12001, 
    dosage: 240, 
    expDate: "2025-06-30", 
    supID: "S001", 
    purchasePrice: 1200.00, 
    sellPrice: 2400.00,
    indication: "Non-small cell lung cancer",
    category: "Immunotherapy"
  },
  { 
    brandName: "Keytruda", 
    genericName: "Pembrolizumab", 
    NDC: 12002, 
    dosage: 200, 
    expDate: "2025-05-15", 
    supID: "S002", 
    purchasePrice: 1500.00, 
    sellPrice: 3000.00,
    indication: "Lung cancer",
    category: "Immunotherapy"
  },
  { 
    brandName: "Tagrisso", 
    genericName: "Osimertinib", 
    NDC: 12003, 
    dosage: 80, 
    expDate: "2025-04-20", 
    supID: "S001", 
    purchasePrice: 800.00, 
    sellPrice: 1600.00,
    indication: "EGFR-mutated lung cancer",
    category: "Targeted therapy"
  },
  { 
    brandName: "Carboplatin", 
    genericName: "Carboplatin", 
    NDC: 12004, 
    dosage: 450, 
    expDate: "2024-12-10", 
    supID: "S003", 
    purchasePrice: 150.00, 
    sellPrice: 300.00,
    indication: "Lung cancer",
    category: "Chemotherapy"
  },

  // Thyroid Medications
  { 
    brandName: "Synthroid", 
    genericName: "Levothyroxine", 
    NDC: 13001, 
    dosage: 100, 
    expDate: "2025-08-15", 
    supID: "S002", 
    purchasePrice: 25.00, 
    sellPrice: 50.00,
    indication: "Hypothyroidism",
    category: "Hormone replacement"
  },
  { 
    brandName: "Cytomel", 
    genericName: "Liothyronine", 
    NDC: 13002, 
    dosage: 25, 
    expDate: "2025-07-20", 
    supID: "S001", 
    purchasePrice: 45.00, 
    sellPrice: 90.00,
    indication: "Hypothyroidism",
    category: "Hormone replacement"
  },
  { 
    brandName: "Tapazole", 
    genericName: "Methimazole", 
    NDC: 13003, 
    dosage: 10, 
    expDate: "2025-09-10", 
    supID: "S003", 
    purchasePrice: 30.00, 
    sellPrice: 60.00,
    indication: "Hyperthyroidism",
    category: "Antithyroid"
  },
  { 
    brandName: "Lenvima", 
    genericName: "Lenvatinib", 
    NDC: 13004, 
    dosage: 10, 
    expDate: "2025-06-05", 
    supID: "S002", 
    purchasePrice: 600.00, 
    sellPrice: 1200.00,
    indication: "Thyroid cancer",
    category: "Targeted therapy"
  },

  // Heart Disease Medications
  { 
    brandName: "Lipitor", 
    genericName: "Atorvastatin", 
    NDC: 14001, 
    dosage: 40, 
    expDate: "2025-10-30", 
    supID: "S001", 
    purchasePrice: 35.00, 
    sellPrice: 70.00,
    indication: "High cholesterol, coronary artery disease",
    category: "Statin"
  },
  { 
    brandName: "Metoprolol", 
    genericName: "Metoprolol", 
    NDC: 14002, 
    dosage: 50, 
    expDate: "2025-11-15", 
    supID: "S002", 
    purchasePrice: 20.00, 
    sellPrice: 40.00,
    indication: "High blood pressure, heart failure",
    category: "Beta-blocker"
  },
  { 
    brandName: "Plavix", 
    genericName: "Clopidogrel", 
    NDC: 14003, 
    dosage: 75, 
    expDate: "2025-09-25", 
    supID: "S003", 
    purchasePrice: 80.00, 
    sellPrice: 160.00,
    indication: "Heart attack prevention",
    category: "Antiplatelet"
  },
  { 
    brandName: "Entresto", 
    genericName: "Sacubitril/Valsartan", 
    NDC: 14004, 
    dosage: 97, 
    expDate: "2025-12-20", 
    supID: "S001", 
    purchasePrice: 200.00, 
    sellPrice: 400.00,
    indication: "Heart failure",
    category: "ARB/NEP inhibitor"
  }
];

// Sample data from the Kaggle dataset
export const insurances: Insurance[] = [
  { name: "Blue Cross Blue Shield", phone: "800-555-1111", coPay: true },
  { name: "Aetna", phone: "800-555-2222", coPay: true },
  { name: "United Healthcare", phone: "800-555-3333", coPay: true },
  { name: "Medicare", phone: "800-555-4444", coPay: false },
  { name: "Medicaid", phone: "800-555-5555", coPay: false }
];

export const patients: Patient[] = [
  { 
    firstName: "John", 
    lastName: "Doe", 
    birthdate: "1978-05-12", 
    address: "234 Oak St, Detroit, MI", 
    phone: "313-555-1234", 
    gender: "Male", 
    insurance: "Blue Cross Blue Shield", 
    patientID: "PT001" 
  },
  { 
    firstName: "Sarah", 
    lastName: "Johnson", 
    birthdate: "1985-09-23", 
    address: "567 Pine Ave, Detroit, MI", 
    phone: "313-555-2345", 
    gender: "Female", 
    insurance: "Aetna", 
    patientID: "PT002" 
  },
  { 
    firstName: "Michael", 
    lastName: "Brown", 
    birthdate: "1960-11-04", 
    address: "890 Maple Dr, Detroit, MI", 
    phone: "313-555-3456", 
    gender: "Male", 
    insurance: "Medicare", 
    patientID: "PT003" 
  },
  { 
    firstName: "Emily", 
    lastName: "Garcia", 
    birthdate: "1992-02-15", 
    address: "123 Elm St, Detroit, MI", 
    phone: "313-555-4567", 
    gender: "Female", 
    insurance: "United Healthcare", 
    patientID: "PT004" 
  },
  { 
    firstName: "David", 
    lastName: "Wilson", 
    birthdate: "1975-07-30", 
    address: "456 Birch Ln, Detroit, MI", 
    phone: "313-555-5678", 
    gender: "Male", 
    insurance: "Medicaid", 
    patientID: "PT005" 
  }
];

export const prescriptions: Prescription[] = [
  { patientID: "PT001", physID: "P001", NDC: 12345, qty: 30, days: 30, refills: 3, status: "Filled" },
  { patientID: "PT002", physID: "P002", NDC: 23456, qty: 60, days: 60, refills: 5, status: "Filled" },
  { patientID: "PT003", physID: "P003", NDC: 56789, qty: 90, days: 90, refills: 2, status: "Filled" },
  { patientID: "PT004", physID: "P004", NDC: 67890, qty: 30, days: 30, refills: 3, status: "Filled" },
  { patientID: "PT005", physID: "P001", NDC: 78901, qty: 60, days: 60, refills: 0, status: "Filled" },
  { patientID: "PT001", physID: "P003", NDC: 89012, qty: 30, days: 30, refills: 2, status: "Pending" }
];

export const suppliers: Supplier[] = [
  { name: "PharmaWholesale Inc.", address: "123 Supply Rd, Chicago, IL", phone: "312-555-6789", supID: "S001" },
  { name: "MediSource Partners", address: "456 Distributor Ave, Cleveland, OH", phone: "216-555-7890", supID: "S002" },
  { name: "Healthcare Supplies Co.", address: "789 Vendor St, Indianapolis, IN", phone: "317-555-8901", supID: "S003" }
];

// Utility functions to work with the pharmacy dataset

/**
 * Find a drug by its brand name or generic name
 */
export const findDrugByName = (name: string): Drug | undefined => {
  const lowerName = name.toLowerCase();
  return drugs.find(drug => 
    drug.brandName.toLowerCase().includes(lowerName) || 
    drug.genericName.toLowerCase().includes(lowerName)
  );
};

/**
 * Find a drug by its NDC number
 */
export const findDrugByNDC = (ndc: number): Drug | undefined => {
  return drugs.find(drug => drug.NDC === ndc);
};

/**
 * Find a doctor by their ID
 */
export const findDoctorById = (id: string): Doctor | undefined => {
  return doctors.find(doctor => doctor.physID === id);
};

/**
 * Find a patient by their ID
 */
export const findPatientById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.patientID === id);
};

/**
 * Find prescriptions for a specific patient
 */
export const findPatientPrescriptions = (patientId: string): Prescription[] => {
  return prescriptions.filter(prescription => prescription.patientID === patientId);
};

/**
 * Find medication prescriptions by drug name
 */
export const findPrescriptionsByDrug = (drugName: string): Array<{prescription: Prescription, drug: Drug, patient: Patient, doctor: Doctor}> => {
  const drug = findDrugByName(drugName);
  if (!drug) return [];
  
  return prescriptions
    .filter(rx => rx.NDC === drug.NDC)
    .map(rx => {
      const patient = findPatientById(rx.patientID);
      const doctor = findDoctorById(rx.physID);
      if (patient && doctor) {
        return { prescription: rx, drug, patient, doctor };
      }
      return null;
    })
    .filter(item => item !== null) as Array<{prescription: Prescription, drug: Drug, patient: Patient, doctor: Doctor}>;
};

/**
 * Extract drug references from text
 * @param text User input text to analyze
 * @returns Array of identified drug names
 */
export const extractDrugNamesFromText = (text: string): string[] => {
  const normalizedText = text.toLowerCase();
  
  // Extract drug names from our dataset
  const mentionedDrugs = drugs.filter(drug => 
    normalizedText.includes(drug.brandName.toLowerCase()) || 
    normalizedText.includes(drug.genericName.toLowerCase())
  );
  
  // Return unique drug names (brand or generic based on what matched)
  const results: string[] = [];
  
  mentionedDrugs.forEach(drug => {
    if (normalizedText.includes(drug.brandName.toLowerCase())) {
      results.push(drug.brandName);
    }
    if (normalizedText.includes(drug.genericName.toLowerCase())) {
      results.push(drug.genericName);
    }
  });
  
  return Array.from(new Set(results));
};

/**
 * Generate medication recommendations based on patient symptoms and conditions
 */
export const recommendMedicationsForSymptoms = (symptoms: string): Array<{
  drugName: string, 
  genericName: string,
  dosage: string,
  instructions: string,
  price: number,
  category: string
}> => {
  const normalizedSymptoms = symptoms.toLowerCase();
  const recommendations = [];
  
  // Lung cancer medications
  if (normalizedSymptoms.includes('lung cancer') || normalizedSymptoms.includes('nsclc')) {
    const drug = findDrugByName('Opdivo');
    if (drug) {
      recommendations.push({
        drugName: drug.brandName,
        genericName: drug.genericName,
        dosage: `${drug.dosage}mg IV every 2 weeks`,
        instructions: "Administered by healthcare professional. Monitor for immune-related adverse reactions.",
        price: drug.sellPrice,
        category: drug.category
      });
    }
  }
  
  // Thyroid medications
  if (normalizedSymptoms.includes('hypothyroidism') || normalizedSymptoms.includes('thyroid')) {
    const drug = findDrugByName('Synthroid');
    if (drug) {
      recommendations.push({
        drugName: drug.brandName,
        genericName: drug.genericName,
        dosage: `${drug.dosage}mcg daily`,
        instructions: "Take on empty stomach, 30-60 minutes before breakfast. Consistent timing important.",
        price: drug.sellPrice,
        category: drug.category
      });
    }
  }
  
  // Heart disease medications
  if (normalizedSymptoms.includes('heart') || normalizedSymptoms.includes('cardiac') || normalizedSymptoms.includes('chest pain')) {
    const drug1 = findDrugByName('Lipitor');
    const drug2 = findDrugByName('Metoprolol');
    
    if (drug1) {
      recommendations.push({
        drugName: drug1.brandName,
        genericName: drug1.genericName,
        dosage: `${drug1.dosage}mg daily`,
        instructions: "Take with or without food. Monitor liver function tests.",
        price: drug1.sellPrice,
        category: drug1.category
      });
    }
    
    if (drug2) {
      recommendations.push({
        drugName: drug2.brandName,
        genericName: drug2.genericName,
        dosage: `${drug2.dosage}mg twice daily`,
        instructions: "Take with food. Do not stop abruptly. Monitor heart rate and blood pressure.",
        price: drug2.sellPrice,
        category: drug2.category
      });
    }
  }
  
  return recommendations;
};
