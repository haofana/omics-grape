import React from "react";
import { createBrowserRouter } from "react-router";

const route = createBrowserRouter([
  {
    path: '/',
    key: 'Home',
    children: [
      {
        path: '/Browse',
        key: 'Browse',
      },{
        path: '/Search',
        key: 'Search',
      },
      {
        path: '/tissue',
        key: 'Expression-of-tissue',
      },{
        path: '/transcriptome',
        key: 'Expression-of-transcriptome',
        Component: <div>transcriptome</div>,
      },
      {
        path: '/Chloroplast ',
        key: 'Chloroplast',
        Component: <div>Chloroplast</div>,
      },
      {
        path: '/Germplasm',
        key: 'Germplasm',
        Component: <div>Germplasm</div>,
      },
      {
        path: '/Download',
        key: 'Download',
        Component: <div>Download</div>,
      },
      {
        path: '/Blast',
        key: 'Blast',
        Component: <div>Blast</div>,
      },
      {
        key: 'Language',
        Component: <div>Language</div>,
      },
    ]
  },
]);

export default route
