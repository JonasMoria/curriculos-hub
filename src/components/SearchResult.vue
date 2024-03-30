<template>
    <div class="content">
        <section class="default-background" v-if="search_status === 0">
            <div class="image-support">
                <span>
                    <img src="/icons/search.svg" alt=""><br>
                    <b>Adicione filtros</b> baseados em categorias e busque por diversos currículos <br> cadastrados em nossa base de dados!
                </span>
            </div>
        </section>
        <section class="loading-background" v-if="search_status === 1">
            <LoadingEffect :count="12" />
        </section>
        <section class="search-view" v-if="search_status == 2">
            <div class="cv-card glow-effect" v-for="(cv, index) in json_search.data" :key="index">
               <div class="cv-card-info">
                    <img src="/icons/cv.svg" alt="">
                    <p>{{ cv.curriculum_name }}</p>
               </div>
               <div class="line-sep"></div>
               <div class="cv-card-info">
                    <img src="/icons/user.svg" alt="">
                    <p>{{ cv.person_name }}</p>
               </div>
               <div class="cv-card-info">
                    <img src="/icons/phone.svg" alt="">
                    <p>{{ cv.person_phone_principal }}</p>
               </div>
               <div class="cv-card-info">
                    <img src="/icons/mail.svg" alt="">
                    <p>{{ cv.person_email }}</p>
               </div>
               <div class="button-view-cv" @click="viewCv(cv.curriculum_id)">
                    <p>Visualizar</p>
               </div>
            </div>
        </section>
        <section class="default-background" v-if="search_status == 3">
            <NotFound />
        </section>
        <section v-if="search_status == 4">
            <ServerProblem />
        </section>
    </div>
</template>

<script>
    import LoadingEffect from '../components/LoadingEffect.vue';
    import NotFound from '../components/NotFound.vue';
    import ServerProblem from '../components/ServerProblem.vue';

    export default {
        name: 'SearchResult',
        props: ['json_search', 'search_status'],
        components: {LoadingEffect, NotFound, ServerProblem},

        data() {
            return {
            }
        },

        methods: {
            viewCv(id) {
                alert(id);
            }
        }
    }
</script>

<style scoped>
    .default-background {
        width: 100%;
    }
    .image-support {
        margin-top: 10%;
        text-align: center
    }

    .image-support img {
        height: 30vh;
        filter: invert(71%) sepia(11%) saturate(123%) hue-rotate(155deg) brightness(96%) contrast(88%);
    }

    .image-support span {
        font-family: var(--font);
        font-size: 2vh;
        color: #A6ACAF;
    }
    .loading-background,
    .search-view {
        width: 100%;
    }

    .cv-card {
        background-color: #FBFCFC;
        border-radius: 10px;
        width: 20%;
        display: inline-block;
        margin: 0.3%;
    }

    .line-sep {
        background-color: var(--app-green-color);
        width: 80%;
        padding: 0.4%;
        margin-bottom: 4%;
        margin-top: 3%;
        border-radius: 10px;
    }
    .cv-card-info {
        margin-left: 4%;
        margin-top: 9%;
    }
    .cv-card-info img {
        display: inline-block;
        width: 10%;
        height: 20px;
        vertical-align: top;
        filter: invert(15%) sepia(11%) saturate(1766%) hue-rotate(168deg) brightness(94%) contrast(90%);
    }
    .cv-card-info p {
        display: inline-block;
        width: 90%;
        height: 100%;
        padding-left: 4%;
        font-size: 2.1;
        font-family: var(--font);
        color: #616A6B;
    }
    .button-view-cv {
        background-color: var(--app-nav-background);
        margin-top: 10%;
        padding: 3%;
        border-radius: 0px 0px 10px 10px;
        text-align: center;
        color: var(--text-light);
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: 13px;
        letter-spacing: 1px;
        cursor:pointer
    }

    .button-view-cv:hover {
        background-color: var(--app-green-color);
        transition: 0.2s;
    }

    @media screen and (max-width: 900px) {
        .content {
            margin-left: 15%;
            width: 90%;
        }
        .cv-card {
            width: 45%;
            margin: 2%;
            margin-bottom: 6%;
            font-size: 14px;

        }
        .image-support {
            margin-top: 5%;
            text-align: center;
            margin-left: 10%;
        }

        .image-support img {
            height: 10vh;
        }
    }
</style>