<template>
    <section class="page-content">
        <section class="loading-background" v-if="search_status === 1">
            <LoadingEffect :count="14" />
        </section>
        <section class="default-background" v-if="search_status == 3">
            <NotFound :msg_error="msg_notfound"/>
        </section>
        <section v-if="search_status == 4">
            <ServerProblem />
        </section>
        <section v-if="search_status == 2" class="cv-content glow-effect">
            <div class="div-person-name">
                <h3>{{ curriculum.personal_info.name }}</h3>
            </div>
            <div class="container-cards">
                <div class="card-person-info cv-cards" v-if="curriculum.personal_info">
                    <p v-if="curriculum.personal_info.city">
                        <img src="/icons/person_location.svg"> {{ curriculum.personal_info.city }}, {{ curriculum.personal_info.uf }}
                    </p>
                    <p v-if="curriculum.personal_info.birthdate">
                        <img src="/icons/birthdate.svg"> {{ curriculum.personal_info.birthdate }}
                    </p>
                    <p v-if="curriculum.personal_info.description">
                        <img src="/icons/person-info.svg"> {{ curriculum.personal_info.description }}
                    </p>
                </div>
                <div class="card-person-contacts cv-cards" v-if="curriculum.personal_contact">
                    <p v-if="curriculum.personal_contact.email">
                        <img src="/icons/mail.svg"> {{ curriculum.personal_contact.email }}
                    </p>
                    <div v-if="curriculum.personal_contact.phones">
                        <p class="person-phones">
                            <img src="/icons/phone.svg"> {{ curriculum.personal_contact.phones.principal }}
                        </p>
                        <p class="div-phone-second">
                            <img src="/icons/phone.svg"> {{ curriculum.personal_contact.phones.secondary }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="card-full-div cv-cards" v-if="curriculum.personal_contact.social_networks">
                <a target="_blank" :href="curriculum.personal_contact.social_networks.facebook" v-if="curriculum.personal_contact.social_networks.facebook">
                    <img src="icons/facebook.png" height="30px">
                </a>
                <a target="_blank" :href="curriculum.personal_contact.social_networks.instagram" v-if="curriculum.personal_contact.social_networks.instagram">
                    <img src="icons/instagram.png" height="30px">
                </a>
                <a target="_blank" :href="curriculum.personal_contact.social_networks.linkedIn" v-if="curriculum.personal_contact.social_networks.linkedIn">
                    <img src="icons/linkedin.png" height="35px">
                </a>
                <a target="_blank" :href="curriculum.personal_contact.social_networks.site" v-if="curriculum.personal_contact.social_networks.site">
                    <img src="icons/site.png" height="30px">
                </a>
            </div>
            <div class="person-education cv-cards" v-if="curriculum.personal_education">
                <div class="education-card" v-for="education in curriculum.personal_education" :key="education">
                    <p><img src="/icons/education.svg"> {{ education.course_name }} ({{ education.course_acronym }})</p>
                    <p><img src="/icons/date.svg"> {{ education.init }} até {{ education.finish }}</p>
                    <p><img src="/icons/enterprise.svg"> {{ education.institution }}</p>
                </div>
            </div>
            <div class="person-experience cv-cards" v-if="curriculum.personal_experience">
                <div class="experience-card" v-for="experience in curriculum.personal_experience" :key="experience">
                    <p><img src="/icons/enterprise.svg"> {{ experience.enterprise }}</p>
                    <p><img src="/icons/date.svg"> {{ experience.init }} até {{ experience.finish }}</p>
                    <p><img src="/icons/experience.svg"> {{ experience.office }}</p>
                    <p><img src="/icons/notes.svg"> {{ experience.activities }}</p>
                </div>
            </div>
            <div class="card-full-div cv-cards" v-if="curriculum.personal_languages">
                <p v-for="(lang, index) in curriculum.personal_languages" :key="index" class="items-row">
                    {{ lang }}
                </p>
            </div>
            <div class="card-full-div cv-cards" v-if="curriculum.personal_skills">
                <p v-for="(skill, index) in curriculum.personal_skills" :key="index" class="items-row">
                    {{ skill }}
                </p>
            </div>
        </section>
    </section>
</template>

<script>
    import Http from '../assets/js/Http.js';
    import LoadingEffect from '../components/LoadingEffect.vue';
    import NotFound from '../components/NotFound.vue';
    import ServerProblem from '../components/ServerProblem.vue';

    export default {
        name: 'CurriculumView',
        components: {LoadingEffect, NotFound, ServerProblem},
        data() {
            return {
                curriculum_id : 0,
                search_status: 0,
                msg_notfound: 'Currículo não encontrado.',
                curriculum: [],
            }
        },

        methods: {
            getCurriculum() {
                this.search_status = 1;

                const url = `${Http.urls.getCv}/${this.curriculum_id}`;
                const response = Http.get(url);

                response.then((json) => {
                    if (json.status == Http.codes.ok) {
                        this.search_status = 2;
                        this.curriculum = json.data;
                    }
                    if (json.status == Http.codes.not_found) {
                        this.search_status = 3;
                    }
                    console.log(json.data);
                }).catch((error) => {
                    this.search_status = 4;
                });
            }
        },

        mounted() {
            this.curriculum_id = Http.getUrlParam('cv');
            if (this.curriculum_id) {
                this.getCurriculum();
            } else {
                this.curriculum_id = 3;
            }
        }
    }
</script>

<style scoped>
    .page-content {
        width: 70%;
        margin-left: 15%;
        margin-top: 2%;
    }

    .cv-content {
        width: 100%;
        padding: 2%;
        border-left: 15px solid var(--app-nav-background);
        background-color: var(--app-white-background);
        border-radius: 8px;
    }

    .div-person-name {
        text-align: center;
        margin-bottom: 2%;
        text-transform: uppercase;
        font-family: Arial, Helvetica, sans-serif;
    }

    .container-cards {
        display: flex;
    }

    .cv-cards {
        margin: 2%;
        padding: 1%;
        border-radius: 8px;
        background-color: #D3D3D3;
    }

    .cv-cards:hover {
        transform: scale(1.01);
        cursor: pointer;
    }

    .cv-cards p {
        margin-bottom: 2%;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
    }

    .cv-cards p img {
        vertical-align: middle;
        height: 24px;
        margin-right: 1%;
    }

    .card-person-info,
    .card-person-contacts {
        width: 47%;
    }

    .person-phones {
        display: inline-block;
        width: 50%;
    }

    .card-full-div {
        width: 96%;
    }
    .card-full-div a {
        width: 25%;
        display: inline-block;
        text-align: center;
    }

    .person-education,
    .person-experience {
        width: 96%;
    }

    .experience-card,
    .education-card {
        width: 97%;
        padding-left: 2%;
        margin-bottom: 5%;
        border-left: 10px solid var(--app-green-color);
        border-radius: 6px;
    }

    .items-row {
        display: inline-block;
        margin: 1%;
        text-align: center;
    }
</style>