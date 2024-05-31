<template>
    <section class="modal">
        <div class="modal-header">
            <button class="btn-close" @click="$emit('closeModal', 1)">⨉</button>
        </div>
        <div class="modal-body">
            <div class="modal-form">
                <h3>Adicionar Graduação / Curso</h3>
            </div>
            <div class="div-error" v-if="msg_error">
                <p>{{ msg_error }}</p>
            </div>
            <div class="modal-form">
                <label><b>Sigla do Curso</b></label>
                <input type="text" v-model="acronym">
            </div>
            <div class="modal-form">
                <label><b>Nome do Curso</b></label>
                <input type="text" v-model="nameCourse">
            </div>
            <div class="modal-form">
                <label><b>Instituição</b></label>
                <input type="text" v-model="courseInstitution">
            </div>
            <div class="modal-form">
                <label><b>Modalidade</b></label>
                <input type="text" v-model="modality">
            </div>
            <div class="modal-form">
                <label><b>Situação</b></label>
                <select id="" v-model="courseStatus">
                    <option value="404" selected>Selecione</option>
                    <option value="0">Trancado</option>
                    <option value="1">Em Andamento</option>
                    <option value="2">Concluído</option>
                </select>
            </div>
            <div class="modal-form">
                <label><b>Início</b></label>
                <input type="date" v-model="courseInit">
            </div>
            <div class="modal-form">
                <label><b>Término</b></label>
                <input type="date" v-model="courseFinish">
            </div>
            <div class="modal-form">
                <button @click="insertEducation()">Adicionar</button>
            </div>
        </div>
    </section>
    <div class="overlay"></div>
</template>

<script>
export default {
    name: 'modalEducation',
    emits: ['closeModal', 'addEducation'],

    data() {
        return {
            msg_error: '',

            acronym: '',
            nameCourse: '',
            courseInstitution: '',
            modality: '',
            courseStatus: 404,
            courseInit: '',
            courseFinish: '',
        }
    },

    methods: {
        insertEducation: function () {
            let education = [];

            let checkForm = this.checkEducation();
            if (checkForm == false) {
                this.msg_error == checkForm;
                return;
            }

            education[this.acronym.toUpperCase()] = {
                course_name: this.nameCourse,
                course_modality: this.modality,
                institution: this.courseInstitution,
                status: this.courseStatus,
                init: this.courseInit,
                finish: this.courseFinish,
            };

            this.$emit('addEducation', education);
        },
        checkEducation: function() {
            if (!this.acronym || this.acronym.trim() == '') {
                this.msg_error = 'Preencha a sigla do curso (ex: ADM)';
                return false;
            }
            if (!this.nameCourse || this.nameCourse.trim() == '') {
                this.msg_error = 'Preencha o nome do curso (ex: Adminstração)';
                return false;
            }
            if (!this.modality || this.modality.trim() == '') {
                this.msg_error = 'Preencha a modalidade do curso (ex: EAD)';
                return false;
            }
            if (!this.courseInstitution || this.courseInstitution.trim() == '') {
                this.msg_error = 'Preencha o nome da instituição (ex: USP)';
                return false;
            }
            if (!this.courseStatus || this.courseStatus == 404) {
                this.msg_error = 'Selecione o status atual do curso';
                return false;
            }
            if (!this.courseInit || this.courseInit.trim() == '') {
                this.msg_error = 'Preencha a data de início do curso';
                return false;
            }
            if (this.courseStatus == 2 && !this.courseFinish) {
                this.msg_error = 'Preencha a data de conclusão do curso';
                return false;
            }

            this.msg_error = '';
            return true;
        }
    }
}
</script>

<style scoped>
.modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.4rem;
    width: 30%;
    margin-left: 25%;
    padding: 1rem;
    position: absolute;
    z-index: 2;
    top: 10%;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 15px;
}

button {
    cursor: pointer;
    border: none;
    font-weight: 600;
}

.btn-close {
    float: right;
    padding: 0.5rem 0.7rem;
    background: #eee;
    border-radius: 50%;
}

.modal-body {
    width: 100%;
}

.modal-body .modal-form h3 {
    text-align: center;
    font-family: system-ui;
    margin-bottom: 5%;
    color: var(--app-nav-background);
    border-left: 5px solid var(--app-green-color);
}

.modal-body .modal-form {
    margin-bottom: 3%;
}

.modal-body .modal-form label,
.modal-body .modal-form input,
.modal-body .modal-form select {
    width: 100%;
    color: var(--app-nav-background);
    font-family: system-ui;
    font-size: 14px;
}

.modal-body .modal-form input,
.modal-body .modal-form select {
    padding: 0.8%;
    border-radius: 6px;
    border: 1px solid var(--app-nav-background);
}

.modal-body .modal-form button {
    margin-top: 5%;
    padding: 2%;
    border-radius: 8px;
    background-color: var(--app-nav-background);
    color: var(--text-light);
    width: 40%;
    margin-left: 30%;
}

.overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
    z-index: 1;
}

.div-error {
    color: #E74C3C;
    font-family: system-ui;
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 1px;
    margin-bottom: 3%;
}

@media screen and (max-width: 900px) {
    .modal {
        width: 80%;
        margin: 0%;
    }

    .modal-body .modal-form h3 {
        font-size: 16px;
    }

    .modal-body .modal-form label,
    .modal-body .modal-form input,
    .modal-body .modal-form select {
        font-size: 12px;
    }
}
</style>