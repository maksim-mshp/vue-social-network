<template>
	<div>
		<v-container>
			<v-row class="d-flex justify-space-between mb-6">
				<user-card
					:user="i"
					v-for="i in users"
					:key="i.id"
					class="pa-2"
				></user-card>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import UserCard from "../components/UserCard.vue";
export default {
	components: { UserCard },
	name: "Users",
	data() {
		return {
			users: [],
			api: "http://37.77.104.246/api/jsonstorage/?id=f783c13b564589e62a759813af8f76cf",
		};
	},
	mounted() {
		let config = {
			url: "https://api.jsonbin.io/v3/b/61e3f66d0f639830851d0f74",
			headers: {
				"Content-Type": "application/json",
				"X-Master-Key":
					"$2b$10$tf15G4xzYpMvghS3gZ5q4ug.LaMxTEgt/kSgag4gKYezwhz0Jxr0y",
			},
		};
		this.axios.get(config.url, config).then((response) => {
			this.users = response.data.record;
			for (let i = 0; i < this.users.length; i++) {
				if (this.users[i].id == localStorage.getItem("id")) {
					this.users.splice(i, 1);
					break;
				}
			}
		});
	},
};
</script>
