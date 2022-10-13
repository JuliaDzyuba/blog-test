import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button, Input } from 'antd';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute } from '../../common/enums/app-route.enum';
import { createPost, editPost } from '../../store/actions/postActions';

const { TextArea } = Input;

function PostForm() {
	const { currentPost } = useAppSelector((state) => state.postReducer);
	const dispatch = useAppDispatch();
	const history = useHistory();

	const formik = useFormik({
		initialValues: {
			title: currentPost?.title || '',
			body: currentPost?.body || '',
		},
		onSubmit: (values) => {
			if (currentPost) {
				dispatch(editPost({ id: currentPost.id, ...values }));
			} else {
				dispatch(createPost(values));
			}
			history.push(AppRoute.ROOT);
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Form.Item>
				<Input
					id='title'
					name='title'
					value={formik.values.title}
					onChange={formik.handleChange}
				/>
			</Form.Item>
			<Form.Item>
				<TextArea
					id='body'
					name='body'
					rows={4}
					value={formik.values.body}
					onChange={formik.handleChange}
				/>
			</Form.Item>
			<Form.Item>
				<Button htmlType='submit' type='primary'>
					{currentPost ? 'Edit Post' : 'Add Post'}
				</Button>
			</Form.Item>
			<Link to={`${AppRoute.ROOT}`}>Cancel</Link>
		</form>
	);
}

export default PostForm;
