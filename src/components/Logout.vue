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

		let config = {
				url: "https://api.jsonbin.io/v3/b/61e3f66d0f639830851d0f74",
				headers: {
					"Content-Type": "application/json",
					"X-Master-Key":
						"$2b$10$tf15G4xzYpMvghS3gZ5q4ug.LaMxTEgt/kSgag4gKYezwhz0Jxr0y",
				}
			};

		this.axios.get(config.url, config).then((response) => {
			this.users = response.data.record;

			for (let i = 0; i < this.users.length; i++) {
				let uuid = this.users[i].id;

				if (uuid == this.id) {
					delete this.users[i].token;
					this.axios.put(config.url, this.users, config);
					this.$router.replace("/login");
				}
			}
		});
	},
};
</script>
