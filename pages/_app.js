import { storyblokInit, apiPlugin } from '@storyblok/react';
import '../styles/globals.css';

import Feature from '../components/Feature';
import Grid from '../components/Grid';
import Page from '../components/Page';
import Teaser from '../components/Teaser';
import Hero from '../components/Hero';
import Article from '../components/Article';
import AllArticles from '../components/AllArticles';

const components = {
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  page: Page,
  hero: Hero,
  'all-articles': AllArticles,
  article: Article,
};

storyblokInit({
  accessToken: 'M3rVzsT9zV5jnAFvjzgCkwtt',
  use: [apiPlugin],
  components,
});

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
