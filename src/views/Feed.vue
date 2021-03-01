<template>
	<div>
		<v-container>
			<v-row
				><v-btn
					class="ma-2"
					outlined
					color="teal darken-1"
					to="/addpost"
				>
					Добавить пост<v-icon right dark>
						mdi-plus
					</v-icon>
				</v-btn></v-row
			>
			<v-row class="d-flex justify-space-between mb-6">
				<post-card
					:post="i"
					v-for="i in posts"
					:key="i.post_id"
					class="pa-2"
				></post-card>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import PostCard from "../components/PostCard.vue";
export default {
	name: "Feed",
	components: {
		PostCard,
	},
	data() {
		return {
			api:
				"http://37.77.104.246/api/jsonstorage/?id=d4270af185d74c91bb9c7f6085903e5f",
			posts: [],
		};
	},
	methods: {
		get_posts() {
			this.axios.get(this.api).then((response) => {
				this.posts = response.data.reverse();
			});
		},
	},
	mounted() {
		this.get_posts();
	},
	watch: {
		$route() {
			this.get_posts();
		},
	},
};
</script>
