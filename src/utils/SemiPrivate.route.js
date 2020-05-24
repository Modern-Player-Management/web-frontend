import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import AuthService from "../services/auth.service";

const SemiPrivateRoute = ({ component: Component, ...rest }) => {

    // Add your own authentication on the below line.
    const isLoggedIn = AuthService.getCurrentUser()

    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (

                    <Redirect to={{ pathname: '/teams', state: { from: props.location } }} />
                ) : (
                    <Component {...props} />
                )
            }
        />
    )
}

export default SemiPrivateRoute