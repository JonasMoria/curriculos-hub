<template>
    <section class="modal">
        <div class="modal-header">
            <button class="btn-close" @click="$emit('closeModal', 2)">⨉</button>
        </div>
        <div class="modal-body">
            <div class="modal-form">
                <h3>Adicionar Experiência</h3>
            </div>
            <div class="div-error" v-if="msg_error">
                <p>{{ msg_error }}</p>
            </div>
            <div class="modal-form">
                <label><b>Nome da Empresa</b></label>
                <input type="text" v-model="enterpriseName">
            </div>
            <div class="modal-form">
                <label><b>Cargo</b></label>
                <input type="text" v-model="job">
            </div>
            <div class="modal-form">
                <label><b>Atividades / Funções</b></label>
                <textarea rows="3" v-model="jobFunctions"></textarea>
            </div>
            <div class="modal-form">
                <label><b>Início</b></label>
                <input type="date" v-model="jobInit">
            </div>
            <div class="modal-form">
                <label><b>Término</b></label>
                <input type="date" v-model="jobFinish">
            </div>
            <div class="modal-form">
                <button @click="insertExperience()">Adicionar</button>
            </div>
        </div>
    </section>
    <div class="overlay"></div>
</template>

<script>
export default {
    name: 'modalExperience',
    emits: ['closeModal', 'addExperience'],

    data() {
        return {
            msg_error: '',

            enterpriseName: '',
            job: '',
            jobFunctions: '',
            jobInit: '',
            jobFinish: '',
        }
    },

    methods: {
        insertExperience: function () {
            let experience = [];

            let checkForm = this.checkExperience();
            if (checkForm == false) {
                this.msg_error == checkForm;
                return;
            }

            experience[this.enterpriseName.toUpperCase()] = {
                office: this.job,
                init: this.jobInit,
                finish: this.jobFinish,
                activities: this.jobFunctions,
            };

            this.$emit('addExperience', experience);
        },
        checkExperience: function() {
            if (!this.enterpriseName || this.enterpriseName.trim() == '') {
                this.msg_error = 'Preencha o nome da empresa';
                return false;
            }
            if (!this.job || this.job.trim() == '') {
                this.msg_error = 'Preencha o cargo ocupado';
                return false;
            }
            if (!this.jobFunctions || this.jobFunctions.trim() == '') {
                this.msg_error = 'Preencha as atividades realizadas no cargo';
                return false;
            }
            if (!this.jobInit || this.jobInit.trim() == '') {
                this.msg_error = 'Preencha a data de início do trabalho';
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
.modal-body .modal-form select,
.modal-body .modal-form textarea {
    width: 100%;
    color: var(--app-nav-background);
    font-family: system-ui;
    font-size: 14px;
}

.modal-body .modal-form input,
.modal-body .modal-form select,
.modal-body .modal-form textarea {
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