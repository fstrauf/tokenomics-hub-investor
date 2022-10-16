import {useNextSanityImage} from 'next-sanity-image'
import Image from 'next/image';

const sanityConfig = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true
});

const SanityImage = ({ asset }) => {
  const imageProps = useNextSanityImage(sanityConfig, asset);

  if (!imageProps) return null;

  return (<Image 
    {...imageProps}
    layout='responsive'
    sizes='(max-width: 800px) 100vw, 800px'
  />);
}