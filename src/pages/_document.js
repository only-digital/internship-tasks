import { Head, Html, Main, NextScript } from 'next/document';
import Header from '@/components/header/header';

export default function Document() {
  return (
    <Html lang="ru">
      <Head />
      <body>
        <Header />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
