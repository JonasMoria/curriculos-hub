<template>
    <div class="navbar">
        <div class="box-app-logo">
            <router-link class="nav-app-name app-logo" to="/">
                <p>CvsHub.com</p>
            </router-link>
        </div>
        <div class="box-nav-links">
            <router-link class="nav-app-links app-font-navbar" to="/">
                Pesquisar
            </router-link>
            <div class="nav-app-links app-font-navbar" v-if="isLogged" @click="showDropDown = !showDropDown">
                Meu Perfil
                <div class="dropdown" id="dropdown" v-show="showDropDown">
                    <div @click="goTo('/user/home')">
                        <img src="/icons/person-info.svg">Perfil
                    </div>
                    <div @click="goTo('/user/management')">
                        <img src="/icons/cv.svg">Currículos
                    </div>
                    <div @click="finishSession()">
                        <img src="/icons/close.svg">Encerrar
                    </div>
                </div>
            </div>
            <router-link class="nav-app-links app-font-navbar" to="/login" v-if="!isLogged">
                Login
            </router-link>
        </div>
    </div>
    <div class="navbar-responsive">
        <div class="box-app-logo">
            <router-link class="nav-app-name app-font-navbar" to="/">
                <p>CvsHub.com</p>
            </router-link>
            <div class="btn-open-nav app-icon-white" @click="openNavbar()" v-bind="isModalOpen">
                <img :src="menu_icon">
            </div>
        </div>
        <div class="nav-list-links" id="nav-list-links">
            <router-link class="responsive-nav-links app-font-navbar" to="/">
                Pesquisar
            </router-link>
            <div class="responsive-nav-links app-font-navbar" v-if="isLogged" @click="showDropDown = !showDropDown">
                <span class="txt-dropdown"><img src="/icons/expand.svg" class="img-drop-expand">Meu Perfil</span>
                <div v-show="showDropDown" class="drop-options">
                    <div class="drop-option" @click="goTo('/user/home')">
                        <img src="/icons/person-info.svg">Perfil
                    </div>
                    <div class="drop-option" @click="goTo('/user/management')">
                        <img src="/icons/cv.svg">Currículos
                    </div>
                    <div class="drop-option" @click="finishSession()">
                        <img src="/icons/close.svg">Encerrar
                    </div>
                </div>
            </div>
            <router-link class="responsive-nav-links app-font-navbar" to="/login" v-if="!isLogged">
                Login
            </router-link>
        </div>
    </div>
</template>

<script>
    import Functions from '../assets/js/Functions';
    import Http from '../assets/js/Http';

    export default {
        name: 'Navbar',
        props: ["menu_icon", "alt"],
        data() {
            return {
                isModalOpen: false,
                isLogged: false,
                showDropDown: false,
            }
        },

        methods: {
            openNavbar: function() {
                let nav = document.getElementById('nav-list-links');
                if (this.isModalOpen == false) {
                    nav.classList.remove('hide-nav-animation');
                    nav.classList.add('open-nav-animation');

                    this.isModalOpen = true;
                    return;
                }

                nav.classList.remove('open-nav-animation');
                nav.classList.add('hide-nav-animation');
                this.isModalOpen = false;
                return;
            },
            goTo: function(link) {
                Http.redirect(link);
            },
            finishSession: function() {
                Functions.deleteSessionCookie('login_cookie');
                Http.redirect('/login');
            }
        },

        mounted() {
            const session_cookie = Functions.getSessionCookie('login_cookie');
			if (session_cookie) {
				this.isLogged = true;
			} else {
                this.isLogged = false;
            }
        }
    }
</script>

<style scoped>
    .navbar-responsive {
        display: none;
    }
    .navbar {
        background-color: var(--app-nav-background);
        padding: 0.6%;
        width: 100%;
        display: flex;
        justify-content:left;
        box-shadow: 1px 1px 1px 1px gray;
    }
    .nav-app-name {
        font-weight: 700;
        font-size: 1.2em;
    }

    .box-app-logo {
        padding-left: 2%;
    }
    .box-nav-links {
        width: 90%;
        display: flex;
        justify-content: flex-end;
    }
    .nav-app-links {
        width: 15%;
        text-align: right;
        align-self: flex-end;
    }
    .app-logo {
        text-decoration: none;
        color: var(--text-light);
        font-family: Comic Sans MS, Comic Sans, cursive;
    }

    .app-font-navbar {
        text-decoration: none;
        color: var(--text-light);
        font-family:system-ui;
        font-weight: 600;
        letter-spacing: 1px;
        cursor: pointer;
    }
    .app-font-navbar:hover {
        color: var(--app-green-color);
    }

    .dropdown {
        position: absolute;
        width: 10%;
        margin-left: 5%;
        box-shadow: var(--shadow);
        border-radius: var(--radius);
        margin-top: 0.7rem;
        background: var(--text-light);
        z-index: 999;
        border-radius: 0px 0px 10px 10px;
        box-shadow: 2px 2px 2px 0px lightgray;
    }

    .dropdown div {
        display: flex;
        align-items: center;
        column-gap: var(--gap);
        padding: 0.8rem 1rem;
        text-decoration: none;
        color: var(--app-nav-background);
    }

    .dropdown div img {
        padding-right: 5%;
    }

    .dropdown div:hover {
        background-color: var(--app-nav-background);
        color: var(--text-light);
    }
    .dropdown div img {
        filter: invert(56%) sepia(35%) saturate(863%) hue-rotate(118deg) brightness(99%) contrast(96%);
    }

    .show {
        transform: translateY(0rem);
        visibility: visible;
        opacity: 1;
    }

    .arrow {
        transform: rotate(180deg);
        transition: 0.2s ease;
    }

    @media screen and (max-width: 900px) {
        .navbar {
            display: none;
        }
        .navbar-responsive {
            display: block;
            font-size: 0.8em;
            padding: 1.3%;
            background-color: var(--app-nav-background);
        }
        .navbar-responsive .box-app-logo {
            display: flex;
            justify-content:left;
            width: 100%;
        }
        .navbar-responsive .nav-app-name {
            padding-left: 3%;
            width: 90%;
        }
        .navbar-responsive .btn-open-nav {
            width: 10%;
        }
        .navbar-responsive .nav-list-links {
            text-align: center;
            margin-top: 3%;
        }
        .navbar-responsive .responsive-nav-links {
            display: block;
            width: 100%;
            margin-bottom: 2.5%;
        }
        #nav-list-links {
            display: none;
        }
        .open-nav-animation {
            display: block !important;
        }
        .hide-nav-animation {
            display: none !important;
        }
        .txt-dropdown {
            color: var(--app-green-color);
        }
        .img-drop-expand {
            vertical-align:middle;
            height: 25px;
            filter: invert(56%) sepia(35%) saturate(863%) hue-rotate(118deg) brightness(99%) contrast(96%);
            padding-left: 2%;
        }
        .drop-options {
            margin-top: 4%;
            display: flex;
        }
        .drop-option {
            display: inline-block;
            width: 30%;
            color: var(--text-light);
        }
        .drop-option img {
            vertical-align: middle;
            height: 20px;
            padding-right: 3%;
            filter: invert(100%) sepia(96%) saturate(15%) hue-rotate(212deg) brightness(104%) contrast(104%);
        }
    }
</style>