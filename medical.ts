export interface Patient {
  id: string;
  name: string;
  age: number;
  weight?: number;
  allergies: string[];
  medicalHistory: string[];
  currentMedications: string[];
}

export interface Drug {
  id: string;
  name: string;
  genericName?: string;
  dosage: string;
  frequency: string;
  route: string;
  duration?: string;
}

export interface DrugInteraction {
  id: string;
  drug1: string;
  drug2: string;
  severity: 'mild' | 'moderate' | 'severe';
  description: string;
  recommendation: string;
}

export interface DosageVerification {
  drugName: string;
  prescribedDose: string;
  recommendedDose: string;
  isAppropriate: boolean;
  ageGroup: 'pediatric' | 'adult' | 'geriatric';
  warnings?: string[];
}

export interface AlternativeMedication {
  originalDrug: string;
  alternative: string;
  reason: string;
  dosageAdjustment?: string;
}

export interface AnalysisResult {
  interactions: DrugInteraction[];
  dosageVerifications: DosageVerification[];
  alternatives: AlternativeMedication[];
  overallRisk: 'low' | 'moderate' | 'high';
  recommendations: string[];
}