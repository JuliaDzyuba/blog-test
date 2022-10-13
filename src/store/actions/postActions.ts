import { createAsyncThunk } from '@reduxjs/toolkit';
import { CommentCreatePayload } from '../../common/types/comment-create-payload.type';
import { CommentType } from '../../common/types/comment.type';
import { CurrentPostType } from '../../common/types/current-post.type';
import { PostCreatePayload } from '../../common/types/post-create-payload.type';
import { PostEditPayload } from '../../common/types/post-edit-payload.type';
import { PostType } from '../../common/types/post.type';
import postService from '../../services/postService';
import { AsyncThunkConfig } from '../store';

import { ActionType } from './action.type';

export const loadPosts = createAsyncThunk<
	PostType[],
	undefined,
	AsyncThunkConfig
>(ActionType.LOAD_POSTS, async (_args, thunk) => {
	try {
		const posts = await postService.getAll();
		return posts;
	} catch (error) {
		return thunk.rejectWithValue(`Error: ${error}`);
	}
});

export const loadCurrentPost = createAsyncThunk<
	CurrentPostType,
	number,
	AsyncThunkConfig
>(ActionType.LOAD_CURRENT_POSTS, async (id, thunk) => {
	try {
		const post = await postService.getById(id);
		return post;
	} catch (error) {
		return thunk.rejectWithValue(`Error: ${error}`);
	}
});

export const createPost = createAsyncThunk<
	PostType,
	PostCreatePayload,
	AsyncThunkConfig
>(ActionType.CREATE_POST, async (payload, thunk) => {
	try {
		const post = await postService.createPost(payload);
		return post;
	} catch (error) {
		return thunk.rejectWithValue(`Error: ${error}`);
	}
});

export const editPost = createAsyncThunk<
	PostType,
	PostEditPayload,
	AsyncThunkConfig
>(ActionType.EDIT_POST, async (payload, thunk) => {
	try {
		const post = await postService.editPost(payload);
		return post;
	} catch (error) {
		return thunk.rejectWithValue(`Error: ${error}`);
	}
});

export const deletePost = createAsyncThunk<PostType, number, AsyncThunkConfig>(
	ActionType.DELETE_POST,
	async (id, thunk) => {
		try {
			const post = await postService.deletePost(id);
			return post;
		} catch (error) {
			return thunk.rejectWithValue(`Error: ${error}`);
		}
	}
);

export const addComment = createAsyncThunk<
	CommentType,
	CommentCreatePayload,
	AsyncThunkConfig
>(ActionType.ADD_COMMENT, async (payload, thunk) => {
	try {
		const comment = await postService.addComment(payload);
		return comment;
	} catch (error) {
		return thunk.rejectWithValue(`Error: ${error}`);
	}
});
