<template>
	<div id="app">
		<Main v-if="auth"></Main>
		<Auth v-else></Auth>
	</div>
</template>

<script>
import Main from "./components/Main.vue";
import Auth from "./components/Auth.vue";
export default {
	components: {
		Main,
		Auth,
	},
	data() {
		return {
			id: 0,
			username: "Ivan Petrov",
			auth: localStorage.getItem("auth") != null,
		};
	},
	methods: {
		redirect() {
			this.auth = localStorage.getItem("auth") != null;
			if (!this.auth && window.location.pathname != "/login" && window.location.pathname != "/register") {
				this.$router.replace("/login?alert=1");
			}
		}
	},
	mounted() {
		this.redirect()
	},
	watch: {
		$route() {
			this.redirect()
		},
	},
};
</script>
