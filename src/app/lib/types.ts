export type AppState = 'welcome' | 'payment_pending' | 'rental_active' | 'locked';

export interface RentalPackage {
  id: string;
  duration: number; // in minutes
  price: number;
  description: string;
}
