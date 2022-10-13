import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import Homepage from './pages/Homepage/Homepage';
import { AppRoute } from './common/enums/app-route.enum';
import NotFound from './pages/NotFound/NotFound';
import Post from './pages/Post/Post';
import CreatePost from './pages/CreatePost/CreatePost';
import EditPost from './pages/EditPost/EditPost';

const { Header, Footer, Content } = Layout;

function App() {
	return (
		<Layout>
			<Header>
				<h2>Stay with UKRAINE</h2>
			</Header>
			<Content>
				<Router>
					<Switch>
						<Route exact path={AppRoute.ROOT}>
							<Homepage />
						</Route>
						<Route exact path={AppRoute.CREATE_POST}>
							<CreatePost />
						</Route>
						<Route exact path={AppRoute.EDIT_POST}>
							<EditPost />
						</Route>
						<Route exact path={AppRoute.POSTS_ID}>
							<Post />
						</Route>
						<Route path={AppRoute.ANY} component={NotFound} />
					</Switch>
				</Router>
			</Content>
			<Footer>
				<h3>Stay with UKRAINE</h3>
			</Footer>
		</Layout>
	);
}

export default App;
