import { CommentType } from './comment.type';

type CurrentPostType = {
	id: number;
	title: string;
	body: string;
	comments: CommentType[];
};

export type { CurrentPostType };
