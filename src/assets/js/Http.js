/**
 * Responsável por realizar requisições HTTP
 */

const request = (() => {
    const OK = 200;
    const NOT_FOUND = 404;

    const app_url = 'http://localhost:8080';

    var urls = {
        search : 'http://localhost/apicurriculos/api/search',
        getCv: 'http://localhost/apicurriculos/api/view',
    }

    var codes = {
        ok : 200,
        not_found : 404,
        bad_request: 400,
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

    function getUrlParam(param) {
        const params = new URLSearchParams(window.location.search);
        return params.get(param);
    }

    function getPageUrl() {
        return window.location.href;
    }

    return {
        get,
        post,
        del,
        put,
        getPageUrl,
        getUrlParam,

        urls,
        codes,
        app_url
    }
})();

export default request;