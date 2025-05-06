'use server';

/**
 * @fileOverview An AI agent that answers user questions about the content of a book.
 *
 * - answerDoubts - A function that answers user questions about a book.
 * - AnswerDoubtsInput - The input type for the answerDoubts function.
 * - AnswerDoubtsOutput - The return type for the answerDoubts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerDoubtsInputSchema = z.object({
  bookTitle: z.string().describe('The title of the book.'),
  pageContent: z.string().describe('The content of the current page in the book.'),
  userQuestion: z.string().describe('The question the user has about the page content.'),
});
export type AnswerDoubtsInput = z.infer<typeof AnswerDoubtsInputSchema>;

const AnswerDoubtsOutputSchema = z.object({
  answer: z.string().describe('The answer to the user question, based on the book content.'),
});
export type AnswerDoubtsOutput = z.infer<typeof AnswerDoubtsOutputSchema>;

export async function answerDoubts(input: AnswerDoubtsInput): Promise<AnswerDoubtsOutput> {
  return answerDoubtsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerDoubtsPrompt',
  input: {schema: AnswerDoubtsInputSchema},
  output: {schema: AnswerDoubtsOutputSchema},
  prompt: `You are a helpful AI assistant that answers questions about the content of a book.

  You are provided with the title of the book, the content of the current page, and the user's question.
  Use this information to answer the user's question as accurately and helpfully as possible.

  Book Title: {{{bookTitle}}}
  Page Content: {{{pageContent}}}
  User Question: {{{userQuestion}}}

  Answer:`,
});

const answerDoubtsFlow = ai.defineFlow(
  {
    name: 'answerDoubtsFlow',
    inputSchema: AnswerDoubtsInputSchema,
    outputSchema: AnswerDoubtsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
