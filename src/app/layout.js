import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css';
import 'react-calendar/dist/Calendar.css';
import 'swiper/css';
import 'swiper/css/bundle';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-tabs/style/react-tabs.css';

// Styles
import '../../styles/style.css';

import LayoutProvider from '@/providers/LayoutProvider';
import { Inter } from 'next/font/google';
import Providers from '@/lib/Providers';
import GlobalToast from '@/components/Ui/GlobalToast';
import AppWrapper from '@/AppWrapper/AppWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Trezo - React Nextjs Admin Dashboard Template',
  description: 'Trezo - React Nextjs Admin Dashboard Template'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutProvider>
          <Providers>
            <AppWrapper>
              {children}
              <GlobalToast />
            </AppWrapper>
          </Providers>
        </LayoutProvider>
      </body>
    </html>
  );
}
