<template>
	<div>
		<v-card class="mx-auto ucard" max-width="344" min-width="344" outlined>
			<v-list-item three-line>
				<v-list-item-content>
					<v-list-item-title class="headline mb-1">
						{{ user.name }} {{ user.surname }}
					</v-list-item-title>
					<v-list-item-subtitle>{{
						user.email
					}}</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>

			<v-card-actions>
				<v-btn text color="teal darken-1" :to="'/id' + user.id">
					Перейти на страницу
				</v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script>
export default {
	name: "UserCard",
	props: ["user"],
};
</script>

<style scoped>
.ucard {
	margin-bottom: 20px;
}
</style>
