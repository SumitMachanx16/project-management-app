import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Manager',
  description: 'High-tech animated project management app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
