export interface Disease {
  cleaned_disease: string;
  disease: string;
  primary_description: string;
  rarity: string | null;
  raw_symptoms: string | null;
  secondary_description: string | null;
  subtitle: string | null;
  symptom_possibility: string | null;
}

export interface DiseaseCleaned {
  cleaned_disease: string;
  disease: string;
  primary_description: string;
  rarity: string | null;
  raw_symptoms: Array<string> | null;
  secondary_description: string | null;
  subtitle: string | null;
  symptom_possibility: string | null;
}

export interface QueryItem {
  disease: string;
  subtitle: string | null;
  cleaned_disease: string;
  simScore: number;
}