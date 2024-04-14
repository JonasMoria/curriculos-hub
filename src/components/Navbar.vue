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
            <router-link class="nav-app-links app-font-navbar" to="/">
                Sobre
            </router-link>
            <router-link class="nav-app-links app-font-navbar" to="/login">
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
            <router-link class="responsive-nav-links app-font-navbar" to="/">
                Sobre
            </router-link>
            <router-link class="responsive-nav-links app-font-navbar" to="/">
                Login
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Navbar',
        props: ["menu_icon", "alt"],
        data() {
            return {
                isModalOpen: false
            }
        },
        methods: {
            openNavbar() {
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
        width: 10%;
        padding-left: 2%;
    }
    .box-nav-links {
        width: 90%;
        display: flex;
        justify-content: flex-end;
    }
    .nav-app-links {
        width: 12%;
        text-align: center;
        align-self: flex-end;
    }
    .nav-app-links:hover {
        border: solid 2px #1ABC9C;
        border-radius: 10px;
        padding: 0.1%;
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
    }
</style>