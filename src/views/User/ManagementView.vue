<template>
    <section class="management-container">
        <MyCurriculums @pageNewCv="changePage(1)" v-if="componentView == 0" />
        <NewCurriculum @pageMyCvs="changePage(0)" v-if="componentView == 1" />
    </section>
</template>

<script>
    import MyCurriculums from '../../components/User/MyCurriculums.vue';
    import NewCurriculum from '../../components/User/NewCurriculum.vue';

    export default {
        name: 'ManagementView',
        components: {NewCurriculum, MyCurriculums},

        data() {
            return {
                componentView: 0
            }
        },

        methods: {
            changePage: function(pageCode) {
                this.componentView = pageCode;
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