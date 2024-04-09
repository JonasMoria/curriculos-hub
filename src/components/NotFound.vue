<template>
    <div class="image-error">
        <span>
            <img src="/icons/notfound.svg" alt=""><br>
            <b>Ops!</b> {{ msg_error }}
        </span>
    </div>
</template>

<script>
    export default {
        name: 'NotFound',
        props: ['msg_error'],
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

    @media screen and (max-width:900px) {
        .image-error {
            margin-top: 5%;
            text-align: center;
            margin-left: 10%;
        }

        .image-error img {
            height: 10vh;
        }
    }
</style>