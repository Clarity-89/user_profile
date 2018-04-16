import Swagger from 'swagger-client'

/**
 * Helper functions for communicating with the API
 */

const BASE_URL = 'https://frontend-test.api.ksfmedia.fi/swagger.json';

const api = {
    login(params) {
        return Swagger(BASE_URL)
            .then(client => client.apis.auth.post_login({LoginData: params}));
    },

    getProfile(token) {
        return Swagger(BASE_URL)
            .then(client => client.apis.users.get_users_me({authorization: `Token ${token}`}));
    },

    updateAddress(params) {
        return Swagger(BASE_URL)
            .then(client => {
                client.apis.users.put_users_me_address({
                    authorization: `Token ${params.token}`,
                    'new-address': params.address
                });
            });
    }
};

export {api};