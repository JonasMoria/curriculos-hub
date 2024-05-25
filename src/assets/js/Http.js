/**
 * Responsável por realizar requisições HTTP
 */

const request = (() => {
    const OK = 200;
    const NOT_FOUND = 404;

    const app_url = 'http://localhost:8080';
    const api_url = 'http://localhost';

    var urls = {
        search: api_url + '/apicurriculos/api/search',
        getCv: api_url + '/apicurriculos/api/view',
        register: api_url + '/apicurriculos/api/register',
        login: api_url + '/apicurriculos/api/login',
        newCv: api_url + '/apicurriculos/curriculum/new',
        listUserCvs: api_url + '/apicurriculos/curriculum/list',
        deleteCv: api_url + '/apicurriculos/curriculum/delete/'
    }

    var codes = {
        ok: 200,
        created: 201,
        not_found: 404,
        bad_request: 400,
        unauthorized: 401,
        error: 500,
    }

    function getRequestHeader(tokenAuth) {
        if (tokenAuth) {
            return {
                "Access-Control-Request-Headers": "Content-Type",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenAuth}`,
            };
        }

        return {
            "Access-Control-Request-Headers": "Content-Type",
            "Content-Type": "application/json",
        }
    }

    async function get(url, tokenAuth = '') {
        const request = await fetch(url, {
            method: 'GET',
            headers: getRequestHeader(tokenAuth),
        });

        const response = request.json();

        return response;
    }

    async function post(url, data, tokenAuth = null) {
        const params = JSON.stringify(data);

        const request = await fetch(url, {
            method: 'POST',
            body: params,
            headers: getRequestHeader(tokenAuth),
        });

        const response = request.json();

        return response;
    }

    async function del(url, tokenAuth) {
        const request = await fetch(url, {
            method: 'DELETE',
            headers: getRequestHeader(tokenAuth),
        });

        const response = request.json();

        return response;
    }

    function put() {

    }

    function getUrlParam() {
        const urlPath = window.location.pathname;
        const urlSplit = urlPath.split('/');

        return urlSplit.at(-1);
    }

    function getPageUrl() {
        return window.location.href;
    }

    function redirect(path) {
        window.location.href = app_url + path;
    }

    return {
        get,
        post,
        del,
        put,
        getPageUrl,
        getUrlParam,
        redirect,

        urls,
        codes,
        app_url
    }
})();

export default request;