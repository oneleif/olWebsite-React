import React from 'react';
import { Route } from 'react-router-dom';

/**
 * This file is used to generate a sitemap.xml for our site.
 * This sitemap is used for SEO; see https://www.amitsn.com/blog/how-to-generate-a-sitemap-for-your-react-website-with-dynamic-content
 */
export default (
  <Route>
    <Route path='/contact' />
    <Route path='/team' />
    <Route path='/projects' />
  </Route>
);
