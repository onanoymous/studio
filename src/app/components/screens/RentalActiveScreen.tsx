'use client';

import { useState } from 'react';
import Timer from '@/app/components/shared/Timer';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import SecureKioskModal from '../shared/SecureKioskModal';
import { Logo } from '../icons/Logo';

interface RentalActiveScreenProps {
  endTime: number;
  onTimeExpired: () => void;
}

export default function RentalActiveScreen({ endTime, onTimeExpired }: RentalActiveScreenProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center text-center w-full max-w-lg">
      <Logo className="mb-4" />
      <h1 className="text-2xl font-medium text-primary mb-2">Your session is active</h1>
      <p className="text-muted-foreground mb-8">
        Time remaining for your rental period.
      </p>

      <Timer endTime={endTime} onComplete={onTimeExpired} />
      
      <div className="mt-12 w-full">
        <Button 
            variant="destructive" 
            className="w-full"
            onClick={() => setIsModalOpen(true)}
        >
          <ShieldAlert className="mr-2 h-4 w-4" />
          Simulate: Try to Escape Kiosk Mode
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
            This triggers an AI-simulated security response.
        </p>
      </div>

      <SecureKioskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
