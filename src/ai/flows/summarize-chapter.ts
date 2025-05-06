'use server';

/**
 * @fileOverview A flow to summarize a chapter of a book using the AI assistant.
 *
 * - summarizeChapter - A function that handles the chapter summarization process.
 * - SummarizeChapterInput - The input type for the summarizeChapter function.
 * - SummarizeChapterOutput - The return type for the summarizeChapter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeChapterInputSchema = z.object({
  chapterText: z
    .string()
    .describe('The text content of the chapter to be summarized.'),
  bookTitle: z.string().describe('The title of the book.'),
});
export type SummarizeChapterInput = z.infer<typeof SummarizeChapterInputSchema>;

const SummarizeChapterOutputSchema = z.object({
  summary: z.string().describe('The summary of the chapter.'),
});
export type SummarizeChapterOutput = z.infer<typeof SummarizeChapterOutputSchema>;

export async function summarizeChapter(input: SummarizeChapterInput): Promise<SummarizeChapterOutput> {
  return summarizeChapterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeChapterPrompt',
  input: {schema: SummarizeChapterInputSchema},
  output: {schema: SummarizeChapterOutputSchema},
  prompt: `You are an AI assistant that summarizes chapters of books.

  Summarize the following chapter from the book "{{bookTitle}}".

  Chapter Text: {{{chapterText}}}
  `,
});

const summarizeChapterFlow = ai.defineFlow(
  {
    name: 'summarizeChapterFlow',
    inputSchema: SummarizeChapterInputSchema,
    outputSchema: SummarizeChapterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
