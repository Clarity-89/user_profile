import Swagger from 'swagger-client'

/**
 * Helper functions for communicating with the API
 */

const BASE_URL = 'https://frontend-test.api.ksfmedia.fi/swagger.json';

const api = {
    login(params, success, error) {
        return Swagger(BASE_URL)
            .then(client => {
                client.apis.auth.post_login({LoginData: params})
                    .then(resp => success(resp))
                    .catch(err => error(err))
            })
    },

    getProfile(token, success, error) {
        return Swagger(BASE_URL)
            .then(client => {
                client.apis.users.get_users_me({authorization: `Token ${token}`})
                    .then(resp => success(resp))
                    .catch(err => error(err))
            })
    },

    updateAddress(params, success, error) {
        return Swagger(BASE_URL)
            .then(client => {
                client.apis.users.put_users_me_address({
                    authorization: `Token ${params.token}`,
                    'new-address': params.address
                })
                .then(resp => success(resp))
                .catch(err => error(err))
            })
    }
};

export {api};