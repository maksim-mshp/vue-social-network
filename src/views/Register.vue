<template>
	<div id="app">
		<div>
			<h1>Регистрация</h1>
			<router-link to="/login" class="reg_link">Вход</router-link>
			<div class="login_form">
				<v-text-field
					label="Имя"
					placeholder="Имя"
					color="teal darken-1"
					v-model="name"
				></v-text-field>
				<v-text-field
					label="Фамилия"
					placeholder="Фамилия"
					color="teal darken-1"
					v-model="surname"
				></v-text-field>
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
						style="width: 200px; margin-top: 25px"
						@click="regist"
						>Зарегистрироваться</v-btn
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Register",
	data() {
		return {
			name: "",
			surname: "",
			login: "",
			password: "",
			id: -1,
			api:
				"http://37.77.104.246/api/jsonstorage/?id=f783c13b564589e62a759813af8f76cf",
            users: [],
            show_pass: false
		};
	},
	methods: {
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
		regist() {
			let ph = require("password-hash");
			this.axios.get(this.api).then((response) => {
				this.users = response.data;

				this.id = this.users[this.users.length - 1].id + 1;

				let user = {
					id: this.id,
					name: this.name,
					surname: this.surname,
					email: this.login,
					password: ph.generate(this.password),
					token: this.generate_token(32),
				};

				localStorage.setItem("auth", 1);
				localStorage.setItem("token", user.token);
				localStorage.setItem("id", user.id);

				this.users.push(user);
                this.axios.put(this.api, this.users);
                
                this.$router.replace('/feed');
			});
		},
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
