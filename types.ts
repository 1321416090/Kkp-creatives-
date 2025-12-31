
export interface CandidateData {
  personalDetails: string;
  currentStatus: string;
  education: string;
  experience: string;
  skills: string;
  jobDescription: string;
}

export interface GenerationResult {
  content: string;
  timestamp: string;
}
