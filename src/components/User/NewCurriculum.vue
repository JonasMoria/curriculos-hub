<template>
    <section class="page-title">
        <h1>Novo Currículo</h1>
        <button @click="$emit('pageMyCvs')">Meus Currículos</button>
    </section>
    <section class="new-cv-content glow-effect">
        <div class="error-box" v-if="error_msg">
            <p>Ops! {{ error_msg }}</p>
        </div>
        <div class="success-box" v-if="msg_success">
            <p>{{ msg_success }}</p>
        </div>
        <div class="form-group cv-header">
            <label><b>Nome do currículo</b></label>
            <input type="text" v-model="curriculum.curriculum_name">
        </div>
        <div class="w-100">
            <div class="w-50 card-person-infos">
                <p class="mb-1">
                    <img src="/icons/person-info.svg">
                    <b>Informações Pessoais</b>
                </p>
                <div class="form-group form-inline mb-1">
                    <div class="form-big">
                        <label><b>Nome pessoal <span class="required">*</span></b></label>
                        <input type="text" v-model="curriculum.personal_info.name">
                    </div>
                    <div class="form-small">
                        <label><b>Nascimento <span class="required">*</span></b></label>
                        <input type="date" v-model="curriculum.personal_info.birthdate">
                    </div>
                </div>
                <div class="form-group form-inline mb-1">
                    <div class="form-big">
                        <label><b>Cidade <span class="required">*</span></b></label>
                        <input type="text" v-model="curriculum.personal_info.city">
                    </div>
                    <div class="form-small">
                        <label><b>UF <span class="required">*</span></b></label>
                        <input type="text" v-model="curriculum.personal_info.uf">
                    </div>
                </div>
                <div class="form-group mb-1">
                    <label><b>Descrição</b></label>
                    <textarea rows="4" v-model="curriculum.personal_info.description"></textarea>
                </div>
            </div>
            <div class="w-50 card-person-infos">
                <p class="mb-1">
                    <img src="/icons/phone.svg">
                    <b>Informações de Contato</b>
                </p>
                <div class="form-group mb-1">
                    <label><b>Email <span class="required">*</span></b></label>
                    <input type="text" v-model="curriculum.personal_contact.email">
                </div>
                <div class="form-group form-inline mb-1">
                    <div class="form-medium">
                        <label><b>Contato Principal <span class="required">*</span></b></label>
                        <input type="text" v-model="curriculum.personal_contact.phones.principal">
                    </div>
                    <div class="form-medium">
                        <label><b>Contato Secundário</b></label>
                        <input type="text" v-model="curriculum.personal_contact.phones.secondary">
                    </div>
                </div>
                <div class="form-group form-inline mb-1">
                    <div class="form-medium">
                        <label><b>LindedIn</b></label>
                        <input type="text" v-model="curriculum.personal_contact.social_networks.linkedIn">
                    </div>
                    <div class="form-medium">
                        <label><b>Facebook</b></label>
                        <input type="text" v-model="curriculum.personal_contact.social_networks.facebook">
                    </div>
                </div>
                <div class="form-group form-inline mb-1">
                    <div class="form-medium">
                        <label><b>Instagram</b></label>
                        <input type="text" v-model="curriculum.personal_contact.social_networks.instagram">
                    </div>
                    <div class="form-medium">
                        <label><b>Site Pessoal</b></label>
                        <input type="text" v-model="curriculum.personal_contact.social_networks.site">
                    </div>
                </div>
            </div>
            <div class="w-50 card-person-infos">
                <p class="mb-1">
                    <img src="/icons/education.svg">
                    <b>Educação <button type="btn" class="btn-modal" @click="manageModal(1)">Adicionar</button></b>
                </p>
                <div class="card-dinamic" v-for="(educ, index) in this.curriculum.personal_education" :key="index">
                    <span>{{ educ.course_name }} ({{ index }})</span>
                    <br>
                    <span>{{ educ.institution }} ({{ educ.course_modality }})</span>
                    <br>
                    <span>{{ fixDate(educ.init, educ.status) }} - {{ fixDate(educ.finish, educ.status) }}</span>
                    <br>
                    <span>{{ getLabelEducStatus(educ.status) }}</span>
                    <br>
                    <button @click="removeEducation(index)">remover</button>
                </div>
            </div>
            <div class="w-50 card-person-infos">
                <p class="mb-1">
                    <img src="/icons/experience.svg">
                    <b>Expeciência <button type="btn" class="btn-modal" @click="manageModal(2)">Adicionar</button></b>
                </p>
                <div class="card-dinamic" v-for="(exp, index) in this.curriculum.personal_experience" :key="index">
                    <span>{{ index }}</span>
                    <br>
                    <span>{{ exp.office }}</span>
                    <br>
                    <span>{{ fixDate(exp.init, 1) }} - {{ fixDate(exp.finish, 1) }}</span>
                    <br>
                    <span>{{ exp.activities }}</span>
                    <br>
                    <button @click="removeExperience(index)">remover</button>
                </div>
            </div>
            <div class="w-50 card-person-infos">
                <p class="mb-1">
                    <img src="/icons/notes.svg">
                    <b>Linguagens / Habilidades <button type="btn" class="btn-modal"
                            @click="manageModal(3)">Adicionar</button></b>
                </p>
                <div class="card-dinamic" v-for="lang in this.curriculum.personal_languages" :key="lang">
                    <div class="card-unidimension">
                        <button @click="removeLang(lang)"> X </button>
                        <span>{{ lang }}</span>
                    </div>
                </div>
                <div class="card-dinamic" v-for="skill in this.curriculum.personal_skills" :key="skill">
                    <div class="card-unidimension">
                        <button @click="removeSkill(skill)"> X </button>
                        <span>{{ skill }}</span>
                    </div>
                </div>
            </div>
            <div class="w-100 btn-new-cv">
                <button type="button" id="btn-send" @click="register()">Cadastrar</button>
            </div>
        </div>
    </section>
    <!-- Modal Add Educations -->
    <ModalEducationVue @closeModal="manageModal" @addEducation="newEducation" v-if="showModalEducation" />
    <!-- Modal Add Experience -->
    <ModalExperienceVue @closeModal="manageModal" @addExperience="newExperience" v-if="showModalExperience" />
    <!-- Modal Add Lang / Skill -->
    <ModalSkillsLangs @closeModal="manageModal" @addLangs="newLang" @addSkills="newSkill" v-if="showModalSkillsLangs" />
</template>

<script>
import Functions from '../../assets/js/Functions';
import Http from '../../assets/js/Http';
import ModalEducationVue from '../Modals/modalEducation.vue';
import ModalExperienceVue from '../Modals/modalExperience.vue';
import ModalSkillsLangs from '../Modals/modalSkillsLangs.vue';

export default {
    name: 'NewCurriculum',
    components: { ModalEducationVue, ModalExperienceVue, ModalSkillsLangs },
    emits: ['pageMyCvs'],

    data() {
        return {
            showModalEducation: false,
            showModalExperience: false,
            showModalSkillsLangs: false,
            error_msg: '',
            msg_success: '',

            curriculum: {
                curriculum_name: '',
                personal_info: {
                    name: '',
                    city: '',
                    uf: '',
                    birthdate: '',
                    description: '',
                },
                personal_contact: {
                    email: '',
                    phones: {
                        principal: '',
                        secondary: ''
                    },
                    social_networks: {
                        linkedIn: '',
                        facebook: '',
                        instagram: '',
                        site: ''
                    }
                },
                personal_education: {},
                personal_experience: {},
                personal_skills: [],
                personal_languages: [],
            }
        }
    },
    methods: {
        newEducation: function(education) {
            Object.assign(this.curriculum.personal_education, education);
            this.showModalEducation = false;
        },
        removeEducation: function(index) {
            delete this.curriculum.personal_education[index];
        },
        newExperience: function(experience) {
            Object.assign(this.curriculum.personal_experience, experience);
            this.showModalExperience = false;
        },
        removeExperience: function(index) {
            delete this.curriculum.personal_experience[index];
        },
        newLang: function(lang) {
            this.curriculum.personal_languages.push(lang);
            this.showModalSkillsLangs = false;
        },
        removeLang: function(element) {
            const idx = this.curriculum.personal_languages.indexOf(element);
            if (idx >= 0) {
                this.curriculum.personal_languages.splice(element, 1);
            }
        },
        newSkill: function(skill) {
            this.curriculum.personal_skills.push(skill);
            this.showModalSkillsLangs = false;
        },
        removeSkill: function(element) {
            const idx = this.curriculum.personal_skills.indexOf(element);
            if (idx >= 0) {
                this.curriculum.personal_skills.splice(element, 1);
            }
        },
        fixDate: function(date, status) {
            if (date == '' && status == 0) {
                return 'trancado';
            }
            if (date == '' && status == 1) {
                return 'atualmente';
            }

            return Functions.convertDataToBrazil(date);
        },
        getLabelEducStatus: function(status) {
            switch (status) {
                case 0:
                    return 'incompleto';
                case 1:
                    return 'em andamento';
                case 2:
                    return 'concluído';
                default:
                    return '';
            }
        },
        manageModal: function(typeModal) {
            switch (typeModal) {
                case 1:
                    this.showModalEducation = !this.showModalEducation;
                    break;
                case 2:
                    this.showModalExperience = !this.showModalExperience;
                    break;
                case 3:
                    this.showModalSkillsLangs = !this.showModalSkillsLangs;
                    break;
                default:
                    break;
            }
        },
        register: function() {
            const api_url = Http.urls.newCv;
            const tokenAuth = Functions.getSessionCookie('login_cookie');
            this.showLoadingButton('btn-send');

            const response = Http.post(api_url, this.curriculum, tokenAuth);
            response.then((json) => {
                this.showLoadingButton('btn-send', 'Cadastrar');

                if (json.status == Http.codes.bad_request) {
                    this.error_msg = json.message;
                    this.msg_success = '';
                }
                if (json.status == Http.codes.created) {
                    this.msg_success = json.message;
                    this.error_msg = '';
                }
            }).catch((error) => {
                this.showLoadingButton('btn-send', 'Cadastrar');
                this.error_msg = 'Não foi possível cadastrar seu currículo agora, por favor, tente novamente mais tarde';
            });

        },
        maskPhones: function(type) {
            if (type == 1) {
                this.curriculum.personal_contact.phones.principal = Functions.mask(this.curriculum.personal_contact.phones.principal, '+## (##) #########');
                return;
            }

            this.curriculum.personal_contact.phones.secondary = Functions.mask(this.curriculum.personal_contact.phones.secondary, '+## (##) #########');
            return;
        },
        showLoadingButton: function(btnId, btnHtml = '') {
            let btn = document.getElementById(btnId);
            if (btnHtml) {
                btn.innerHTML = `${btnHtml}`;
                return;
            }
            btn.innerHTML = `<div class="loader" style="margin-left: 40%"></div>`;
            return;
        },
    }
}
</script>

<style scoped>
.page-title {
    width: 100%;
    border-bottom: 1px solid var(--app-nav-background);
    margin: 2% 0%;
}
.page-title h1 {
    font-family: system-ui;
    letter-spacing: 1px;
    display: inline-block;
}
.page-title button {
    float: right;
    background-color: transparent;
    border: none;
    font-family: system-ui;
    font-weight: 600;
    cursor: pointer;
}

.new-cv-content {
    background-color: var(--app-white-background);
    padding: 1%;
    width: 100%;
}

.required {
    color: #E74C3C;
}

.cv-header {
    width: 50%;
    margin-left: 25%;
    text-align: center;
}

.cv-header input {
    text-align: center;
}

.form-group label {
    color: var(--app-nav-background);
    font-family: system-ui;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 1px;
    width: 100%;
}

.form-group input,
.form-group textarea {
    width: 100%;
    background-color: transparent;
    border: none;
    border: 1px solid var(--app-nav-background);
    border-radius: 6px;
    padding: 0.5%;
    color: var(--app-nav-background);
    font-family: system-ui;
}

.form-group textarea {
    border: 1px solid var(--app-nav-background);
    border-radius: 6px;
}

.form-inline {
    display: flex;
    width: 100%;
}

.form-inline .form-big {
    display: inline-block;
    width: 80%;
}

.form-inline .form-small {
    display: inline-block;
    width: 15%;
    margin-left: 5%;
}

.form-inline .form-small input {
    padding: 2.7%;
}

.form-inline .form-medium {
    width: 50%;
}

.form-inline .form-medium input {
    width: 99%;
}

.card-person-infos {
    width: 100%;
    vertical-align: text-top
}

.card-person-infos img {
    filter: invert(59%) sepia(83%) saturate(388%) hue-rotate(118deg) brightness(85%) contrast(98%);
    vertical-align: text-bottom;
    margin-right: 1%;
    height: 20px;
}

.card-person-infos p {
    color: var(--app-green-color);
    font-family: system-ui;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 1px;
}

.btn-new-cv {
    margin-top: 8%;
    text-align: center;
}

.btn-new-cv button {
    padding: 0.7%;
    width: 20%;
    border: none;
    border-radius: 6px;
    background-color: var(--app-nav-background);
    color: var(--app-green-color);
    font-family: system-ui;
    font-size: 14px;
    letter-spacing: 1px;
    cursor: pointer;
}

.btn-modal {
    background-color: transparent;
    border: none;
    border-radius: 10px;
    color: var(--app-nav-background);
    font-size: 12px;
    padding: 0.8%;
    margin-left: 3%;
    font-family: system-ui;
    letter-spacing: 1px;
    cursor: pointer;
}

.btn-modal:hover {
    background-color: var(--app-nav-background);
    color: var(--app-white-background);
}

.card-dinamic {
    border: 1px solid var(--app-nav-background);
    padding: 1%;
    border-radius: 6px;
    max-width: 100%;
    display: inline-block;
    margin-right: 2%;
}

.card-dinamic span {
    font-size: 14px;
    font-family: system-ui;
}

.card-dinamic button {
    width: 100%;
    margin-top: 2%;
    border: none;
    background-color: transparent;
    color: #E74C3C;
    font-weight: 700;
    cursor: pointer
}


.card-unidimension {
    display: flex;
    width: 100%;
    align-content: flex-end;
}

.card-unidimension button {
    margin-right: 10px;
}

.error-box,
.success-box {
    width: 50%;
    margin-left: 25%;
    margin-bottom: 5%;
    padding: 1%;
    border-radius: 8px;
    text-align: center;
    color: #fff;
    font-family: system-ui;
    font-weight: 600;
    letter-spacing: 1px;
    font-size: 14px;
}

.error-box {
    border: 1px solid #E74C3C;
    background-color: #E74C3C;
}

.success-box {
    border: 1px solid var(--app-green-color);
    background-color: var(--app-green-color);
}

.w-30 {
    width: 30%;
}

.w-50 {
    width: 50%;
    display: inline-block;
    padding: 1%;
}

.w-100 {
    width: 100%;
    margin-top: 2%;
}

.mb-1 {
    margin-bottom: 1.5%;
}

@media screen and (max-width: 900px) {
    .cv-header {
        width: 96%;
        margin-left: 2%;
    }

    .form-group label {
        font-size: 10px;
    }

    .form-group input,
    .form-group textarea {
        padding: 0.2%;
    }

    .form-inline .form-medium {
        width: 100%;
    }

    .card-person-infos img {
        height: 12px;
    }

    .card-person-infos p {
        font-size: 9px;
    }

    .form-inline .form-small {
        width: 100%;
        margin: 0%;
    }

    .form-inline .form-big {
        width: 100%;
    }

    .form-inline .form-small input {
        padding: 0%;
    }

    .btn-new-cv button {
        width: 50%;
        padding: 1%;
        font-size: 10px;
    }

    .btn-modal {
        font-size: 8px;
    }

    .w-50 {
        width: 98%;
    }

    .mb-1 {
        margin-bottom: 0%;
    }

    .form-inline {
        display: initial;
    }

    .card-dinamic span,
    .card-dinamic button {
        font-size: 10px;
        margin-top: 1%
    }

    .error-box,
    .success-box {
        width: 98%;
        margin-left: 2%;
        font-size: 8px;
    }
}
</style>