<template>
    <section class="modal">
        <div class="modal-header">
            <button class="btn-close" @click="$emit('closeModalConfirm', 2)">⨉</button>
        </div>
        <div class="modal-body">
            <div class="modal-form">
                <h3>Alterar Nome</h3>
            </div>
            <div class="modal-form">
                <label><b>Novo Nome</b></label>
                <input type="text" v-model="new_name">
            </div>
            <div class="modal-form">
                <button @click="$emit('closeModalConfirm', 2)" class="btn-cancel">Cancelar</button>
                <button @click="$emit('confirmUpdateName', new_name)" class="btn-confirm">Atualizar</button>
            </div>
        </div>
    </section>
    <div class="overlay"></div>
</template>

<script>
export default {
    name: "modalUpdateName",
    emits: ['closeModalConfirm', 'confirmUpdateName'],

    data() {
        return {
            new_name: ''
        }
    }
}
</script>

<style>
.modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.4rem;
    width: 50%;
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

.modal-body .modal-form label {
    width: 100%;
    color: var(--app-nav-background);
    font-family: system-ui;
    font-size: 14px;
}

.modal-body .modal-form button {
    margin-top: 5%;
    padding: 2%;
    border-radius: 8px;
    width: 35%;
    display: inline-block;
}

.modal-body .modal-form .btn-cancel {
    border: 1px solid #CB4335;
    background-color: transparent;
    color: #CB4335;
    margin-right: 2%;
    font-size: 10px;
}

.modal-body .modal-form .btn-confirm {
    border: 1px solid #1E8449;
    background-color: transparent;
    color: #1E8449;
    font-size: 10px;
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

@media screen and (max-width: 900px) {
    .modal {
        width: 80%;
        margin-left: 10%;
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