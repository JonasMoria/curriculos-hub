<template>
    <div class="image-error">
        <span>
            <img src="/icons/servererror.svg" alt=""><br>
            <b>Ops!</b> Não foi possível acessar os dados nesse momento, por favor, tente novamente mais tarde.
        </span>
    </div>
</template>

<script>
    export default {
        name: 'ServerProblem'
    }
</script>

<style scoped>
    .image-error {
        margin-top: 10%;
        text-align: center
    }

    .image-error img {
        height: 25vh;
        filter: invert(71%) sepia(11%) saturate(123%) hue-rotate(155deg) brightness(96%) contrast(88%);
    }

    .image-error span {
        font-family: var(--font);
        font-size: 2vh;
        color: #A6ACAF;
    }
</style>