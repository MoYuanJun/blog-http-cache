import React from 'react';
import CacheControl from './page/CacheControl';


export default {
  logo: {             
    img: void 0,      
    title: 'Cache',
  },
  menu: [ 
    {
      key: 'override',
      title: 'Cache-Control',
      icon: 'AndroidOutlined',
      url: '/cache-control',
      routes: [
        {
          path: '/cache-control',
          element: <CacheControl />,
        },
      ],
    },
    
  ],
};