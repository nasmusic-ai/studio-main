'use server';
/**
 * @fileOverview This file implements a Genkit flow for providing clarifications on form fields, legal terms, or required documents.
 *
 * - getFormClarification - A function that handles the form clarification process.
 * - FormClarificationInput - The input type for the getFormClarification function.
 * - FormClarificationOutput - The return type for the getFormClarification function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FormClarificationInputSchema = z.object({
  query: z.string().describe('The user\'s question about a form field, legal term, or document.'),
  context: z.string().optional().describe('Optional additional context about the specific item the user is asking about (e.g., form field name, document type, legal phrase).'),
});
export type FormClarificationInput = z.infer<typeof FormClarificationInputSchema>;

const FormClarificationOutputSchema = z.object({
  clarification: z.string().describe('A clear and concise explanation or clarification for the user\'s query.'),
});
export type FormClarificationOutput = z.infer<typeof FormClarificationOutputSchema>;

export async function getFormClarification(input: FormClarificationInput): Promise<FormClarificationOutput> {
  return formClarificationFlow(input);
}

const formClarificationPrompt = ai.definePrompt({
  name: 'formClarificationPrompt',
  input: {schema: FormClarificationInputSchema},
  output: {schema: FormClarificationOutputSchema},
  prompt: `You are an AI assistant for the BilisPermit online business permit application portal in the Philippines.
Your goal is to provide clear, concise, and helpful clarifications to applicants regarding form fields, legal terms, or required documents.

Be direct and to the point. If specific context is provided, prioritize that information in your explanation.

Query: {{{query}}}
{{#if context}}
Context: {{{context}}}
{{/if}}

Provide a clarification for the user's query:
`,
});

const formClarificationFlow = ai.defineFlow(
  {
    name: 'formClarificationFlow',
    inputSchema: FormClarificationInputSchema,
    outputSchema: FormClarificationOutputSchema,
  },
  async (input) => {
    const {output} = await formClarificationPrompt(input);
    return output!;
  }
);
