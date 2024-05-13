<template>
    <section class="page-title">
        <h1>Meus Currículos</h1>
    </section>
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
                <img src="/icons/edit.svg" class="btn-edit" title="editar">
                <img src="/icons/close.svg" class="btn-delete" title="remover">
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
</template>

<script>
import LoadingEffect from '../LoadingEffect.vue';
import NotFound from '../NotFound.vue';
import ServerProblem from '../ServerProblem.vue';
import Http from '../../assets/js/Http';
import Functions from '../../assets/js/Functions'


export default {
    name: 'MyCurriculums',
    components: { LoadingEffect, NotFound, ServerProblem },
    emits: ['pageNewCv'],

    data() {
        return {
            page_status: 0,
            curriculums: {},
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
        }
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
</style>