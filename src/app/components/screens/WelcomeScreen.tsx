'use client';

import type { RentalPackage } from '@/app/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '../icons/Logo';
import { Smartphone, Wifi } from 'lucide-react';

const rentalPackages: RentalPackage[] = [
  { id: '15min', duration: 15, price: 10, description: 'Quick Browse' },
  { id: '30min', duration: 30, price: 18, description: 'Standard Session' },
  { id: '60min', duration: 60, price: 30, description: 'Full Hour' },
];

interface WelcomeScreenProps {
  onSelectPackage: (pkg: RentalPackage) => void;
}

export default function WelcomeScreen({ onSelectPackage }: WelcomeScreenProps) {
  return (
    <div className="w-full max-w-4xl text-center">
      <header className="mb-12 flex flex-col items-center">
        <Logo className="mb-4" />
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          TimeLock Rental Kiosk
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Secure and simple smartphone rentals.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {rentalPackages.map((pkg) => (
          <Card key={pkg.id} className="flex flex-col text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">{pkg.duration} Minutes</CardTitle>
              <CardDescription>{pkg.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-center justify-center">
              <p className="text-5xl font-bold text-primary">
                ₱{pkg.price}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                size="lg"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg font-bold"
                onClick={() => onSelectPackage(pkg)}
              >
                Select Plan
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
       <footer className="mt-12 text-muted-foreground text-sm flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            <span>Piso-Phone Style Rentals</span>
          </div>
           <div className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-primary" />
            <span>Inspired by Piso-WiFi</span>
          </div>
        </footer>
    </div>
  );
}
