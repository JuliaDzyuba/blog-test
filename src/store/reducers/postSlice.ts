import { createSlice } from '@reduxjs/toolkit';
import { PostType } from '../../common/types/post.type';
import { DataStatus } from '../../common/enums/data-status.enum';
import {
	loadPosts,
	loadCurrentPost,
	addComment,
	editPost,
	createPost,
	deletePost,
} from '../actions/postActions';
import { CurrentPostType } from '../../common/types/current-post.type';

export interface PostState {
	posts: PostType[];
	currentPost: CurrentPostType | null;
	status: DataStatus;
}

const initialState: PostState = {
	posts: [],
	currentPost: null,
	status: DataStatus.IDLE,
};

export const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(loadPosts.pending, (state) => {
			state.status = DataStatus.PENDING;
		});
		builder.addCase(loadPosts.fulfilled, (state, action) => {
			state.status = DataStatus.FULFILLED;
			state.posts = action.payload;
			state.currentPost = null;
		});
		builder.addCase(loadPosts.rejected, (state) => {
			state.status = DataStatus.REJECTED;
		});

		builder.addCase(loadCurrentPost.pending, (state) => {
			state.status = DataStatus.PENDING;
		});
		builder.addCase(loadCurrentPost.fulfilled, (state, action) => {
			state.status = DataStatus.FULFILLED;
			state.currentPost = action.payload;
		});
		builder.addCase(loadCurrentPost.rejected, (state) => {
			state.status = DataStatus.REJECTED;
		});

		builder.addCase(createPost.pending, (state) => {
			state.status = DataStatus.PENDING;
		});
		builder.addCase(createPost.fulfilled, (state, action) => {
			state.status = DataStatus.FULFILLED;
			state.posts.push(action.payload);
		});
		builder.addCase(createPost.rejected, (state) => {
			state.status = DataStatus.REJECTED;
		});

		builder.addCase(editPost.pending, (state) => {
			state.status = DataStatus.PENDING;
		});
		builder.addCase(editPost.fulfilled, (state, action) => {
			state.status = DataStatus.FULFILLED;
			const idx = state.posts.findIndex((p) => p.id === action.payload.id);
			state.posts.splice(idx, 1, action.payload);
		});
		builder.addCase(editPost.rejected, (state) => {
			state.status = DataStatus.REJECTED;
		});

		builder.addCase(deletePost.pending, (state) => {
			state.status = DataStatus.PENDING;
		});
		builder.addCase(deletePost.fulfilled, (state, action) => {
			state.status = DataStatus.FULFILLED;
			const idx = state.posts.findIndex((p) => p.id === action.payload.id);
			state.posts.splice(idx, 1);
		});
		builder.addCase(deletePost.rejected, (state) => {
			state.status = DataStatus.REJECTED;
		});

		builder.addCase(addComment.pending, (state) => {
			state.status = DataStatus.PENDING;
		});
		builder.addCase(addComment.fulfilled, (state, action) => {
			state.status = DataStatus.FULFILLED;
			state.currentPost?.comments.push(action.payload);
		});
		builder.addCase(addComment.rejected, (state) => {
			state.status = DataStatus.REJECTED;
		});
	},
});

export default postSlice.reducer;
