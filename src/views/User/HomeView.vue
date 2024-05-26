<template>
    <section class="container" v-if="page_status === 0">
        <LoadingEffect :count="3" />
    </section>

    <section class="container" v-if="page_status == 200">
        <div class="page-title">
            <h1>Meu Perfil</h1>
        </div>
        <div class="div-alert div-error" v-if="msgError">
            <p><b>Ops!</b> {{ msgError }}</p>
        </div>
        <div class="div-alert div-success" v-if="msgSuccess">
            <p>{{ msgSuccess }}</p>
        </div>
        <div class="card-perfil">
            <img src="/icons/user.svg" alt="">
            <h4>{{ perfil_data.name }}</h4>
            <button @click="manageModal(1)">Alterar</button>
        </div>
        <div class="card-perfil card-cvs">
            <img src="/icons/cv.svg" alt="">
            <h4>{{ perfil_data.total_cvs }}</h4>
            <button @click="goToCvs()">Visualizar</button>
        </div>
        <div class="card-perfil">
            <img src="/icons/person-info.svg" alt="">
            <h4>{{ perfil_data.email }}</h4>
            <button @click="manageModal(3)">Alterar</button>
        </div>
        <button class="account-remove" @click="manageModal(5)" >Remover Conta</button>
    </section>
    <section class="container" v-if="page_status === 404">
        <NotFound :msg_error="'Não foi possível obter os dados do perfil. Tente novamente mais tarde.'" />
    </section>

    <modalUpdateName @closeModalConfirm="manageModal" @confirmUpdateName="updateName"
        v-if="modal_update_name == true" />
    <modalUpdateLogin @closeModalConfirm="manageModal" @confirmUpdateLogin="updateLogin"
        v-if="modal_update_login == true" />
    <modalConfirm @closeModalConfirm="manageModal" @confirmRemoveCv="deleteAccount" :modalLabels="modal_labels"
        v-if="modal_delete_account" />
</template>

<script>
import Functions from '../../assets/js/Functions';
import Http from '../../assets/js/Http';
import NotFound from '../../components/NotFound.vue';
import LoadingEffect from '../../components/LoadingEffect.vue';
import modalUpdateName from '../../components/Modals/modalUpdateName.vue';
import modalUpdateLogin from '../../components/Modals/modalUpdateLogin.vue';
import modalConfirm from '@/components/Modals/modalConfirm.vue';

export default {
    name: 'HomeUserView',
    components: { NotFound, LoadingEffect, modalUpdateName, modalUpdateLogin, modalConfirm },

    data() {
        return {
            page_status: 0,
            modal_update_name: false,
            modal_update_login: false,
            modal_delete_account: false,
            msgError: '',
            msgSuccess: '',

            perfil_data: {},
            modal_labels: {
                title: 'Deletar Conta',
                msg: 'Tem certeza que deseja deletar sua conta? Não será possível recuperá-la.'
            }
        }
    },
    methods: {
        getPerfil: function () {
            const tokenAuth = Functions.getSessionCookie('login_cookie');
            const response = Http.get(Http.urls.viewPerfil, tokenAuth);

            response.then((json) => {
                if (json.status == Http.codes.ok) {
                    this.page_status = Http.codes.ok;
                    this.perfil_data = json.data;
                } else {
                    this.page_status = Http.codes.not_found;
                }
            }).catch((error) => {
                this.page_status = Http.codes.not_found;
            });
        },

        goToCvs: function () {
            Http.redirect('/user/management');
        },

        manageModal: function (action) {
            switch (action) {
                case 1:
                    this.modal_update_name = true;
                    break;
                case 2:
                    this.modal_update_name = false;
                    break;
                case 3:
                    this.modal_update_login = true;
                    break;
                case 4:
                    this.modal_update_login = false;
                    break;
                case 5:
                    this.modal_delete_account = true;
                    break;
                case 0:
                    this.modal_delete_account = false;
                    break
                default:
                    this.modal_update_name = false;
                    this.modal_update_login = false;
                    this.modal_delete_account = false;
                    break;
            }
        },

        updateLogin: function (login) {
            this.modal_update_login = false;
            const arrayUpdate = {
                user_email: login.new_email,
                user_password: login.new_pass,
            };

            const tokenAuth = Functions.getSessionCookie('login_cookie');
            const response = Http.put(Http.urls.updatePerfil, arrayUpdate, tokenAuth);

            response.then((json) => {
                if (json.status == Http.codes.created) {
                    this.msgSuccess = json.message;
                    if (login.new_email != '') {
                        this.perfil_data.email = login.new_email;
                    }
                } else {
                    this.msgError = json.message;
                }
            }).catch((error) => {
                this.msgError = 'Não foi possível atender a solicitação no momento. Por favor, tente novamente mais tarde.';
            });
        },

        updateName: function (newName) {
            this.modal_update_name = false;
            const arrayUpdate = {
                user_name: newName
            };

            const tokenAuth = Functions.getSessionCookie('login_cookie');
            const response = Http.put(Http.urls.updatePerfil, arrayUpdate, tokenAuth);

            response.then((json) => {
                if (json.status == Http.codes.created) {
                    this.perfil_data.name = newName;
                    this.msgSuccess = json.message;
                } else {
                    this.msgError = json.message;
                }
            }).catch((error) => {
                this.msgError = 'Não foi possível atender a solicitação no momento. Por favor, tente novamente mais tarde.';
            });
        },

        deleteAccount: function() {
            const tokenAuth = Functions.getSessionCookie('login_cookie');
            const response = Http.del(Http.urls.deletePerfil, tokenAuth);

            response.then((json) => {
                if (json.status == Http.codes.created) {
                    Functions.deleteSessionCookie('login_cookie');
                    Http.redirect('/login');
                } else {
                    this.msgError = json.message;
                }
            }).catch((error) => {
                this.msgError = 'Não foi possível atender a solicitação no momento. Por favor, tente novamente mais tarde.';
            });
        }
    },
    created() {
        this.getPerfil();
    }
}
</script>

<style scoped>
.container {
    width: 80%;
    margin-left: 10%;
    padding-top: 2%;
}

.page-title {
    width: 100%;
    border-bottom: 1px solid var(--app-nav-background);
}

.page-title h1 {
    font-family: system-ui;
    letter-spacing: 1px;
}

.card-perfil {
    text-align: center;
    width: 35%;
    display: inline-block;
    margin-top: 5%;

    background-color: var(--app-white-background);
    padding: 1.5%;
    margin: 2%;
    border-radius: 6px;
}

.card-perfil img {
    height: 35px;
    filter: invert(65%) sepia(14%) saturate(6025%) hue-rotate(123deg) brightness(93%) contrast(80%);
}

.card-perfil h4 {
    font-family: system-ui;
    margin-top: 5%;
    letter-spacing: 1px;
}

.card-perfil button {
    margin-top: 10%;
    border-radius: 8px;
    border: 1px solid var(--app-nav-background);
    padding: 1.5%;
    width: 60%;
    background-color: transparent;
    font-family: system-ui;
    font-weight: 600;
    font-size: 12px;
    cursor: pointer;
}

.card-perfil button:hover {
    background-color: var(--app-nav-background);
    color: var(--app-white-background);
}

.account-remove {
    border: 1px solid #C70039;
    color: #C70039;
    border-radius: 6px;
    background-color: transparent;
    padding: 0.5%;
    width: 20%;
    margin-left: 40%;
    margin-top: 5%;
    cursor: pointer
}

.card-cvs {
    width: 18%;
}

.div-alert {
    font-family: system-ui;
    text-align: center;
    font-weight: 600;
    font-size: 12px;
    letter-spacing: 1px;
    margin: 3% 0%;
    padding: 1%;
    border-radius: 6px;
    width: 80%;
    margin-left: 10%;
}

.div-error {
    color: #E74C3C;
    border: 1px solid #E74C3C;
}

.div-success {
    color: #1E8449;
    border: 1px solid #1E8449;
}

@media screen and (max-width: 900px) {
    .card-perfil {
        width: 95%;
        padding-bottom: 6%;
    }

    .page-title {
        font-size: 12px;
    }

    .account-remove {
        width: 80%;
        margin-left: 10%;
        margin-top: 10%;
    }
}
</style>