/* eslint-disable class-methods-use-this */
import { API_URL } from '../common/constants';
import { ApiPath } from '../common/enums/api-path.enum';
import { CommentCreatePayload } from '../common/types/comment-create-payload.type';
import { CommentType } from '../common/types/comment.type';
import { PostCreatePayload } from '../common/types/post-create-payload.type';
import { PostEditPayload } from '../common/types/post-edit-payload.type';
import { PostType } from '../common/types/post.type';

class PostServices {
	async getAll() {
		const url = `${API_URL}${ApiPath.POSTS}`;
		try {
			const response = await fetch(url);
			const data = await response.json();
			return data;
		} catch (error) {
			return error;
		}
	}

	async getById(id: number) {
		const url = `${API_URL}${ApiPath.POSTS}/${id}${ApiPath.EMBED_COMMENTS}`;
		try {
			const response = await fetch(url);
			const data = await response.json();
			return data;
		} catch (error) {
			return error;
		}
	}

	async createPost(payload: PostCreatePayload): Promise<PostType> {
		const url = `${API_URL}${ApiPath.POSTS}`;
		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		});
		const data = await response.json();
		return data;
	}

	async editPost(payload: PostEditPayload): Promise<PostType> {
		const url = `${API_URL}${ApiPath.POSTS}/${payload.id}`;
		const response = await fetch(url, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		});
		const data = await response.json();
		return data;
	}

	async deletePost(id: number): Promise<PostType> {
		const url = `${API_URL}${ApiPath.POSTS}/${id}`;
		const response = await fetch(url, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
		});
		const data = await response.json();
		return data;
	}

	async addComment(payload: CommentCreatePayload): Promise<CommentType> {
		const url = `${API_URL}${ApiPath.COMMENTS}`;
		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		});
		const data = await response.json();
		return data;
	}
}

export default new PostServices();
