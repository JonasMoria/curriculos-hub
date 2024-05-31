<template>
    <section class="modal">
        <div class="modal-header">
            <button class="btn-close" @click="$emit('closeModal', 3)">⨉</button>
        </div>
        <div class="modal-body">
            <div class="modal-form">
                <h3>Adicionar Habilidade / Linguagem</h3>
            </div>
            <div class="modal-form">
                <label><b>Tipo</b></label>
                <select id="" v-model="typeHability">
                    <option value="404" selected>Selecione</option>
                    <option value="1">Habilidade</option>
                    <option value="2">Linguagem</option>
                </select>
            </div>
            <div class="div-error" v-if="msg_error">
                <p>{{ msg_error }}</p>
            </div>
            <div class="modal-form">
                <label><b>Nome</b></label>
                <input type="text" v-model="habName">
            </div>
            <div class="modal-form">
                <button @click="insertHab()">Adicionar</button>
            </div>
        </div>
    </section>
    <div class="overlay"></div>
</template>

<script>
export default {
    name: 'modalSkillsLangs',
    emits: ['closeModal', 'addSkills', 'addLangs'],

    data() {
        return {
            msg_error: '',
            habName: '',
            typeHability: 404,
        }
    },

    methods: {
        insertHab: function() {
            let checkForm = this.checkSkill();
            if (checkForm == false) {
                this.msg_error == checkForm;
                return;
            }

            if (this.typeHability == 1) {
                this.$emit('addSkills', this.habName);
            }
            if (this.typeHability == 2) {
                this.$emit('addLangs', this.habName);
            }

        },
        checkSkill: function() {
            if (!this.typeHability || this.typeHability == 404) {
                this.msg_error = 'Selecione o tipo de habilidade';
                return false;
            }
            if (!this.habName || this.habName.trim() == '') {
                this.msg_error = 'Preencha o nome da habilidade';
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