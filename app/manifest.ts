import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sentiê Agenda',
    short_name: 'Sentiê',
    description: 'PWA de agendamento de salão',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff1f6',
    theme_color: '#ec4899',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml'
      }
    ]
  };
}
