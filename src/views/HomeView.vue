<template>
  <div class="home-content">
    <div class="filters-sidenav glow-effect">
        <div class="filter-title">
          <p>Adicionar Filtros</p> 
        </div>
        <div class="filters-box-insert">
          <select name="select-type-filter" id="select-type-filter" v-model="category" @change="setPlaceHolder()">
            <option class="select-filter-option" value="">Selecionar Categoria</option>
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
        </div>
        <div class="filters-inputed">
          <div class="filter-topic">
              <img src="/icons/person_location.svg">
              <p>Localização</p>
          </div>
          <div class="filters-area">
            <div class="filter-item" v-for="(city, index) in filters.person_cities" :key="index">
              <img src="/icons/close.svg" @click="deleteFilter(filters.person_cities, index)">
              <span> {{ city }} </span>
            </div>
            <div class="filter-item" v-for="(uf, index) in filters.person_uf" :key="index">
                <img src="/icons/close.svg" @click="deleteFilter(filters.person_uf, index)">
                <span> {{ uf }} </span>
            </div>
          </div>
          <div class="filter-topic">
            <img src="/icons/education.svg">
            <p>Educação</p>
          </div>
          <div class="filters-area">
            <div class="filter-item" v-for="(education, index) in filters.education_acronym" :key="index">
                <img src="/icons/close.svg" @click="deleteFilter(filters.education_acronym, index)">
                <span> {{ education }} </span>
            </div>
            <div class="filter-item" v-for="(gradutation, index) in filters.education_modality" :key="index">
                <img src="/icons/close.svg" @click="deleteFilter(filters.education_modality, index)">
                <span> {{ gradutation }} </span>
            </div>
            <div class="filter-item" v-for="(institution, index) in filters.education_institution" :key="index">
                <img src="/icons/close.svg" @click="deleteFilter(filters.education_institution, index)">
                <span> {{ institution }} </span>
            </div>
            <div class="filter-item" v-for="(status, index) in filters.education_status" :key="index">
                <img src="/icons/close.svg" @click="deleteFilter(filters.education_status, index)">
                <span> {{ status }} </span>
            </div>
          </div>
          <div class="filter-topic">
            <img src="/icons/experience.svg">
            <p>Experiência</p>
          </div>
          <div class="filters-area">
            <div class="filter-item" v-for="(enterprise, index) in filters.experience_enterprise" :key="index">
                <img src="/icons/close.svg" @click="deleteFilter(filters.experience_enterprise, index)">
                <span> {{ enterprise }} </span>
            </div>
            <div class="filter-item" v-for="(office, index) in filters.experience_office" :key="index">
                <img src="/icons/close.svg" @click="deleteFilter(filters.experience_office, index)">
                <span> {{ office }} </span>
            </div>
          </div>
          <div class="filter-topic">
            <img src="/icons/notes.svg">
            <p>Outros</p>
          </div>
          <div class="filters-area">
            <div class="filter-item" v-for="(lang, index) in filters.person_langs" :key="index">
                <img src="/icons/close.svg" @click="deleteFilter(filters.person_langs, index)">
                <span> {{ lang }} </span>
            </div>
            <div class="filter-item" v-for="(skill, index) in filters.person_skills" :key="index">
                <img src="/icons/close.svg" @click="deleteFilter(filters.person_skills, index)">
                <span> {{ skill }} </span>
            </div>
          </div>
        </div>
        <div class="button-search" @click="getCurriculums()">
          <img src="/icons/search.svg" alt="">
        </div>
    </div>
    <div class="search-content">
      <SearchResult :json_search="json_search" :search_status="search_status"/>
    </div>
  </div>
</template>

<script>
    import Functions from '../assets/js/Functions.js';
    import SearchResult from '../components/SearchResult.vue';
    import Http from '../assets/js/Http.js';

    export default {
      name: 'HomeView',
      data() {
        return {
          search: null,
          category: '',
          placeholder: '...',
          json_search: [],
          search_status: 0,

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

      components: {
        SearchResult
      },

      methods: {
        setJsonSearch() {
          this.json_search = search();
        },
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
        deleteFilter(array, index) {
          array.splice(index, 1);
        },
        setPlaceHolder() {
            this.placeholder = Functions.addPlaceHolderSearch(this.category);
        },
        clearFilters() {
            this.search = '';
        },
        getCurriculums() {
          this.search_status = 1;

          const response = Http.post(Http.urls.search, this.filters);
          response.then((json) => {
              this.json_search = json;

              switch (json.status) {
                case Http.codes.ok:
                  this.search_status = 2;
                break;
                case Http.codes.not_found:
                case Http.codes.bad_request:
                  this.search_status = 3;
                break;
                case Http.codes.error:
                  this.search_status = 4;
                break
                default:
                  this.search_status = 0;
                break;
              }

          }).catch((error) => {
            this.search_status = 4;
          });
        }
      },
    }
</script>

<style scoped>
  .home-content {
    position: fixed;
    margin-top: 3%;
    width: 100%;
    height: 100%;

    display: flex;
    align-content: flex-start;
  }

  .filters-sidenav {
    width: 17%;
    margin-left: 1%;
    border-radius: 5px 5px 0px 0px;
    background-color: var(--app-white-background);
  }

  .filter-title {
    border-left: 3px solid var(--app-green-color);
    margin-top: 5%;
    height: 2.5%;
  }
  .filter-title p {
    font-family: var(--font);
    font-size: 2vh;
    padding-left: 2%;
    font-weight: 600;
    letter-spacing: 1px;
  }
  .search-content {
    width: 83%;
    padding-left: 4%;
    padding-right: 4%;
    overflow-y: auto;
  }

  .filters-box-insert {
    width: 90%;
    margin-top: 5%;
    margin-left: 5%;
  }

  .filters-box-insert select {
    width: 100%;
    padding: 1.5%;
    border-radius: 5px;
    margin-bottom: 1.5%;
    border: 2px solid var(--app-green-color);
  }

  .filters-box-insert input {
    width: 100%;
    margin-bottom: 2%;
    padding: 1.7%;
    border-radius: 5px 5px 5px 5px;
    border: 2px solid var(--app-green-color);
  }

  .filters-box-insert button {
    width: 100%;
    padding: 1%;
    border-radius: 5px 5px 5px 5px;
    background-color: transparent;
    border: 2px solid var(--app-green-color);
    cursor: pointer;

    color: var(--app-green-color);
    font-size: 100%;
    font-family: var(--font);
  }

  .filters-box-insert button:hover {
    color: var(--app-white-background);
    background-color: var(--app-green-color);
    transition: 0.2s;
  }

  .filters-inputed {
    margin-top: 10%;
  }

  .filter-topic,
  .filters-area {
    display: flex;
    width: 95%;
    margin-left: 5%;
    margin-bottom: 5%;
  }

  .filters-area {
    flex-wrap: wrap;
  }

  .filter-type {
    width: 100%;
    display: flex;
  }

  .filter-item {
    font-size: 0.8em;
    font-family: var(--font);
    font-weight: 600;
    letter-spacing: 0.8px;
    border: 2px solid var(--app-green-color);
    
    margin: 0.5%;
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

  .filter-topic p {
    font-family: var(--font);
    font-size: 1.7vh;
    padding-left: 2%;
    font-weight: 600;
    letter-spacing: 1px;
    vertical-align: baseline;
  }

  .filter-topic img {
    height: 22px;
  }

  .select-filter-option {
    background-color: var(--app-nav-background);
    color: var(--app-white-background);
  }
  .filter-category {
    color: var(--app-green-color);
  }

  .button-search {
    width: 70%;
    margin-left: 15%;
    margin-right: 15%;
    padding: 1%;
    padding-top: 2%;
    border-radius: 10px;
    background-color: var(--app-nav-background);
    text-align: center;
    cursor: pointer;
    position:absolute;
    bottom:15%; 
  }
  .button-search:hover {
    border: 2px solid var(--app-green-color);
  }
  .button-search img {
    filter: invert(74%) sepia(12%) saturate(2334%) hue-rotate(116deg) brightness(87%) contrast(82%);
  }

  @media screen and (max-width: 900px) {
    .filters-sidenav {
      margin-left: 0%;
      width: 100%;
      border-radius: 0px 5px 0px 0px;
    }
    .filter-topic p {
      font-size: 12px;
    }
    .filter-topic img {
      height: 15px;
    }
    .filter-item {
      font-size: 10px;
    }
    .filter-item img {
      height: 15px;
    }

    .button-search {
      width: 90%;
      margin-left: 5%;
      margin-right: 5%;
      bottom: 8%;
    }
  }
</style>
