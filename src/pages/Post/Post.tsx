import React, { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Comment, Form, Button, Input } from 'antd';
import { useFormik } from 'formik';
import { useAppSelector, useAppDispatch } from '../../hooks';
import styles from './styles.module.scss';
import { AppRoute } from '../../common/enums/app-route.enum';
import {
	addComment,
	deletePost,
	loadCurrentPost,
} from '../../store/actions/postActions';
import { PageParams } from '../../common/types/page-params.type';
import Loader from '../../components/Loader';

const { TextArea } = Input;

function Post() {
	const { currentPost } = useAppSelector((state) => state.postReducer);
	const dispatch = useAppDispatch();
	const { id } = useParams<PageParams>();
	const history = useHistory();

	const formik = useFormik({
		initialValues: {
			comment: '',
		},
		onSubmit: (values) => {
			dispatch(addComment({ postId: +id, body: values.comment }));
			dispatch(loadCurrentPost(+id));
			formik.values.comment = '';
		},
	});

	const handleClick = () => {
		dispatch(deletePost(+id));
		history.push(AppRoute.ROOT);
	};

	useEffect(() => {
		dispatch(loadCurrentPost(+id));
	}, []);

	if (!currentPost) {
		return <Loader />;
	}

	return (
		<div className={styles.post}>
			<Link to={`${AppRoute.ROOT}`}>Back to all posts</Link>
			<h1>{currentPost?.title}</h1>
			<p>{currentPost.body}</p>
			<Link to={AppRoute.EDIT_POST} className={styles.link}>
				Edit Post
			</Link>

			<hr />
			<hr />
			<h3>Comments</h3>
			<ul>
				{currentPost.comments.map((c) => (
					<li key={`${c.id} + Date.now()`}>
						<Comment author={`Author: ${c.id}`} content={<p>{c.body}</p>} />
					</li>
				))}
			</ul>

			<form onSubmit={formik.handleSubmit}>
				<Form.Item>
					<TextArea
						id='comment'
						name='comment'
						rows={4}
						value={formik.values.comment}
						onChange={formik.handleChange}
					/>
				</Form.Item>
				<Form.Item>
					<Button htmlType='submit' type='primary'>
						Add Comment
					</Button>
				</Form.Item>
			</form>
			<hr />
			<hr />
			<Button type='dashed' className={styles.linkDelete} onClick={handleClick}>
				Delete Post
			</Button>
		</div>
	);
}

export default Post;
