export interface CoverLetterType {
  applyId: number;
  scholarshipFoundation: string;
  scholarshipName: string;
  coverLetterTitle: string;
  coverLetterList: {
    content: string;
    question: string;
  }[];
}
