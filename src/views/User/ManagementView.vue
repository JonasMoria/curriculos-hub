<template>
    <section class="management-container">
        <NewCurriculum v-if="componentView == 1" />
    </section>
</template>

<script>
    import NewCurriculum from '../../components/User/NewCurriculum.vue';

    export default {
        name: 'ManagementView',
        components: {NewCurriculum},

        data() {
            return {
                componentView: 1
            }
        }
    }
</script>


<style scoped>
    .management-container {
        width: 80%;
        margin-left: 10%;
        padding-top: 2%;
    }
</style>