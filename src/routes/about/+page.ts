import { sanityClient } from '$lib/sanityClient';
import type { About } from '$lib/typings';

const query = `*[_type == "about"][0]{
	_id,
	_type,
	title,
	subtitle,
	description,
	cv,
	"image": picture.asset->url
  }`;

export const load = async () => {
	try {
		const about: About = await sanityClient.fetch(query);
		// console.log('Data', { about });
		return about;
	} catch (error) {
		console.error('An error occurred:', error);
		return Response.json(
			{ error: 'An error occurred while fetching programs data' },
			{ status: 500 }
		);
	}
};
