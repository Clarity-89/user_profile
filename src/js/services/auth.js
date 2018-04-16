/**
 * A module handling user's authentication via browser's session
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
            return new Date(timestamp).toDateString() !== new Date().toDateString();
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