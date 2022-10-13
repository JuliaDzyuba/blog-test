import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './styles.module.scss';
import { AppRoute } from '../../common/enums/app-route.enum';
import { loadPosts } from '../../store/actions/postActions';

function Homepage() {
	const { posts } = useAppSelector((state) => state.postReducer);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(loadPosts());
	}, []);

	return (
		<>
			<h1>Blog</h1>
			<Link to={AppRoute.CREATE_POST} className={styles.link}>
				Create Post
			</Link>
			<ul className={styles.list}>
				{posts.map((p) => (
					<li key={`${p.id}-${p.title}`}>
						<Link to={`${AppRoute.POSTS}/${p.id}`}>
							<Card title={p.title}>
								<p>{p.body}</p>
							</Card>
						</Link>
					</li>
				))}
			</ul>
		</>
	);
}

export default Homepage;
