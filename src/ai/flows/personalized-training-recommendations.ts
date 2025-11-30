'use server';
/**
 * @fileOverview An AI tool that suggests personalized training routines and drills based on a student's rank, medical history, and performance data.
 *
 * - personalizedTrainingRecommendations - A function that handles the training recommendation process.
 * - PersonalizedTrainingRecommendationsInput - The input type for the personalizedTrainingRecommendations function.
 * - PersonalizedTrainingRecommendationsOutput - The return type for the personalizedTrainingRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedTrainingRecommendationsInputSchema = z.object({
  rank: z.string().describe('The student\'s current rank or belt level.'),
  medicalHistory: z.string().describe('The student\'s relevant medical history and any physical limitations.'),
  performanceData: z.string().describe('Data on the student\'s performance in previous training sessions and assessments.'),
  studentName: z.string().describe('The name of the student'),
});
export type PersonalizedTrainingRecommendationsInput = z.infer<typeof PersonalizedTrainingRecommendationsInputSchema>;

const PersonalizedTrainingRecommendationsOutputSchema = z.object({
  trainingRecommendations: z.string().describe('Personalized training routines and drills tailored to the student.'),
  reasoning: z.string().describe('Explanation of why these recommendations are suitable, considering rank, medical history, and performance data.'),
});
export type PersonalizedTrainingRecommendationsOutput = z.infer<typeof PersonalizedTrainingRecommendationsOutputSchema>;

export async function personalizedTrainingRecommendations(
  input: PersonalizedTrainingRecommendationsInput
): Promise<PersonalizedTrainingRecommendationsOutput> {
  return personalizedTrainingRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedTrainingRecommendationsPrompt',
  input: {schema: PersonalizedTrainingRecommendationsInputSchema},
  output: {schema: PersonalizedTrainingRecommendationsOutputSchema},
  prompt: `You are an expert Krav Maga instructor. Generate a personalized training routine and drills for {{studentName}} based on the following information:

Rank: {{{rank}}}
Medical History: {{{medicalHistory}}}
Performance Data: {{{performanceData}}}

Consider the student\'s rank, medical history, and performance data to tailor the training to their individual needs and accelerate their progress. Provide reasoning for your recommendation.
`,
});

const personalizedTrainingRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedTrainingRecommendationsFlow',
    inputSchema: PersonalizedTrainingRecommendationsInputSchema,
    outputSchema: PersonalizedTrainingRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
