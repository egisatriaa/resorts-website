import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sanctuary Bali Retreat | Luxury Tropical Escape',
  description: 'Experience a luxury tropical retreat in Bali with refined architectural elegance and immersive nature experiences.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/30">{children}</body>
    </html>
  );
}
