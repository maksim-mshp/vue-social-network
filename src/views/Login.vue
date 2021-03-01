<template>
	<div id="app">
		<v-alert color="blue" outlined text type="info" v-if="needAlert"
			>Для продолжения необходимо войти</v-alert
		>
		<v-alert color="red" outlined text type="error" v-if="wrong"
			>Неправильный логин или пароль</v-alert
		>
		<div>
			<h1>Вход</h1>
			<router-link to="/register" class="reg_link">Регистрация</router-link>
			<div class="login_form">
				<v-text-field
					label="Email"
					placeholder="Email"
					color="teal darken-1"
					v-model="login"
				></v-text-field>
				<v-text-field
					:append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
					:type="show_pass ? 'text' : 'password'"
					name="input-10-2"
					class="input-group--focused"
					@click:append="show_pass = !show_pass"

					label="Пароль"
					placeholder="Пароль"
					color="teal darken-1"
					v-model="password"
				></v-text-field>
				<div class="btn_wrap" align="center">
					<v-btn
						color="teal darken-1"
						class="white--text"
						style="width: 125px; margin-top: 25px"
						@click="get_users"
						>Войти</v-btn
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Login",
	data() {
		return {
			needAlert: this.$route.query.alert == 1,
			wrong: false,
			login: "",
			password: "",
			users: [],
			id: -1,
			show_pass: false,
			api:
				"http://37.77.104.246/api/jsonstorage/?id=f783c13b564589e62a759813af8f76cf",
		};
	},
	methods: {
		hash_pass() {
			let ph = require("password-hash");
			let hashedPassword = ph.generate(this.password);
			console.log(hashedPassword);
		},
		generate_token(length) {
			var result = "";
			var characters =
				"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			var charactersLength = characters.length;
			for (var i = 0; i < length; i++) {
				result += characters.charAt(
					Math.floor(Math.random() * charactersLength)
				);
			}
			return result;
		},
		find_user() {
			let ph = require("password-hash");

			for (let i = 0; i < this.users.length; i++) {
				let item = this.users[i];

				if (item.email == this.login) {
					if (ph.verify(this.password, item.password)) {
						this.id = item.id;
						return 0;
					}
					return 1;
				}
			}
			return -1;
		},
		get_users() {
			this.axios.get(this.api).then((response) => {
				this.users = response.data;
				let isAuth = this.find_user();
				if (isAuth == 0) {
					let token = this.generate_token(32);
					for (let i = 0; i < this.users.length; i++) {
						let uuid = this.users[i].id;

						if (uuid == this.id) {
							this.users[i].token = token;
							this.axios.put(this.api, this.users);
							localStorage.setItem('auth', 1);
							localStorage.setItem('token', token);
							localStorage.setItem('id', uuid);
							this.$router.replace('/feed')
						}
					}
				} else {
					this.wrong = true;
				}
			});
		},
	},
	mounted() {
		if (localStorage.getItem('auth') != null) {
			this.$router.replace('/feed');
		}
	},
};
</script>

<style scoped>
h1 {
	text-align: center;
}

.login_form {
	width: 50%;
	margin: auto;
	margin-top: 50px;
}

.btn_wrap {
	margin: auto;
}

.reg_link {
	display: block;
	margin: auto;
	text-align: center;
}
</style>
