'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { getSecurityInstructions } from '@/app/actions';
import { Loader2, ShieldCheck, ShieldX } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface SecureKioskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SecureKioskModal({ isOpen, onClose }: SecureKioskModalProps) {
  const [attemptNumber, setAttemptNumber] = useState(0);
  const [instructions, setInstructions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAttempt = async () => {
    const nextAttempt = attemptNumber + 1;
    setAttemptNumber(nextAttempt);
    setIsLoading(true);
    setError(null);
    setInstructions('');

    try {
      const result = await getSecurityInstructions(nextAttempt);
      setInstructions(result);
    } catch (e) {
      setError('Failed to communicate with the security AI. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      // Reset state when closing
      setTimeout(() => {
        setAttemptNumber(0);
        setInstructions('');
        setError(null);
      }, 300);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <ShieldX className="h-6 w-6 text-destructive" />
            Kiosk Security Simulation
          </DialogTitle>
          <DialogDescription>
            This simulates an attempt to bypass the kiosk mode. The AI will generate escalating security instructions for each attempt.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {attemptNumber > 0 ? (
            <Alert>
                <ShieldCheck className="h-4 w-4" />
              <AlertTitle>Security Response for Attempt #{attemptNumber}</AlertTitle>
              <AlertDescription>
                AI-generated instructions to harden the kiosk:
              </AlertDescription>
            </Alert>
          ) : (
             <div className="text-center py-8">
                <p className="text-muted-foreground">Click "Simulate Attempt" to begin.</p>
             </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center min-h-[200px]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-4">AI is generating security protocols...</p>
            </div>
          )}

          {instructions && !isLoading && (
            <ScrollArea className="h-64 w-full rounded-md border p-4 bg-muted/50">
              <pre className="text-sm whitespace-pre-wrap font-mono">{instructions}</pre>
            </ScrollArea>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={onClose}>
                Close
            </Button>
            <Button
                type="button"
                onClick={handleAttempt}
                disabled={isLoading}
                className="bg-destructive hover:bg-destructive/90"
            >
                {isLoading ? 'Simulating...' : `Simulate Attempt #${attemptNumber + 1}`}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
