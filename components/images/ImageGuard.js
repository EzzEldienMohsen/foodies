'use client';
import React from 'react';
import Image from 'next/image';
import burgerImg from '@/assets/burger.jpg';
const ImageGuard = ({ image, title }) => {
  const [src, setSrc] = React.useState(image);
  return <Image src={src} alt={title} fill onError={() => setSrc(burgerImg)} />;
};

export default ImageGuard;
