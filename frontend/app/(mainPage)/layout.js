import './globals.css';
import { Inter } from 'next/font/google'
import { ClientProviders } from '@/redux/clientProviders';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Food Well',
  description: 'Order thousand of different and delicious foods from your home.'
}

export default function RootLayout({children}){
  return(
    <html lang="en">
      <ClientProviders>
        {children}
      </ClientProviders>
    </html>
  );
}