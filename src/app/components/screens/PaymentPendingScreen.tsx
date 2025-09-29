'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Logo } from '../icons/Logo';

interface PaymentPendingScreenProps {
  sessionId: string;
  onPaymentConfirmed: () => void;
}

export default function PaymentPendingScreen({ sessionId, onPaymentConfirmed }: PaymentPendingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onPaymentConfirmed();
    }, 3000); // Simulate 3 seconds payment processing

    return () => clearTimeout(timer);
  }, [onPaymentConfirmed]);

  return (
    <Card className="w-full max-w-md text-center shadow-2xl">
      <CardHeader>
        <div className="mx-auto mb-4">
            <Logo />
        </div>
        <CardTitle className="text-3xl font-bold">Awaiting Payment</CardTitle>
        <CardDescription>
          Please complete your payment. Your session will start automatically.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6">
          <Loader2 className="h-16 w-16 animate-spin text-accent" />
          <div className="bg-muted p-4 rounded-lg w-full">
            <p className="text-sm text-muted-foreground">Your Session ID</p>
            <p className="text-2xl font-mono font-bold text-primary tracking-widest">
              {sessionId}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            This screen will update once payment is confirmed.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
