/**
 * A module handling user's authentication via browser's session
 * The module handles authentication by setting the token, received from the API, to local storage.
 * Since, according to the API documentation, the token expires every day at midnight UTC, we need to add extra
 * 'timestamp' value to the token before saving it to local storage.
 * Then upon each page load that requires authorization, the token's timestamp is checked against the current date to
 * determine whether it has expired. Expired tokens are also removed from local storage.
 **/

const auth = {
    isAuthenticated() {
        let token = localStorage.getItem('token');

        if (token) {
            if (this.isTokenExpired(token)) {
                this.clearToken();
                return false;
            } else {
                return true;
            }
        }

        return false;
    },

    authenticate(token) {
        let tokenObj = {value: token, timestamp: new Date().getTime()};
        localStorage.setItem('token', JSON.stringify(tokenObj));
    },

    logout(cb) {
        localStorage.removeItem('token');
        cb();
    },

    isTokenExpired(token) {
        let timestamp = JSON.parse(token)['timestamp'];

        if (timestamp) {
            return new Date(timestamp).getUTCDate() !== new Date().getUTCDate();
        }
    },

    getToken() {
        let token = localStorage.getItem('token');

        if (token && !this.isTokenExpired(token)) {
            return JSON.parse(token)['value'];
        }
    },

    clearToken() {
        localStorage.removeItem('token');
    }
};

export {auth};