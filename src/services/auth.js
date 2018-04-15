/**
 * A module handling user's authentication via browser's session
 **/

const auth = {
    isAuthenticated() {
        return localStorage.getItem('token');
    },

    authenticate(token) {
        localStorage.setItem('token', token);
    },

    logout(cb) {
        localStorage.removeItem('token');
        cb();
    },

    isTokenExpired() {

    },

    setTokenExpirationDate() {

    }
};

export {auth};