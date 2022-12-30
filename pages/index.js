import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';

import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from '@storyblok/react';

export default function Home({ story }) {
  story = useStoryblokState(story);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout>
        <header>
          <h1>{story ? story.name : 'My Site'}</h1>
        </header>

        <StoryblokComponent blok={story.content} />
      </Layout>
    </div>
  );
}

// export async function getStaticProps() {
//   // home is the default slug for the homepage in Storyblok
//   let slug = 'home';

//   // load the draft version
//   let sbParams = {
//     version: 'draft', // or 'published'
//   };

//   const storyblokApi = getStoryblokApi();
//   let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

//   return {
//     props: {
//       story: data ? data.story : false,
//       key: data ? data.story.id : false,
//     },
//     revalidate: 3600, // revalidate every hour
//   };
// }

export async function getServerSideProps(context) {
  // get the query object
  const insideStoryblok = context.query._storyblok;
  const shouldLoadDraft = context.preview || insideStoryblok;

  let slug = 'home';

  let sbParams = {
    version: 'draft', // or 'published'
  };

  if (shouldLoadDraft) {
    sbParams.version = 'draft';
  }

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
      preview: shouldLoadDraft || false,
    },
  };
}
