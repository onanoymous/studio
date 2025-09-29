'use client';

import { useState, useEffect } from 'react';
import type { AppState, RentalPackage } from '@/app/lib/types';
import WelcomeScreen from '@/app/components/screens/WelcomeScreen';
import PaymentPendingScreen from '@/app/components/screens/PaymentPendingScreen';
import RentalActiveScreen from '@/app/components/screens/RentalActiveScreen';
import LockedScreen from '@/app/components/screens/LockedScreen';
import { Logo } from '@/app/components/icons/Logo';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [endTime, setEndTime] = useState<number | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedState = localStorage.getItem('kioskState');
    if (storedState) {
      const { state, endTime: storedEndTime, sessionId: storedSessionId } = JSON.parse(storedState);
      if (storedEndTime && new Date().getTime() < storedEndTime) {
        setAppState('rental_active');
        setEndTime(storedEndTime);
        setSessionId(storedSessionId);
      } else if (storedEndTime) {
        setAppState('locked');
      } else {
         setAppState(state || 'welcome');
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const stateToStore = JSON.stringify({ state: appState, endTime, sessionId });
      localStorage.setItem('kioskState', stateToStore);
    }
  }, [appState, endTime, sessionId, isLoading]);

  const startRental = (pkg: RentalPackage) => {
    const newSessionId = `TRK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setSessionId(newSessionId);
    setAppState('payment_pending');
    // In a real app, you would set the end time after payment confirmation
    // Here we set it for simulation purposes, to be used in the next step.
    const now = new Date().getTime();
    const newEndTime = now + pkg.duration * 60 * 1000;
    setEndTime(newEndTime); 
  };

  const confirmPayment = () => {
    setAppState('rental_active');
  };
  
  const handleTimeExpired = () => {
    setAppState('locked');
    setEndTime(null);
  };

  const resetApp = () => {
    setAppState('welcome');
    setEndTime(null);
    setSessionId(null);
    localStorage.removeItem('kioskState');
  };
  
  const renderScreen = () => {
    switch (appState) {
      case 'welcome':
        return <WelcomeScreen onSelectPackage={startRental} />;
      case 'payment_pending':
        return <PaymentPendingScreen sessionId={sessionId!} onPaymentConfirmed={confirmPayment} />;
      case 'rental_active':
        return <RentalActiveScreen endTime={endTime!} onTimeExpired={handleTimeExpired} />;
      case 'locked':
        return <LockedScreen onReset={resetApp} />;
      default:
        return <WelcomeScreen onSelectPackage={startRental} />;
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <Logo className="h-16 w-16 animate-pulse text-primary" />
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      {renderScreen()}
    </main>
  );
}
