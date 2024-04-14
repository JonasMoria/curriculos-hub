
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

    function getSideNavItens(obj) {
        return {
          sideNav : obj.querySelector('#sidenav').style,
          title : obj.querySelector('#filter-title').style,
          filters : obj.querySelector('#filters-box-insert').style,
          filtersInpt : obj.querySelector('#filters-inputed').style,
          btnSearch : obj.querySelector('#button-search').style,
        }
    }

    function showSideNav(obj) {
      let item = getSideNavItens(obj);

      item.sideNav.width = '60%';
      item.title.display = 'block';
      item.filters.display = 'block';
      item.filtersInpt.display = 'block';
      item.btnSearch.display = 'block';
    }

    function hideSideNav(obj) {
      let item = getSideNavItens(obj);

      item.sideNav.width = '10%';
      item.title.display = 'none';
      item.filters.display = 'none';
      item.filtersInpt.display = 'none';
      item.btnSearch.display = 'none';
    }

    function convertDataToBrazil(date) {
      if (!date) {
        return '';
      }

      if (date == '0000-00-00') {
        return 'o momento';
      }

      return date.split('-').reverse().join('/');
    }

    function mask(string, mask) {
      let maskared = '';
      let k = 0;
     
      for (let i = 0; i <= mask.length; i++) {
          if (mask[i] == '#') {
              if (string[k]) {
                  maskared += string[k++];
              }
          } else {
              if (mask[i]) {
                  maskared += mask[i];
              }
          }
      }
     
      return maskared;
    }

    function validateEmail(email) {
      let regex = /^[a-z0-9.]+@[a-z]+\.[a-z]{2,3}$/;
      return regex.test(email);
    }

    function validateRegister(register_data) {
      const user_name = register_data.name;
      const user_email = register_data.email;
      const user_pass = register_data.password;
      const repeat_pass = register_data.repeat_pass;

      if (!user_name.trim()) {
        return {
          isValid: false,
          msg_error: 'Nome não pode ser vazio.'
        }
      }

      if (!validateEmail(user_email)) {
        return {
          isValid: false,
          msg_error: 'Email inválido.'
        }
      }

      if (!user_pass.trim() || !repeat_pass.trim()) {
        return {
          isValid: false,
          msg_error: 'Senhas inválidas.'
        }
      }
  
      if (user_pass != repeat_pass) {
        return {
          isValid: false,
          msg_error: 'Senhas divergentes.'
        }
      }

      return {
        isValid: true
      }
    }
  
    return {
        addFiltersToSearch,
        addPlaceHolderSearch,
        convertDataToBrazil,
        mask,
        showSideNav,
        hideSideNav,
        validateRegister,
    }
})();

export default functions;