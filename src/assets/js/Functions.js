
const functions = (() => {
    function addFiltersToSearch(category, filters, search) {
        switch (category) {
            case 'city':
              filters.person_cities.push(search);
                break;
            case 'state':
              filters.person_uf.push(search);
                break;
            case 'course':
              filters.education_acronym.push(search);
                break;
            case 'graduation':
              filters.education_modality.push(search);
                break;
            case 'institution':
              filters.education_institution.push(search);
                break;
            case 'status':
              filters.education_status.push(search);
                break;
            case 'enterprise':
              filters.experience_enterprise.push(search);
                break;
            case 'office':
              filters.experience_office.push(search);
                break;
            case 'lang':
              filters.person_langs.push(search);
                break;
            case 'skill':
              filters.person_skills.push(search);
                break;
        }

        return filters;
    }

    function addPlaceHolderSearch(category) {
        let placeholder = '';

        switch (category) {
            case 'city':
              placeholder = 'exemplo: "Campinas"';
                break;
            case 'state':
              placeholder = 'exemplo: "SP"';
                break;
            case 'course':
              placeholder = 'exemplo: "ADM"';
                break;
            case 'graduation':
              placeholder = 'exemplo: "Bacharel"';
                break;
            case 'institution':
              placeholder = 'exemplo: "USP"';
                break;
            case 'status':
              placeholder = 'exemplo: "Concluído"';
                break;
            case 'enterprise':
              placeholder = 'exemplo: "Google"';
                break;
            case 'office':
              placeholder = 'exemplo: "Supervisor"';
                break;
            case 'lang':
              placeholder = 'exemplo: "Inglês"';
                break;
            case 'skill':
              placeholder = 'exemplo: "Foco"';
                break;
            default:
                placeholder = 'Selecione uma categoria...'
                    break;
          }
        
        return placeholder;
    }

    return {
        addFiltersToSearch,
        addPlaceHolderSearch
    }
})();

export default functions;