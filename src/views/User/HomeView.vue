<template>
    <h1>Bem vindo</h1>
</template>

<script>
    import Functions from '../../assets/js/Functions';
    import Http from '../../assets/js/Http';

    export default {
        name: 'HomeUserView',
        data() {
            return {
                session_cookie: Functions.getSessionCookie('login_cookie'),
            }
        },
        methods: {

        },
        beforeCreate() {
            const session_cookie = Functions.getSessionCookie('login_cookie');
			if (!session_cookie) {
				Http.redirect('/login');
			}
        }
    }
</script>

<style scoped>

</style>