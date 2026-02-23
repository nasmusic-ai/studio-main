'use server';
/**
 * @fileOverview A Genkit flow for generating personalized notifications for business permit applicants.
 *
 * - generatePersonalizedNotification - A function that generates a personalized notification based on application details.
 * - PersonalizedNotificationInput - The input type for the generatePersonalizedNotification function.
 * - PersonalizedNotificationOutput - The return type for the generatePersonalizedNotification function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PersonalizedNotificationInputSchema = z.object({
  applicantName: z.string().describe('The name of the applicant.'),
  applicationId: z.string().describe('The unique identifier for the application.'),
  status: z.string().describe('The current status of the application (e.g., "Pending Review", "Approved", "Declined", "Additional Documents Required").'),
  statusDetails: z.string().optional().describe('Detailed information about the application status.'),
  requirements: z.array(z.string()).optional().describe('A list of new requirements or actions needed from the applicant.'),
  complexInfo: z.string().optional().describe('Any complex information that needs to be explained simply and clearly to the applicant.'),
});
export type PersonalizedNotificationInput = z.infer<typeof PersonalizedNotificationInputSchema>;

const PersonalizedNotificationOutputSchema = z.object({
  notificationMessage: z.string().describe('A clear, personalized, and easy-to-understand notification message for the applicant.'),
});
export type PersonalizedNotificationOutput = z.infer<typeof PersonalizedNotificationOutputSchema>;

const notificationPrompt = ai.definePrompt({
  name: 'personalizedNotificationPrompt',
  input: { schema: PersonalizedNotificationInputSchema },
  output: { schema: PersonalizedNotificationOutputSchema },
  prompt: `You are an AI assistant for the BilisPermit application portal. Your goal is to generate clear, personalized, and easy-to-understand notifications for business permit applicants. The message should inform them about their application status, any new requirements, or explain complex information.

Address the applicant directly by their name. Keep the tone helpful and professional.

Applicant Name: {{{applicantName}}}
Application ID: {{{applicationId}}}
Current Status: {{{status}}}
{{#if statusDetails}}
Status Details: {{{statusDetails}}}
{{/if}}

{{#if requirements.length}}
New Requirements/Actions Needed:
{{#each requirements}}- {{{this}}}
{{/each}}
{{/if}}

{{#if complexInfo}}
Important Information to Explain: {{{complexInfo}}}
{{/if}}

Based on the information above, generate a personalized notification message for {{applicantName}}. Start with a friendly greeting and clearly state the main update. If there are requirements, list them clearly. If there is complex information, explain it in simple terms. Ensure the message is actionable if needed.

Notification Message:
`,
});

const personalizedNotificationsFlow = ai.defineFlow(
  {
    name: 'personalizedNotificationsFlow',
    inputSchema: PersonalizedNotificationInputSchema,
    outputSchema: PersonalizedNotificationOutputSchema,
  },
  async (input) => {
    const { output } = await notificationPrompt(input);
    return output!;
  }
);

export async function generatePersonalizedNotification(input: PersonalizedNotificationInput): Promise<PersonalizedNotificationOutput> {
  return personalizedNotificationsFlow(input);
}
