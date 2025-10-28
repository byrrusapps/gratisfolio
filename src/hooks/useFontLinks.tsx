'use client';

import { useEffect } from 'react';

const  useFontLinks = (titleFontUrl: string, bodyFontUrl: string) => {
  useEffect(() => {
    const links = [
      { id: 'title-font', href: titleFontUrl },
      { id: 'body-font', href: bodyFontUrl },
    ];

    const createdLinks: HTMLLinkElement[] = [];

    links.forEach(({ id, href }) => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();

      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
      // console.log(link);
      createdLinks.push(link);
    });

    return () => {
      createdLinks.forEach(link => link.remove());
    };
  }, [titleFontUrl, bodyFontUrl]);
}

export default useFontLinks;