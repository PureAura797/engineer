import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'МЗТА Инжиниринг',
    short_name: 'МЗТА Инжиниринг',
    description: 'Модернизация и сборка шкафов автоматики вентиляции для бизнес-центров в Москве.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f161a',
    theme_color: '#0f161a',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
