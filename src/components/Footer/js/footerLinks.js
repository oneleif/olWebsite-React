import projectCards from '../../../pages/js/projects.js';

//  static data can be generated from the projects.js file
// [
//   {
//     label: 'Oneleif',
//     path: '/projects',
//     internal: true
//   },
//   {
//     label: 'Bread for the Journey',
//     path: '/projects',
//     internal: true
//   },
//   {
//     label: 'Swift UI Kit',
//     path: '/projects',
//     internal: true
//   },
//   {
//     label: 'Leifdown',
//     path: '/projects',
//     internal: true
//   },
//   {
//     label: 'Filodex',
//     path: '/projects',
//     internal: true
//   },
//   {
//     label: 'Onefit',
//     path: '/projects',
//     internal: true
//   }
// ]

/************************************
 * Proposal
 ************************************/
// the data can be generated creating the array of objects
// pros: less code
// cons: logic implementation if path and internal differ between objects

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
