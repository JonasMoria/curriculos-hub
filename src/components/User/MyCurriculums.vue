<template>
    <section class="page-title">
        <h1>Meus Currículos</h1>
    </section>
    <div class="div-alert div-error" v-if="msgError">
        <p><b>Ops!</b> {{ msgError }}</p>
    </div>
    <div class="div-alert div-success" v-if="msgSuccess">
        <p>{{ msgSuccess }}</p>
    </div>
    <section class="loading-background" v-if="page_status === 0">
        <LoadingEffect :count="3" />
    </section>
    <section v-if="page_status === 200">
        <div class="cv-card" v-for="(cv, index) in curriculums" :key="index">
            <div class="cv-info">
                <h4>{{ cv.curriculum_name }}</h4>
                <span>Última atualização: {{ cv.curriculum_last_update }}</span>
            </div>
            <div class="cv-btns">
                <img src="/icons/close.svg" class="btn-delete" title="Remover"
                    @click="manageModal(1, cv.curriculum_id, index)">
            </div>
        </div>
        <button class="btn-new-cv" @click="$emit('pageNewCv')">Novo Currículo</button>
    </section>
    <section v-else-if="page_status === 404">
        <NotFound :msg_error="'Nenhum Currículo encontrado'" />
        <button class="btn-new-cv" @click="$emit('pageNewCv')">Novo Currículo</button>
    </section>
    <section v-else-if="page_status == 500">
        <ServerProblem />
    </section>
    <!-- Modal Confirm Remove Curriculum -->
    <modalConfirm @closeModalConfirm="manageModal" @confirmRemoveCv="removeCv" :modalLabels="modalLabels"
        v-if="modalConfirmRemove" />

</template>

<script>
import LoadingEffect from '../LoadingEffect.vue';
import NotFound from '../NotFound.vue';
import ServerProblem from '../ServerProblem.vue';
import Http from '../../assets/js/Http';
import Functions from '../../assets/js/Functions'
import modalConfirm from '../Modals/modalConfirm.vue';

export default {
    name: 'MyCurriculums',
    components: { LoadingEffect, NotFound, ServerProblem, modalConfirm },
    emits: ['pageNewCv'],

    data() {
        return {
            page_status: 0,
            curriculums: {},
            modalConfirmRemove: false,
            modalLabels: {
                idRemove: null,
                idArray: null,
                title: 'Remover Currículo',
                msg: 'Tem certeza que deseja remover este currículo? Após essa ação não será possível recuperá-lo!'
            },
            msgError: '',
            msgSuccess: '',
        }
    },

    methods: {
        getListCurriculums: function () {
            const tokenAuth = Functions.getSessionCookie('login_cookie');
            const response = Http.get(Http.urls.listUserCvs, tokenAuth);

            response.then((json) => {
                if (json.status == Http.codes.ok) {
                    this.curriculums = json.data;
                    this.page_status = Http.codes.ok;
                    this.curriculums = json.data;
                }
                if (json.status == Http.codes.not_found) {
                    this.page_status = Http.codes.not_found;
                }
                if (json.status == Http.codes.error) {
                    this.page_status == Http.codes.error;
                }
            }).catch((error) => {
                this.page_status == Http.codes.error;
            });
        },

        manageModal: function (action, id, arrayKey) {
            if (action == 1) {
                this.modalLabels.idRemove = id;
                this.modalLabels.idArray = arrayKey;
                this.modalConfirmRemove = true;
            } else {
                this.modalConfirmRemove = false;
                this.modalLabels.idRemove = null;
            }
        },

        removeCv: function (id, arrayKey) {
            this.modalConfirmRemove = false;
            this.modalLabels.idRemove = null;

            const tokenAuth = Functions.getSessionCookie('login_cookie');
            const response = Http.del(Http.urls.deleteCv + id, tokenAuth);
            response.then((json) => {
                if (json.status == Http.codes.ok) {
                    this.msgSuccess = json.message;
                    this.curriculums.splice(arrayKey, 1);
                }
                if (json.status == Http.codes.not_found) {
                    this.msgError = json.message;
                    this.page_status = Http.codes.not_found;
                }
                if (json.status == Http.codes.error) {
                    this.msgError = json.message;
                    this.page_status == Http.codes.error;
                }
            }).catch((error) => {
                this.msgError = 'Não foi possível remover este currículo, tente novamente mais tarde.';
                this.page_status == Http.codes.error;
            });
        },
    },

    created() {
        this.getListCurriculums();
    }
}
</script>

<style scoped>
.page-title {
    width: 100%;
    border-bottom: 1px solid var(--app-nav-background);
}

.page-title h1 {
    font-family: system-ui;
    letter-spacing: 1px;
}

.btn-new-cv {
    background-color: transparent;
    border: 1px solid var(--app-nav-background);
    border-radius: 8px;
    padding: 1%;
    font-family: system-ui;
    font-weight: 600;
    margin-top: 10%;
    width: 70%;
    margin-left: 15%;
    cursor: pointer;
}

.btn-new-cv:hover {
    background-color: var(--app-nav-background);
    color: var(--text-light);
    transition: 0.5s;
}

.cv-card {
    display: flex;
    align-content: space-between;
    background-color: var(--text-light);
    margin-top: 2%;
    padding: 1%;
    border-radius: 6px;
}

.cv-card:hover {
    transform: scale(1.01);
    box-shadow: #D5D8DC 1px 1px 1px 1px;
}

.cv-card .cv-info {
    width: 90%;
}

.cv-card .cv-info h4 {
    font-family: system-ui;
    letter-spacing: 1px;
    color: var(--app-nav-background);
}

.cv-card .cv-info span {
    font-family: system-ui;
    font-size: 12px;
}

.cv-card .cv-btns {
    width: 10%;
    text-align: right;
    padding-top: 0.5%;
}

.cv-card .cv-btns img {
    cursor: pointer;
}

.cv-card .cv-btns .btn-delete {
    margin-left: 8%;
    filter: invert(11%) sepia(94%) saturate(5303%) hue-rotate(336deg) brightness(86%) contrast(105%);
}

.div-alert {
    font-family: system-ui;
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 1px;
    margin: 3% 0%;
    padding: 1%;
    border-radius: 6px;
    width: 60%;
    margin-left: 20%;
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
    .div-alert {
        font-size: 10px;
        width: 96%;
        margin-left: 2%;
    }

    .cv-card .cv-info h4 {
        font-size: 12px;
    }

    .cv-card .cv-info span {
        font-size: 9px;
    }
}
</style>