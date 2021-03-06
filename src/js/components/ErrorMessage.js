import React from 'react';

const ErrorMessage = ({serverError, incorrectLogin, extraClasses=''}) => {
    let text = "";
    let hasErrors = serverError || incorrectLogin;

    if (incorrectLogin) {
        text = 'Incorrect username or password';
    } else if (serverError) {
        text = 'There was an error with your request. Please try again later.'
    }

    return (
        hasErrors
            ? <p className={"error-message " + extraClasses}>{text}</p>
            : null
    )
};

export {ErrorMessage};