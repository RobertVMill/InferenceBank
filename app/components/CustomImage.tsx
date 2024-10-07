import Image, { ImageProps } from 'next/image';

// Custom loader to allow images from any domain
const customLoader = ({ src }: { src: string }) => {
  return src; // Return the raw src URL without using Next.js optimization
};

// Custom Image component using the custom loader
const CustomImage = (props: ImageProps) => {
  return <Image {...props} loader={customLoader} unoptimized />;
};

export default CustomImage;
