<template>
	<div>
		ID: {{ this.user.uuid }}<br />
		{{ this.user.name }} {{ this.user.surname }}<br />
		{{ this.user.email }}
	</div>
</template>

<script>
export default {
	name: "Profile",
	data() {
		return {
			id: this.$route.params.uuid,
			user: {
				name: "",
				surname: "",
				email: "",
				uuid: "",
			},
			users: [],
			api: "http://37.77.104.246/api/jsonstorage/?id=f783c13b564589e62a759813af8f76cf",
		};
	},
	methods: {
		upd_user() {
			let config = {
				url: "https://api.jsonbin.io/v3/b/61e3f66d0f639830851d0f74",
				headers: {
					"Content-Type": "application/json",
					"X-Master-Key":
						"$2b$10$tf15G4xzYpMvghS3gZ5q4ug.LaMxTEgt/kSgag4gKYezwhz0Jxr0y",
				},
			};
			this.id = this.$route.params.uuid;
			this.axios.get(config.url, config).then((response) => {
				this.users = response.data.record;

				for (let i = 0; i < this.users.length; i++) {
					let item = this.users[i];
					if (this.id == item.id) {
						this.user.uuid = item.id;
						this.user.name = item.name;
						this.user.surname = item.surname;
						this.user.email = item.email;
					}
				}
			});
		},
	},
	mounted() {
		this.upd_user();
	},
	watch: {
		$route() {
			this.upd_user();
		},
	},
};
</script>
