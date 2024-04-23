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

export interface Work extends SanityBody {
	_type: 'work';
	title: string;
	description: PortableTextBlock[];
	year: string;
	roles: string[];
	url: string;
	image: string;
	techstack: Technology[];
}

export interface Technology {
	name: string;
	icon: Icon;
}

export interface Icon {
	provider: string;
	name: string;
	svg: string;
}
