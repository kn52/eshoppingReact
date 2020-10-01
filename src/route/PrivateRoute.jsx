import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute(props) {
    return localStorage.getItem("adminToken") === null 
    ? (<Redirect  to="/admin/login"  />)
    :(<Route  path={props.path}  exact={props.exact} component={props.component} />)
}
export  default  PrivateRoute;