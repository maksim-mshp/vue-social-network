<template>
	<div>
		<v-card class="mx-auto ucard" max-width="344" min-width="344" outlined>
			<v-list-item three-line>
				<v-list-item-content>
					<v-list-item-title class="headline mb-1">
						{{ post.title }}
					</v-list-item-title>
					<v-list-item-subtitle>{{ post.text }}</v-list-item-subtitle>
				</v-list-item-content> </v-list-item>
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
		let api =
			"http://37.77.104.246/api/jsonstorage/?id=f783c13b564589e62a759813af8f76cf";
		this.axios.get(api).then((response) => {
			this.users = response.data;
		});
	},
};
</script>

<style scoped>
.ucard {
	margin-bottom: 20px;
}
</style>
