import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

import {auth} from '../services/auth';

/**
 * A stateless component displaying a landing page with login link
 */
const Homepage = () => {

    return (
        <div className="homepage">
            <h2 className="homepage__header">Welcome to the user management app!</h2>

            {
                auth.isAuthenticated()
                    ? (
                        <Link to='/profile' className="homepage__btn">Profile</Link>
                    ) : (
                        <Fragment>
                            <h3 className="homepage__subheader">Start by logging in.</h3>
                            <Link to='/login' className="homepage__btn">Login</Link>
                        </Fragment>
                    )
            }

        </div>
    )
};

export {Homepage};