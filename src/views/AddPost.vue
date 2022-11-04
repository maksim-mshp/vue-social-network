<template>
	<div class="pa-3">
		<h1>Добавить пост</h1>
		<div class="form">
			<v-text-field
				label="Название"
				placeholder="Название"
				color="teal darken-1"
				v-model="post.title"
			></v-text-field>
			<v-textarea
				name="input-7-1"
				value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
				placeholder="Текст"
				label="Текст"
				color="teal darken-1"
				v-model="post.text"
				auto-grow
			></v-textarea>
			<div class="btn_wrap" align="center">
				<v-btn
					color="teal darken-1"
					class="white--text"
					style="width: 150px; margin-top: 25px"
					@click="addpost"
					>Сохранить</v-btn
				>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "AddPost",
	data() {
		return {
			post: {
				title: "",
				text: "",
            },
            api:
				"http://37.77.104.246/api/jsonstorage/?id=d4270af185d74c91bb9c7f6085903e5f",
			posts: [],
		};
	}, methods: {
        addpost() {
					let config = {
				url: "https://api.jsonbin.io/v3/b/63659b3b2b3499323bf5bfa8",
				headers: {
					"Content-Type": "application/json",
					"X-Master-Key":
						"$2b$10$tf15G4xzYpMvghS3gZ5q4ug.LaMxTEgt/kSgag4gKYezwhz0Jxr0y",
				}
			};
            this.axios.get(config.url, config).then((response) => {
                this.posts = response.data.record;
                this.posts.push({
                    post_id: this.posts[this.posts.length - 1].post_id + 1,
                    title: this.post.title,
                    text: this.post.text,
                    author: parseInt(localStorage.getItem('id')),
                });

                this.axios.put(config.url, this.posts, config);
                this.$router.replace('/feed');
			});
        }
    }
};
</script>

<style scoped>
h1 {
	text-align: center;
}

.form {
	width: 80%;
	margin: auto;
	margin-top: 50px;
}

.btn_wrap {
	margin: auto;
}
</style>
