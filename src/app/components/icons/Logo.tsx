import { cn } from '@/lib/utils';
import { Clock, Lock } from 'lucide-react';

export function Logo({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <Lock className="h-8 w-8 text-primary" />
      <Clock className="h-8 w-8 text-accent" />
    </div>
  );
}
