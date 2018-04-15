import React from 'react';
import {Link} from 'react-router-dom';

/**
 * A stateless component displaying a landing page with login link
 */
const Homepage = () => {

    return (
        <div className="homepage">
            <h2 className="homepage__welcome">Welcome to the user management app! <br/> Start by logging in.</h2>
            <Link to='/login' className="homepage__btn">Login</Link>
        </div>
    )
};

export {Homepage};