import type { Metadata } from 'next';
import './globals.css';
import { ServiceWorkerRegister } from '@/components/service-worker-register';

export const metadata: Metadata = {
  title: 'Sentiê Agenda',
  description: 'Agendamento rápido para o salão Sentiê',
  manifest: '/manifest.webmanifest'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen">
        <ServiceWorkerRegister />
        <main className="mx-auto w-full max-w-md p-4">{children}</main>
      </body>
    </html>
  );
}
