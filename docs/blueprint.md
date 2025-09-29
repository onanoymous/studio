# **App Name**: TimeLock Rental Kiosk

## Core Features:

- Rental Package Selection: Display available rental packages (e.g., 15min, 30min, 1hr) with pricing.
- Payment Confirmation: Display a session ID and await confirmation from the server upon payment.
- Active Rental Timer: Display a prominent countdown timer showing the remaining rental time. Include visual warnings (5min, 1min) before expiration.
- Secure Kiosk Mode: Implement kiosk mode to restrict access to system functionalities, preventing users from exiting the rental interface or accessing other apps. Use a tool that automatically applies different levels of restrictions in case of an attempt to break through the protection layers.
- Background Timer Service: Run a persistent background service to accurately track rental time, synchronize with the server, and lock the device upon expiration. Handle restarts and battery optimization.
- Device Lockdown: Upon timer expiration, lock the device with a custom lock screen, preventing any further use until a new rental session is initiated.
- Error Handling and Recovery: Implement robust error handling to manage network issues, app crashes, and potential security breaches. Ensure automatic recovery and graceful error messages.

## Style Guidelines:

- Primary color: Deep Blue (#3F51B5) to convey trust and reliability, reminiscent of established tech companies.
- Background color: Very light gray (#F5F5F5), almost white, providing a clean and modern backdrop.
- Accent color: A vibrant orange (#FF9800) is used for key interactive elements like buttons and timers, ensuring clear visibility.
- Body and headline font: 'Inter' sans-serif font for a clean and modern aesthetic.
- Fullscreen layouts are employed across all screens to eliminate any system UI elements, thereby solidifying the kiosk experience.
- Simple and professional icons, that provide intuitive functionality of different operations. Avoid frivolous iconography.
- Subtle transitions and animations to enhance user experience without being distracting. Loading animations during payment verification.