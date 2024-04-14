/**
 * Responsável por realizar requisições HTTP
 */

const request = (() => {
    const OK = 200;
    const NOT_FOUND = 404;

    const app_url = 'http://localhost:8080';

    var urls = {
        search: 'http://localhost/apicurriculos/api/search',
        getCv: 'http://localhost/apicurriculos/api/view',
        register: 'http://localhost/apicurriculos/api/register',
        login: 'http://localhost/apicurriculos/api/login',
    }

    var codes = {
        ok : 200,
        created: 201,
        not_found : 404,
        bad_request: 400,
        unauthorized: 401,
        error: 500,
    }

    async function get(url) {
        const request = await fetch(url, {
            method: 'GET',
            headers: {
                "Access-Control-Request-Headers": "Content-Type",
                "Content-Type": "application/json",
            },
        });

        const response = request.json();

        return response;
    }

    async function post(url, data) {
        const params = JSON.stringify(data);

        const request = await fetch(url, {
            method: 'POST',
            body: params,
            headers: {
                "Access-Control-Request-Headers": "Content-Type",
                "Content-Type": "application/json",
            },
        });

        const response = request.json();
        
        return response;
    }

    function del() {

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