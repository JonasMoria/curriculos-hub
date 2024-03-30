/**
 * Responsável por realizar requisições HTTP
 */

const request = (() => {
    const OK = 200;
    const NOT_FOUND = 404;

    var urls = {
        search : 'http://localhost/apicurriculos/api/search'
    }

    var codes = {
        ok : 200,
        not_found : 404,
        bad_request: 400,
        error: 500,
    }

    function get(url) {

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

    return {
        get,
        post,
        del,
        put,
        urls,
        codes,
    }
})();

export default request;