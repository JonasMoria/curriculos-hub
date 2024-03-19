<template>
    <div class="home-content">
        <div class="filter-box">
            <div class="filter-item" v-for="(city, index) in filtersArray.person_cities" :key="index">
                <img src="/icons/close.svg" @click="deleteFilter(filtersArray.person_cities, index)">
                <span> {{ city }} </span>
            </div>
            <div class="filter-item" v-for="(uf, index) in filtersArray.person_uf" :key="index">
                <img src="/icons/close.svg" @click="deleteFilter(filtersArray.person_uf, index)">
                <span> {{ uf }} </span>
            </div>
            <div class="filter-item" v-for="(education, index) in filtersArray.education_acronym" :key="index">
                <img src="/icons/close.svg" @click="deleteFilter(filtersArray.education_acronym, index)">
                <span> {{ education }} </span>
            </div>
            <div class="filter-item" v-for="(gradutation, index) in filtersArray.education_modality" :key="index">
                <img src="/icons/close.svg" @click="deleteFilter(filtersArray.education_modality, index)">
                <span> {{ gradutation }} </span>
            </div>
            <div class="filter-item" v-for="(institution, index) in filtersArray.education_institution" :key="index">
                <img src="/icons/close.svg" @click="deleteFilter(filtersArray.education_institution, index)">
                <span> {{ institution }} </span>
            </div>
            <div class="filter-item" v-for="(status, index) in filtersArray.education_status" :key="index">
                <img src="/icons/close.svg" @click="deleteFilter(filtersArray.education_status, index)">
                <span> {{ status }} </span>
            </div>
            <div class="filter-item" v-for="(enterprise, index) in filtersArray.experience_enterprise" :key="index">
                <img src="/icons/close.svg" @click="deleteFilter(filtersArray.experience_enterprise, index)">
                <span> {{ enterprise }} </span>
            </div>
            <div class="filter-item" v-for="(office, index) in filtersArray.experience_office" :key="index">
                <img src="/icons/close.svg" @click="deleteFilter(filtersArray.experience_office, index)">
                <span> {{ office }} </span>
            </div>
            <div class="filter-item" v-for="(lang, index) in filtersArray.person_langs" :key="index">
                <img src="/icons/close.svg" @click="deleteFilter(filtersArray.person_langs, index)">
                <span> {{ lang }} </span>
            </div>
            <div class="filter-item" v-for="(skill, index) in filtersArray.person_skills" :key="index">
                <img src="/icons/close.svg" @click="deleteFilter(filtersArray.person_skills, index)">
                <span> {{ skill }} </span>
            </div>
        </div>
        <div class="box-search">
            <button @click="search()">Buscar</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Filters',
    props: ['filters'],
    data() {
        return {
            filtersArray: this.filters
        }
    },
    methods: {
        search() {
            console.log(this.filtersArray);
        },
        deleteFilter(array, index) {
            array.splice(index, 1);
        }
    }
}
</script>

<style scoped>
    .page-title {
      text-align: center;
      margin-top: 2%;
      font-family: var(--font-cursive);
      font-size: 2em;
      font-weight: 600;
      color: #192734;
    }

    .filter-box {
        padding: 1%;
        width: 60%;
        display: flex;
        flex-wrap: wrap;
    }

    .filter-item {
        font-size: 0.8em;
        font-family: var(--font-cursive);
        font-weight: 600;
        letter-spacing: 0.8px;
        border: 2px solid var(--app-green-color);
        
        margin: 0.5%;
        width: auto;
        white-space: nowrap;

        color: var(--app-nav-background);
        padding: 0.8%;
        border-radius: 10px;
        cursor: pointer;
    }
    .filter-item:hover {
        transform: scale(1.1);
        transition: 0.2s;
    }
    .filter-item span {
        margin-right: 10px;
        margin-left: 10px;
    }
    .filter-item img {
        vertical-align: middle;
        height: 20px;
        width: 20px;
        filter: invert(30%) sepia(57%) saturate(1078%) hue-rotate(325deg) brightness(107%) contrast(103%);
    }

    .box-search {
        text-align: center;
        margin-top: 2%;
        width: 100%;
    }
    .box-search button {
        background-color: var(--app-nav-background);
        border: none;
        color: var(--text-light);
        border-radius: 10px;
        width: 10%;
        padding: 0.8%;
        font-family: var(--font-cursive);
        font-size: 1em;
        font-weight: 400;
        letter-spacing: 1px;
        cursor: pointer;
        margin-bottom: 2%;
    }

    @media screen and (max-width: 900px) {
        .page-title {
            font-size: 1.5em;
            font-weight: 400;
            margin-top: 5%;
        }
        .filter-box {
            width: 100%;
            margin-left: 0;
        }
        .filter-item {
            font-size: 10px;
            padding: 2%;
        }
        .box-search button {
            width: 70%;
            font-size: 15px;
            margin-top: 3%;
        }
    }
</style>