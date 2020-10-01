import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute(props) {

    if(props.path.includes('admin')) {
        return localStorage.getItem("adminToken") === null ? (<Redirect  to="/admin/login"  />)
            :(<Route  path={props.path}  exact={props.exact} component={props.component} />)
    }

    return localStorage.getItem("userToken") !== null && 
        (<Route  path={props.path}  exact={props.exact} component={props.component} />)
}

export  default  PrivateRoute;