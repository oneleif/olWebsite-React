import React from 'react';

import { Helmet } from 'react-helmet';

export default function ReactHelmetWrapper({ title, description, image, path = '/' }) {
  /************************************
   * Render
   ************************************/

  return (
    <Helmet titleTemplate='%s | oneleif' defaultTitle='oneleif Website' defer={false}>
      <title itemProp='name' lang='en'>
        {title}
      </title>
      <base target='_blank' href='https://oneleif.com/' />
      <meta name='description' content={description} />
      <meta name='robots' content='max-snippet:-1, max-image-preview:large, max-video-preview:-1' />
      <link rel='canonical' href={`https://oneleif.com${path}`} />
      <meta property='og:locale' content='en_US' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:url' content={`https://oneleif.com${path}`} />
      <meta property='og:site_name' content='oneleif' />
      <meta property='og:image' content={image} />
      <meta property='og:image:secure_url' content={image} />
      <meta property='og:image:width' content='1280' />
      <meta property='og:image:height' content='720' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:site' content='@oneleifdev' />
      <meta name='twitter:creator' content='@oneleifdev' />
      <meta name='twitter:image' content={image} />
    </Helmet>
  );
}
