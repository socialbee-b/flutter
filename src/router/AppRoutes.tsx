import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Landing from "../components/landing/Landing";
import Layout from "../components/Layout/Layout";
import Login from "../components/login/Login";
import PostFeed from "../components/post-feed/PostFeed";
import PostPage from "../components/PostPage/PostPage";
import Profile from "../components/profile/Profile";
import Register from "../components/register/Register";
import Settings from "../components/settings-page/Settings";
import SideNavLayout from "../components/SideNavLayout/SideNavLayout";
import { getUserFromLocal } from "../components/store/users.slice";

const AppRoutes: React.FC<unknown> = () => {
	const dispatch = useDispatch<any>();

	useEffect(() => {
		dispatch(getUserFromLocal());
	}, []); // eslint-disable-line

	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Landing />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				<Route element={<SideNavLayout />}>
					<Route path="/settings" element={<Settings />} />
					<Route path="/feed" element={<PostFeed />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/posts/:id" element={<PostPage />} />
				</Route>
			</Route>
		</Routes>
	);
};

export default AppRoutes;
