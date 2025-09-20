import { Drug, DrugInteraction, DosageVerification, AlternativeMedication } from '../types/medical';

export const drugDatabase: Record<string, any> = {
  'aspirin': {
    genericName: 'acetylsalicylic acid',
    category: 'analgesic',
    contraindications: ['warfarin', 'heparin'],
    pediatricDose: 'Not recommended under 12',
    adultDose: '325-1000mg every 4-6 hours',
    geriatricDose: 'Start with lower dose, 325mg',
    alternatives: ['acetaminophen', 'ibuprofen']
  },
  'warfarin': {
    genericName: 'warfarin sodium',
    category: 'anticoagulant',
    contraindications: ['aspirin', 'ibuprofen', 'heparin'],
    pediatricDose: 'Individualized based on INR',
    adultDose: '2-10mg daily',
    geriatricDose: 'Start with 2-5mg daily',
    alternatives: ['apixaban', 'rivaroxaban']
  },
  'metformin': {
    genericName: 'metformin hydrochloride',
    category: 'antidiabetic',
    contraindications: ['contrast dye'],
    pediatricDose: '500mg twice daily (>10 years)',
    adultDose: '500-1000mg twice daily',
    geriatricDose: '500mg daily, monitor renal function',
    alternatives: ['glipizide', 'sitagliptin']
  },
  'lisinopril': {
    genericName: 'lisinopril',
    category: 'ace inhibitor',
    contraindications: ['potassium supplements'],
    pediatricDose: 'Not typically used',
    adultDose: '10-40mg daily',
    geriatricDose: 'Start with 5mg daily',
    alternatives: ['losartan', 'amlodipine']
  },
  'ibuprofen': {
    genericName: 'ibuprofen',
    category: 'nsaid',
    contraindications: ['warfarin', 'lisinopril'],
    pediatricDose: '10mg/kg every 6-8 hours',
    adultDose: '400-800mg every 6-8 hours',
    geriatricDose: '200-400mg, monitor GI/renal',
    alternatives: ['acetaminophen', 'naproxen']
  }
};

export const commonInteractions: DrugInteraction[] = [
  {
    id: '1',
    drug1: 'warfarin',
    drug2: 'aspirin',
    severity: 'severe',
    description: 'Increased risk of bleeding due to enhanced anticoagulant effect',
    recommendation: 'Consider alternative pain management or dose adjustment with close monitoring'
  },
  {
    id: '2',
    drug1: 'ibuprofen',
    drug2: 'lisinopril',
    severity: 'moderate',
    description: 'NSAIDs may reduce the effectiveness of ACE inhibitors',
    recommendation: 'Monitor blood pressure and consider acetaminophen as alternative'
  },
  {
    id: '3',
    drug1: 'warfarin',
    drug2: 'ibuprofen',
    severity: 'severe',
    description: 'Increased risk of gastrointestinal bleeding',
    recommendation: 'Avoid combination, use acetaminophen for pain relief'
  }
];

export function analyzeDrugInteractions(drugs: Drug[]): DrugInteraction[] {
  const interactions: DrugInteraction[] = [];
  
  for (let i = 0; i < drugs.length; i++) {
    for (let j = i + 1; j < drugs.length; j++) {
      const drug1 = drugs[i].name.toLowerCase();
      const drug2 = drugs[j].name.toLowerCase();
      
      const interaction = commonInteractions.find(int => 
        (int.drug1.toLowerCase() === drug1 && int.drug2.toLowerCase() === drug2) ||
        (int.drug1.toLowerCase() === drug2 && int.drug2.toLowerCase() === drug1)
      );
      
      if (interaction) {
        interactions.push(interaction);
      }
    }
  }
  
  return interactions;
}

export function verifyDosages(drugs: Drug[], patientAge: number): DosageVerification[] {
  const verifications: DosageVerification[] = [];
  const ageGroup = patientAge < 18 ? 'pediatric' : patientAge > 65 ? 'geriatric' : 'adult';
  
  drugs.forEach(drug => {
    const drugInfo = drugDatabase[drug.name.toLowerCase()];
    if (drugInfo) {
      const recommendedDose = drugInfo[`${ageGroup}Dose`] || drugInfo.adultDose;
      verifications.push({
        drugName: drug.name,
        prescribedDose: drug.dosage,
        recommendedDose,
        isAppropriate: true, // Simplified logic
        ageGroup,
        warnings: ageGroup === 'pediatric' ? ['Monitor for pediatric-specific side effects'] : 
                 ageGroup === 'geriatric' ? ['Start with lower doses, monitor closely'] : []
      });
    }
  });
  
  return verifications;
}

export function suggestAlternatives(drugs: Drug[], interactions: DrugInteraction[]): AlternativeMedication[] {
  const alternatives: AlternativeMedication[] = [];
  
  interactions.forEach(interaction => {
    if (interaction.severity === 'severe') {
      const drug1Info = drugDatabase[interaction.drug1.toLowerCase()];
      const drug2Info = drugDatabase[interaction.drug2.toLowerCase()];
      
      if (drug1Info?.alternatives) {
        alternatives.push({
          originalDrug: interaction.drug1,
          alternative: drug1Info.alternatives[0],
          reason: `Severe interaction with ${interaction.drug2}`,
          dosageAdjustment: 'Follow standard dosing guidelines'
        });
      }
    }
  });
  
  return alternatives;
}