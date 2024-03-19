<template>
  <div class="home-content">
      <div class="page-title">
          <h6>Buscar Currículos</h6>
      </div>
      <div class="search-filters">
          <select name="select-type-filter" id="select-type-filter" v-model="category" @change="setPlaceHolder()">
            <option class="select-filter-option" value="">Categoria</option>
            <option class="select-filter-option select-space" v-bind:disabled="true"></option>
            <option class="select-filter-option filter-category" value="" v-bind:disabled="true">Localização:</option>
            <option class="select-filter-option" id="opt-city" value="city">Cidade</option>
            <option class="select-filter-option" id="opt-state" value="state">UF</option>
            <option class="select-filter-option select-space" v-bind:disabled="true"></option>
            <option class="select-filter-option filter-category" value="" v-bind:disabled="true">Educação:</option>
            <option class="select-filter-option" id="course" value="course">Curso</option>
            <option class="select-filter-option" id="graduation" value="graduation">Nível Graduação</option>
            <option class="select-filter-option" id="institution" value="institution">Instituição</option>
            <option class="select-filter-option" id="status" value="status">Status</option>
            <option class="select-filter-option select-space" v-bind:disabled="true"></option>
            <option class="select-filter-option filter-category" value="" v-bind:disabled="true">Experiência:</option>
            <option class="select-filter-option" id="enterprise" value="enterprise">Empresa</option>
            <option class="select-filter-option" id="office" value="office">Cargo</option>
            <option class="select-filter-option select-space" v-bind:disabled="true"></option>
            <option class="select-filter-option filter-category" value="" v-bind:disabled="true">Outros:</option>
            <option class="select-filter-option" id="lang" value="lang">Linguagem</option>
            <option class="select-filter-option" id="skill" value="skill">Habilidade</option>
          </select>
          <input type="text" v-model="search" :placeholder="placeholder" id="inpt-search-filters">
          <button type="button" id="btn-search-filters" @click="addFilter()">Adicionar</button>
          <FiltersVue :filters="filters" />
      </div>
  </div>
</template>

<script>
import FiltersVue from '../components/Filters.vue';
import Functions from '../assets/js/Functions.js';

export default {
  name: 'HomeView',
  data() {
    return {
      search: null,
      category: '',
      placeholder: 'Selecione uma categoria...',

      filters: {
        person_cities : [],
        person_uf : [],
        education_acronym: [],
        education_modality : [],
        education_institution  : [],
        education_status : [],
        experience_enterprise : [],
        experience_office : [],
        person_langs : [],
        person_skills : [],
      },
    }
  },
  methods: {
    addFilter() {
      if (this.search == '') {
        return;
      }
      if (this.search && (this.search.trim()) == '') {
        return;
      }
  
      this.filters = Functions.addFiltersToSearch(this.category, this.filters, this.search);
      this.clearFilters();
    },
    setPlaceHolder() {
        this.placeholder = Functions.addPlaceHolderSearch(this.category);
    },
    clearFilters() {
        this.search = '';
    }
  },
  components: {
    FiltersVue
  }
}
</script>

<style scoped>
    .home-content {
      width: 90%;
      margin-left: 5%;
    }
    .page-title {
      text-align: center;
      margin-top: 4%;
      font-family: var(--font-cursive);
      font-size: 2em;
      font-weight: 600;
      color: #192734;
    }

    .search-filters {
      text-align: center;
      margin-top: 2%;
      margin-left: 15%;
      width: 70%;
      background-color: var(--text-light);
      border-radius: 10px;
      box-shadow: #D7DBDD  2px 2px 2px 2px;
    }

    .search-filters #select-type-filter,
    .search-filters #inpt-search-filters,
    .search-filters #btn-search-filters {
        height: 35px;
        font-family: var(--font-cursive);
    }

    .search-filters #select-type-filter {
      width: 10%;
      margin-top: 2%;
      margin-bottom: 2%;
      border: 2px solid var(--app-green-color);
      border-radius: 10px 0px 0px 10px;
      cursor: pointer;
    }

    .search-filters #inpt-search-filters {
      width: 30%;
      border: 2px solid var(--app-green-color);
      border-left: none;
      border-right: none;
    }
    .search-filters #btn-search-filters {
      width: 7%;
      cursor: pointer;
      border-radius: 0px 10px 10px 0px;
      border: 2px solid var(--app-green-color);
      border-left: none;
      background-color: var(--app-green-color);
      color: var(--text-light);
    }

    .select-filter-option {
      background-color: var(--app-nav-background);
      color: var(--text-light);
      font-size: 1em;
    }

    .filter-category {
      color: var(--app-green-color);
      
    }

    @media screen and (max-width: 900px) {
      .home-content {
        width: 100%;
        margin-left: 0px;
      }
      .page-title {
        font-size: 1.5em;
        font-weight: 400;
      }

      .search-filters {
        margin-left: 1%;
        width: 98%;
      }

      .search-filters #select-type-filter {
        width: 25%;
        height: 30px;
      }
      .search-filters #inpt-search-filters {
        width: 53%;
        height: 30px;
      }
      .search-filters #btn-search-filters {
        width: 20%;
        height: 30px;
      }
      .select-filter-option {
        font-size: 10px;
      }

      .select-space {
        display: none;
      }
    }
</style>
