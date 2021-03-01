import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";

import Feed from "../views/Feed.vue";
import Profile from "../views/Profile.vue";
import Users from "../views/Users.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Logout from "../components/Logout.vue";
import AddPost from "../views/AddPost.vue";

Vue.use(VueAxios, axios);
Vue.use(VueRouter);

const routes = [
	{
		path: "/feed",
		name: "Feed",
		component: Feed,
	},
	{
		path: "/id:uuid",
		name: "Profile",
		component: Profile,
	},
	{
		path: "/users",
		name: "Users",
		component: Users,
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
	},
	{
		path: "/logout",
		name: "Logout",
		component: Logout,
	},
	{
		path: "/register",
		name: "Register",
		component: Register,
	},
	{
		path: "/addpost",
		name: "AddPost",
		component: AddPost,
	},
	{ path: "/", redirect: "/feed" },
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
