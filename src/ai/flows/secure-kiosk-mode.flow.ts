'use server';

/**
 * @fileOverview A Genkit flow for implementing a secure kiosk mode with tiered security measures.
 *
 * - secureKioskMode - A function that activates kiosk mode with escalating restrictions.
 * - SecureKioskModeInput - The input type for the secureKioskMode function.
 * - SecureKioskModeOutput - The return type for the secureKioskMode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SecureKioskModeInputSchema = z.object({
  attemptNumber: z
    .number()
    .describe("The number of attempts to break out of kiosk mode.  This should start at 1, and increment each time a user attempts to circumvent the kiosk."),
});
export type SecureKioskModeInput = z.infer<typeof SecureKioskModeInputSchema>;

const SecureKioskModeOutputSchema = z.object({
  instructions: z.string().describe('Instructions for the app on how to escalate the kiosk mode security.'),
});
export type SecureKioskModeOutput = z.infer<typeof SecureKioskModeOutputSchema>;

export async function secureKioskMode(input: SecureKioskModeInput): Promise<SecureKioskModeOutput> {
  return secureKioskModeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'secureKioskModePrompt',
  input: {schema: SecureKioskModeInputSchema},
  output: {schema: SecureKioskModeOutputSchema},
  prompt: `You are an expert in Android security and kiosk mode implementation.  You are helping to build an Android application that rents smartphones to users, and needs to ensure that users cannot exit the application and use the smartphone for other purposes.

The application has detected attempt number {{{attemptNumber}}} to break out of the kiosk mode.

Based on this attempt number, provide detailed and specific instructions on how to escalate the kiosk mode security measures. These instructions will be directly implemented in the Android application's code. Be specific as possible.

Consider the following security measures, and suggest the appropriate measures for each attempt number.  Start with basic measures and escalate to more aggressive measures with higher attempt numbers.  The measures should be cumulative (e.g. instructions for attempt #2 should also include instructions from attempt #1).

- **Attempt 1**: Implement screen pinning to lock the app to the foreground.  Disable the home button and recent apps button using accessibility services. Hide the status bar and navigation bar using window flags.
- **Attempt 2**: In addition to the measures from Attempt 1, use Device Admin APIs to prevent the user from uninstalling the application or accessing settings. Block hardware buttons such as volume and power buttons by overriding the onKeyDown method in the main activity.
- **Attempt 3**: In addition to the measures from Attempts 1 and 2, implement a custom lock screen that appears immediately when the app loses focus.  Monitor for attempts to disable the application through ADB or developer mode, and automatically re-enable kiosk mode if disabled.  Implement root detection and display a warning message if the device is rooted.
- **Attempt 4+**: In addition to all previous measures, if the user continues to attempt to break out of kiosk mode, implement even more aggressive measures such as constantly monitoring the foreground app and immediately switching back to the kiosk app if another app is detected. Consider remote device lockdown or data wipe as a last resort.


Respond with the detailed instructions. Do not include any conversational text, only respond with the instructions for the app.
`,
});

const secureKioskModeFlow = ai.defineFlow(
  {
    name: 'secureKioskModeFlow',
    inputSchema: SecureKioskModeInputSchema,
    outputSchema: SecureKioskModeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
