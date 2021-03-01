<template>
	<div id="app"></div>
</template>

<script>
export default {
	name: "Logout",
	data() {
		return {
			users: [],
			id: localStorage.getItem("id"),
			api:
				"http://37.77.104.246/api/jsonstorage/?id=f783c13b564589e62a759813af8f76cf",
		};
	},
	mounted() {
		localStorage.removeItem("token");
		localStorage.removeItem("id");
		localStorage.removeItem("auth");

		this.axios.get(this.api).then((response) => {
			this.users = response.data;

			for (let i = 0; i < this.users.length; i++) {
				let uuid = this.users[i].id;

				if (uuid == this.id) {
					delete this.users[i].token;
					this.axios.put(this.api, this.users);
					this.$router.replace("/login");
				}
			}
		});
	},
};
</script>
