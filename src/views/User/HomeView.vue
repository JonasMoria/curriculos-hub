<template>
    <h1>{{ session_cookie }}</h1>
</template>

<script>
    import Functions from '../../assets/js/Functions';

    export default {
        name: 'HomeUserView',
        data() {
            return {
                session_cookie: Functions.getSessionCookie('login_cookie'),
            }
        },
        methods: {

        },
        mounted() {
            const session_cookie = Functions.getSessionCookie('login_cookie');
			if (!session_cookie) {
				Http.redirect('/login');
			}
        }
    }
</script>

<style scoped>

</style>