import { sanityClient } from '$lib/sanityClient';
import type { Work } from '$lib/typings';

const query = `*[_type == "work"]{
	_id,
	_type,
	title,
	description,
	roles,
	date,
	techstack,
	"image": picture.asset->url
  }`;

export const load = async () => {
	try {
		const work: Work[] = await sanityClient.fetch(query);
		work.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

		// console.log(work);
		return { work };
	} catch (error) {
		console.error('An error occurred:', error);
		return Response.json(
			{ error: 'An error occurred while fetching programs data' },
			{ status: 500 }
		);
	}
};
