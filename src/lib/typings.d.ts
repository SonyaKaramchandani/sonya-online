import type { PortableTextBlock } from '@portabletext/types';

interface SanityBody {
	_createdAt: string;
	_id: string;
	_rev: string;
	_updatedAt: string;
}

export interface About extends SanityBody {
	_type: 'about';
	title: string;
	description: PortableTextBlock[];
	image: string;
	cv: string;
}
