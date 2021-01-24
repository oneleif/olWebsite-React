import projectCards from '../../../pages/js/projects.js';

// TODO: load links from API

const parseLinks = projectCards.map(project => {
  return {
    label: project.name,
    path: '/projects',
    internal: true
  };
});

/************************************
 *
 ************************************/

const footerLinks = [
  {
    header: 'Projects',
    links: parseLinks
  },
  {
    header: 'Resources',
    links: [
      {
        label: 'Blog',
        path: '/blogs',
        internal: true
      },
      {
        label: 'Learn',
        path: '/learn',
        internal: true
      },
      {
        label: 'Support',
        path: '/support',
        internal: true
      }
    ]
  },
  {
    header: 'Community',
    links: [
      {
        label: 'Team',
        path: '/team',
        internal: true
      },
      {
        label: 'About',
        path: '/about',
        internal: true
      },
      {
        label: 'Contact Us',
        path: '/contact',
        internal: true
      }
    ]
  }
];

export default footerLinks;
