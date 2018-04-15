/**
 * A module handling user's authentication via browser's session
 **/

const auth = {
    isAuthenticated() {
        return !!localStorage.getItem('token');
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
    }
};

export {auth};