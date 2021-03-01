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
				uuid: '',
			},
			users: [],
			api:
				"http://37.77.104.246/api/jsonstorage/?id=f783c13b564589e62a759813af8f76cf",
		};
	},
	methods: {
		upd_user() {
			this.id = this.$route.params.uuid;
			this.axios.get(this.api).then((response) => {
				this.users = response.data;

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
