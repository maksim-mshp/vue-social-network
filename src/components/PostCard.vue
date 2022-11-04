<template>
	<div>
		<v-card class="mx-auto ucard" max-width="344" min-width="344" outlined>
			<v-list-item three-line>
				<v-list-item-content>
					<v-list-item-title class="headline mb-1">
						{{ post.title }}
					</v-list-item-title>
					<v-list-item-subtitle>{{ post.text }}</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<v-card-actions>
				<v-btn text color="teal darken-1" :to="'/id' + post.author">
					Автор: {{ get_user_name(post.author) }}
				</v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script>
export default {
	name: "PostCard",
	props: ["post"],
	data() {
		return {
			users: [],
		};
	},
	methods: {
		get_user_name(id) {
			for (let i = 0; i < this.users.length; i++) {
				if (this.users[i].id == id) {
					return this.users[i].name + " " + this.users[i].surname;
				}
			}
		},
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
		});
	},
};
</script>

<style scoped>
.ucard {
	margin-bottom: 20px;
}
</style>
