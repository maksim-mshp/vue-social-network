<template>
	<v-app id="inspire">
		<v-app-bar app color="teal darken-1" flat>
			<v-container class="py-0 fill-height">
				<v-avatar
					style="margin-right: 15px !important"
					class="mr-10"
					color="white"
					size="45"
					><span class="teal--text headline">{{
						user.initials
					}}</span></v-avatar
				>
				<div class="username">{{ user.name }} {{ user.surname }}</div>
				<v-spacer></v-spacer>

				<v-btn text color="white" to="/logout"
					>Выход<v-icon right>mdi-logout-variant</v-icon>
				</v-btn>
			</v-container>
		</v-app-bar>

		<v-main class="grey lighten-3">
			<v-container>
				<v-row>
					<v-col cols="auto" class="sidebar">
						<v-sheet rounded="lg">
							<v-list dense>
								<v-list-item-group color="teal darken-1">
									<v-list-item to="/feed">
										<v-list-item-icon>
											<v-icon>mdi-post-outline</v-icon>
										</v-list-item-icon>
										<v-list-item-content>
											<v-list-item-title
												>Лента</v-list-item-title
											>
										</v-list-item-content>
									</v-list-item>

									<v-list-item
										@click="goMyAccount"
									>
										<v-list-item-icon>
											<v-icon>mdi-home-account</v-icon>
										</v-list-item-icon>
										<v-list-item-content>
											<v-list-item-title
												>Мой профиль</v-list-item-title
											>
										</v-list-item-content>
									</v-list-item>

									<v-list-item to="/users">
										<v-list-item-icon>
											<v-icon
												>mdi-account-multiple</v-icon
											>
										</v-list-item-icon>
										<v-list-item-content>
											<v-list-item-title
												>Пользователи</v-list-item-title
											>
										</v-list-item-content>
									</v-list-item>
								</v-list-item-group>
							</v-list>
						</v-sheet>
					</v-col>

					<v-col>
						<v-sheet min-height="70vh" style="padding: 20px">
							<router-view></router-view>
						</v-sheet>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: "Main",
	data() {
		return {
			token: localStorage.getItem("token"),
			users: [],
			user: {
				initials: "LD",
			},
			api:
				"http://37.77.104.246/api/jsonstorage/?id=f783c13b564589e62a759813af8f76cf",
		};
	},
	mounted() {
		let elem = document.getElementsByClassName("sidebar")[0];
		elem.style.width = elem.clientWidth + 50 + "px";
		this.re_built();
	},
	methods: {
		goMyAccount() {
			this.$router.replace("/id" + this.user.id);
		},
		re_built() {
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
					let item = this.users[i];
					if (this.token == item.token) {
						this.user.id = item.id;
						this.user.name = item.name;
						this.user.surname = item.surname;
						this.user.email = item.email;
					}
				}

				this.user.initials = this.user.name[0] + this.user.surname[0];
			});
		},
	},
	watch: {
		$route() {
			this.re_built();
		},
	},
};
</script>

<style scoped>
.username {
	color: white;
	font-weight: 900;
}
</style>
