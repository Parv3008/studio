// 'use server';

/**
 * @fileOverview AI flow to suggest related learning materials based on the current book and page.
 *
 * - suggestLearningMaterials - A function that suggests learning materials.
 * - SuggestLearningMaterialsInput - The input type for the suggestLearningMaterials function.
 * - SuggestLearningMaterialsOutput - The return type for the suggestLearningMaterials function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestLearningMaterialsInputSchema = z.object({
  bookTitle: z.string().describe('The title of the book.'),
  pageContent: z.string().describe('The content of the current page in the book.'),
});
export type SuggestLearningMaterialsInput = z.infer<
  typeof SuggestLearningMaterialsInputSchema
>;

const SuggestLearningMaterialsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe(
      'A list of related learning materials, such as articles, videos, or books.'
    ),
});
export type SuggestLearningMaterialsOutput = z.infer<
  typeof SuggestLearningMaterialsOutputSchema
>;

export async function suggestLearningMaterials(
  input: SuggestLearningMaterialsInput
): Promise<SuggestLearningMaterialsOutput> {
  return suggestLearningMaterialsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestLearningMaterialsPrompt',
  input: {schema: SuggestLearningMaterialsInputSchema},
  output: {schema: SuggestLearningMaterialsOutputSchema},
  prompt: `You are a helpful AI assistant that suggests related learning materials to students.

  Based on the current book and page content, suggest relevant learning materials to explore the topic further.

  Book Title: {{{bookTitle}}}
  Page Content: {{{pageContent}}}

  Suggestions:`,
});

const suggestLearningMaterialsFlow = ai.defineFlow(
  {
    name: 'suggestLearningMaterialsFlow',
    inputSchema: SuggestLearningMaterialsInputSchema,
    outputSchema: SuggestLearningMaterialsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
