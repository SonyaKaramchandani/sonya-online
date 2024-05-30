import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { PUBLIC_SANITY_DATASET, PUBLIC_SANITY_PROJECT_ID } from '$env/static/public';

const config = {
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET,
	apiVersion: '2022-03-07',
	useCdn: true
};

export const sanityClient = createClient(config);
const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: SanityImageSource) => {
	return builder.image(source);
};
