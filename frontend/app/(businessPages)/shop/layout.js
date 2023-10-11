import StyledComponentsRegistry from '../../../lib/AntdRegistry';
import './globals.css';
import { Inter } from 'next/font/google'
import { ShopProviders } from '@/redux/shopProviders';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Food Well Login',
}

export default function RootLayout({children}){
  return(
    <html lang='en'>
      <body>
        <ShopProviders>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </ShopProviders>
      </body>
    </html>
  );
}