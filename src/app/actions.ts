
'use server';

import { secureKioskMode } from '@/ai/flows/secure-kiosk-mode.flow';

export async function getSecurityInstructions(attemptNumber: number) {
  try {
    const result = await secureKioskMode({ attemptNumber });
    return result.instructions;
  } catch (error) {
    console.error('Error in secureKioskMode flow:', error);
    return 'An error occurred while fetching security instructions. Please check the server logs.';
  }
}
