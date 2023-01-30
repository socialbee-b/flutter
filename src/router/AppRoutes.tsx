import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "../components/landing/Landing";
import Layout from "../components/Layout/Layout";
import Login from "../components/login/Login";
import { PostFeed } from "../components/post-feed/PostFeed";
import Profile from "../components/profile/Profile";
import Register from "../components/register/Register";
import Settings from "../components/settings-page/Settings";
import SideNavLayout from "../components/SideNavLayout/SideNavLayout";

export const AppRoutes: React.FC<unknown> = () => (
	<Routes>
		<Route path="/" element={<Layout />}>
			<Route element={<SideNavLayout />}>
				<Route path="/settings" element={<Settings />} />
				<Route index element={<PostFeed />} />
				<Route path="/profile" element={<Profile />} />
			</Route>

			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/welcome" element={<Landing />} />
		</Route>
	</Routes>
);
