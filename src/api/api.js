import Swagger from 'swagger-client'

/**
 * Helper functions for communicating with the API
 */

const BASE_URL = 'https://frontend-test.api.ksfmedia.fi/swagger.json';

const api = {
    login(params, success, error) {
        return Swagger(BASE_URL)
            .then(client => {
                client.apis.auth.post_login({body: params, LoginData: params})
                    .then(resp => success(resp))
                    .catch(err => error(err))
            })
    },

    getProfile(token) {
        return Swagger(BASE_URL)
            .then(client => {
                client.apis.users.get_users_me(token)
                    .then(resp => {
                        return resp;
                    })
            })
    },

    updateAddress(address) {
        return Swagger(BASE_URL)
            .then(client => {
                client.apis.puts_users_me_address(address)
                    .then(resp => {
                        return resp;
                    })
                    .catch(err => err)
            })
    }
};

export {api};