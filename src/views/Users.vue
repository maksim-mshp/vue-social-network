<template>
	<div>
		<v-container>
			<v-row class="d-flex justify-space-between mb-6">
				<user-card :user="i" v-for="i in users" :key="i.id" class="pa-2"></user-card>
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
			api:
				"http://37.77.104.246/api/jsonstorage/?id=f783c13b564589e62a759813af8f76cf",
		};
	}, mounted() {
		this.axios.get(this.api).then((response) => {
			this.users = response.data;
			for (let i = 0; i < this.users.length; i++) {
				if (this.users[i].id == localStorage.getItem('id')) {
					this.users.splice(i, 1);
					break;
				}
			}
		})
	}
};
</script>
