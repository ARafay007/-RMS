import StyledComponentsRegistry from '../../../lib/AntdRegistry';
import './globals.css';
import { Inter } from 'next/font/google'
import { Providers } from '@/redux/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Food Well Login',
}

export default function RootLayout({children}){
  return(
    <html lang='en'>
      <body>
        <Providers>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}