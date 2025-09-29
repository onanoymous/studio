'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Smartphone, Wifi, Mail } from 'lucide-react';
import { Logo } from '../icons/Logo';

interface LockedScreenProps {
  onReset: () => void;
}

export default function LockedScreen({ onReset }: LockedScreenProps) {
  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-md text-center shadow-2xl border-destructive border-2">
        <CardHeader>
           <div className="flex justify-center mb-4">
             <div className="bg-destructive text-destructive-foreground rounded-full p-4">
                <Lock className="h-10 w-10" />
            </div>
           </div>
          <CardTitle className="text-3xl font-bold text-destructive">
            Time Expired: Device Locked
          </CardTitle>
          <CardDescription className="text-base">
            Your rental session has ended. To continue using the device, please start a new session.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <Button size="lg" className="w-full text-lg" onClick={onReset}>
            Start New Session
          </Button>
          <div className="text-sm text-muted-foreground pt-4 border-t w-full">
            <p className="font-semibold mb-2">Need help?</p>
            <a href="mailto:support@timelock.com" className="flex items-center justify-center gap-2 hover:text-primary">
                <Mail className="h-4 w-4" />
                support@timelock.com
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
