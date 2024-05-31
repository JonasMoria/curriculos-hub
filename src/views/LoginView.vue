<template>
    <div class="container" id="container">
        <div class="form-container sign-up-container">
            <form action="#">
                <h1>Cadastro</h1>
                <div class="box-error" v-if="registerError">
                    <span><b>Ops!</b> {{ registerError }}</span>
                </div>
				<div class="box-success" v-if="registerSuccess">
                    <span>{{ registerSuccess }}</span>
                </div>
                <input type="text" placeholder="Seu Nome Completo" v-model="register_data.name"/>
                <input type="email" placeholder="Email" v-model="register_data.email" />
                <input type="password" placeholder="Senha" v-model="register_data.password" />
                <input type="password" placeholder="Repita a Senha" v-model="register_data.repeat_pass" />
                <button type="button" class="buttons-login" id="btn-register" @click="register()">Cadastrar</button>
                <span class="btn-mobile-login" @click="showLogin()">Quero me logar!</span>
            </form>
        </div>
        <div class="form-container sign-in-container">
            <form action="#">
                <h1>Entrar</h1>
                <div class="box-error" v-if="loginError">
                    <span><b>Ops!</b> {{ loginError }}</span>
                </div>
                <input type="email" placeholder="Email" v-model="login_data.email" />
                <input type="password" placeholder="Senha" v-model="login_data.pass" />
                <button type="button" class="buttons-login" id="btn-login" @click="login()">Login</button>
                <span class="btn-mobile-register" @click="showRegister()">Quero realizar meu cadastro!</span>
            </form>
        </div>
        <div class="overlay-container">
            <div class="overlay">
                <div class="overlay-panel overlay-left">
                    <h1>Bem Vindo de Volta!</h1>
                    <p>Para se manter conectado, por favor, entre com suas informações pessoais.</p>
                    <button class="ghost" id="signIn"  @click="showLogin()">Entrar</button>
                </div>
                <div class="overlay-panel overlay-right">
                    <h1>Bem Vindo(a)!</h1>
                    <p>Ainda não é cadastrado? clique no botão abaixo e realize se cadastro rápido e seguro agora!</p>
                    <button class="ghost" id="signUp" @click="showRegister()">Cadastrar-me</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Http from '../assets/js/Http.js';
    import Functions from '../assets/js/Functions';

    export default {
        name: 'LoginView',
        data() {
            return {
                loginError: '',
                registerError: '',
				registerSuccess: '',

				register_data : {
					name: '',
					email: '',
					password: '',
					repeat_pass: '',
				},

				login_data: {
					email: '',
					pass: '',
				}
            }
        },

        methods: {
            showLogin: function() {
                const container = document.getElementById('container');
                container.classList.remove("right-panel-active");
            },
            showRegister: function() {
                const container = document.getElementById('container');
                container.classList.add("right-panel-active");
            },
			showLoadingButton: function(btnId, btnHtml = '') {
				let btn = document.getElementById(btnId);
				if (btnHtml) {
					btn.innerHTML = `${btnHtml}`;
					return;
				}
				btn.innerHTML = `<div class="loader"></div>`;
				return;
			},
			login: function() {
				this.loginError = '';
				this.showLoadingButton('btn-login');

				const response = Http.post(Http.urls.login, this.login_data);
				response.then((json) => {
					this.showLoadingButton('btn-login', 'Login');

					if (json.status == Http.codes.ok) {
						Functions.setSessionCookie('login_cookie', json.data[0]);
						Http.redirect('/user/home');
						return;
					} else if (json.status == Http.codes.unauthorized) {
						this.loginError = json.message;
						return;
					} else {
						this.loginError = 'Não foi possível logar agora, por favor, tente novamente mais tarde.';
						return;	
					}
				}).catch((error) => {
					this.showLoadingButton('btn-login', 'Login');
					this.registerError = 'Não foi possível logar agora, por favor, tente novamente mais tarde.';
				});

			},
			register: function() {
				this.registerError = '';
				this.showLoadingButton('btn-register');

				const validator = Functions.validateRegister(this.register_data);
				if (!validator.isValid) {
					this.registerError = validator.msg_error;
					this.showLoadingButton('btn-register', 'Cadastrar');
					return;
				}

				const response = Http.post(Http.urls.register, this.register_data);
				response.then((json) => {
					this.showLoadingButton('btn-register', 'Cadastrar');

					if (json.status == Http.codes.created) {
						this.registerSuccess = 'Você foi cadastrado em nossa plataforma! Por favor, realize o Login.';
						return;
					} else if (json.status == Http.codes.bad_request) {
						this.registerError = json.message;
						return;
					} else {
						this.registerError = 'Não foi possível cadastrar agora, por favor, tente novamente mais tarde.';
						return;	
					}
				}).catch((error) => {
					this.showLoadingButton('btn-register', 'Cadastrar');
					this.registerError = 'Não foi possível cadastrar agora, por favor, tente novamente mais tarde.';
				});
			}
        },
		beforeCreate() {
			const session_cookie = Functions.getSessionCookie('login_cookie');
			if (session_cookie) {
				Http.redirect('/user/home');
			}
		}
    }
</script>

<style scoped>
* {
	box-sizing: border-box;
}

h1 {
	font-weight: bold;
	margin-bottom: 5%;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 26px;
}

h2 {
	text-align: center;
}

p {
	font-size: 12px;
	font-weight: 100;
	line-height: 20px;
	letter-spacing: 0.5px;
	margin: 20px 0 30px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

span {
	font-size: 12px;
}

a {
	color: #333;
	font-size: 14px;
	text-decoration: none;
	margin: 15px 0;
}

button {
	border-radius: 20px;
	border: 1px solid #1B212F;
	background-color: #1B212F;
	color: #FFFFFF;
	font-size: 12px;
	font-weight: bold;
	padding: 12px 45px;
	letter-spacing: 1px;
	text-transform: uppercase;
	transition: transform 80ms ease-in;
    cursor: pointer;
}

button:active {
	transform: scale(0.95);
}

button:focus {
	outline: none;
}

button.ghost {
	background-color: transparent;
	border-color: #2DC0A3;
}

button.buttons-login {
    margin-top: 15%;
}

form {
	background-color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 50px;
	height: 100%;
	text-align: center;
}

input {
	background-color: #eee;
	border: none;
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;
}

.container {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);

	background-color: #fff;
	border-radius: 10px;
  	box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
			0 10px 10px rgba(0,0,0,0.22);
	overflow: hidden;
	width: 768px;
	max-width: 100%;
	min-height: 480px;
}

.form-container {
	position: absolute;
	top: 0;
	height: 100%;
	transition: all 0.6s ease-in-out;
}

.sign-in-container {
	left: 0;
	width: 50%;
	z-index: 2;
}

.container.right-panel-active .sign-in-container {
	transform: translateX(100%);
}

.sign-up-container {
	left: 0;
	width: 50%;
	opacity: 0;
	z-index: 1;
}

.container.right-panel-active .sign-up-container {
	transform: translateX(100%);
	opacity: 1;
	z-index: 5;
	animation: show 0.6s;
}

.box-error,
.box-success {
    border: 1px solid #E74C3C ;
    color: #E74C3C ;
    font-size: 14px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    margin: 3%;
    border-radius: 10px;
    padding: 1.5%;
    width: 100%;
}

.box-success {
	border: 1px solid var(--app-green-color);
	color: var(--app-green-color);
}

.btn-mobile-login,
.btn-mobile-register {
    display: none;
}

@keyframes show {
	0%, 49.99% {
		opacity: 0;
		z-index: 1;
	}
	
	50%, 100% {
		opacity: 1;
		z-index: 5;
	}
}

.overlay-container {
	position: absolute;
	top: 0;
	left: 50%;
	width: 50%;
	height: 100%;
	overflow: hidden;
	transition: transform 0.6s ease-in-out;
	z-index: 100;
}

.container.right-panel-active .overlay-container{
	transform: translateX(-100%);
}

.overlay {
	background-color: #1B212F;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 0 0;
	color: #FFFFFF;
	position: relative;
	left: -100%;
	height: 100%;
	width: 200%;
  	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  	transform: translateX(50%);
}

.overlay-panel {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 40px;
	text-align: center;
	top: 0;
	height: 100%;
	width: 50%;
	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.overlay-left {
	transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
	transform: translateX(0);
}

.overlay-right {
	right: 0;
	transform: translateX(0);
}

.container.right-panel-active .overlay-right {
	transform: translateX(20%);
}

@media screen and (max-width: 900px) {
    .container {
        width: 95%;
    }
    .overlay-container {
		display: none;
    }
    .sign-in-container {
        width: 100%;
    }
	.container.right-panel-active .sign-up-container {
		transform: translateX(0%);
		width: 100%;
    }

    .btn-mobile-login,
    .btn-mobile-register {
        display: block;
		margin-top: 10%;
		margin-bottom: 5%;
        width: 80%;

        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-weight: 600;
        font-size: 12px;
        color: #1B212F;
    }
}
</style>