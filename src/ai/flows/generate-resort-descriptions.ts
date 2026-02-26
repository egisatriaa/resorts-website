'use server';
/**
 * @fileOverview A Genkit flow for generating compelling taglines and short descriptions for a resort.
 *
 * - generateResortDescriptions - A function that handles the generation of resort descriptions.
 * - GenerateResortDescriptionsInput - The input type for the generateResortDescriptions function.
 * - GenerateResortDescriptionsOutput - The return type for the generateResortDescriptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResortDescriptionsInputSchema = z.object({
  resortName: z.string().describe('The name of the resort.'),
  keywords: z.array(z.string()).describe('A list of keywords to inspire the description (e.g., luxury, serene, nature, Bali).'),
});
export type GenerateResortDescriptionsInput = z.infer<typeof GenerateResortDescriptionsInputSchema>;

const GenerateResortDescriptionsOutputSchema = z.object({
  tagline: z.string().describe('A short, poetic tagline for the resort.'),
  description: z.string().describe('A 1-3 sentence luxurious description focused on nature, serenity, architecture, and Balinese elegance.'),
});
export type GenerateResortDescriptionsOutput = z.infer<typeof GenerateResortDescriptionsOutputSchema>;

export async function generateResortDescriptions(
  input: GenerateResortDescriptionsInput
): Promise<GenerateResortDescriptionsOutput> {
  return generateResortDescriptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResortDescriptionsPrompt',
  input: {schema: GenerateResortDescriptionsInputSchema},
  output: {schema: GenerateResortDescriptionsOutputSchema},
  prompt: `You are an expert copywriter specializing in luxury travel and resort marketing.
Your task is to generate a compelling and poetic tagline, and a 1-3 sentence luxurious description for a resort.
The description should focus on nature, serenity, architecture, and Balinese elegance.

Resort Name: {{{resortName}}}
Keywords: {{{keywords}}}`,
});

const generateResortDescriptionsFlow = ai.defineFlow(
  {
    name: 'generateResortDescriptionsFlow',
    inputSchema: GenerateResortDescriptionsInputSchema,
    outputSchema: GenerateResortDescriptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
