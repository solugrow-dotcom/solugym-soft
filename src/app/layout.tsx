import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SoluGrow - Advanced Gym Management SaaS',
  description: 'Manage your gym, members, workouts, and billing with ease using SoluGrow AI-powered OS.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
