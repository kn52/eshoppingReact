import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const  PrivateRoute = (props) => props.path.includes('admin') 
            ? localStorage.getItem("adminToken") === null ? (<Redirect  to="/admin/login"  />)
            :(<Route  path={props.path}  exact={props.exact} component={props.component} />) :
            localStorage.getItem("userToken") === null ? (<Redirect  to="/admin/login"  />)
            :(<Route  path={props.path}  exact={props.exact} component={props.component} />);

export  default  PrivateRoute;