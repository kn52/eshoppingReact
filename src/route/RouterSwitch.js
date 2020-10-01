import {BrowserRouter, Route, Switch} from 'react-router-dom'
import React from "react";
import AddBook from "../components/admin/AddBook";
import HomePage from "../components/bookstore/HomePage";
import CartPage from "../components/bookstore/CartPage";
import OrderSuccess from "../components/bookstore/OrderSuccess";
import WishlistPage from "../components/bookstore/WishlistPage";
import MyOrderListPage from "../components/bookstore/MyOrderListPage";
import ForgetPassword from "../components/user/ForgetPassword";
import ResetPassword from "../components/user/ResetPassword";
import VerifyEmail from "../components/user/VerifyEmail";
import AdminLogin from "../components/admin/AdminLogin";
import ProductReview from "../components/bookstore/ProductReview";
import PrivateRoute from './PrivateRoute';
import { connect } from 'react-redux';
import { userAllowed } from '../redux/actions/AuthAction';

class DefaultRoutes extends React.Component {
    
    constructor(props) {
        super(props);
        localStorage.getItem('userToken') !==null && this.props.allowUser(true);
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <PrivateRoute path={"/admin/add/book"} exact component={AddBook}/>
                    <PrivateRoute path={"/admin/update/book"} exact component={AddBook}/>
                    <PrivateRoute path={"/admin"} exact component={HomePage}/>
                    <Route path={"/admin/login"} exact component={AdminLogin}/>
                    <Route path={"/"} exact component={HomePage}/>
                    <PrivateRoute path={"/cart"} exact component={CartPage}/>
                    <Route path={"/order/successful"} exact component={OrderSuccess}/>
                    <PrivateRoute path={"/wishlist"} exact component={WishlistPage}/>
                    <PrivateRoute path={"/orders"} exact component={MyOrderListPage}/>
                    <Route path={"/forget/password"} exact component={ForgetPassword}/>
                    <Route path={"/reset/password"} exact component={ResetPassword}/>
                    <Route path={"/verify/email/"} exact component={VerifyEmail}/>
                    <Route path={"/book/review"} exact component={ProductReview}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        allowUser: (data)=> dispatch(userAllowed(data)),
    }
}

export default connect(null,mapDispatchToProps)(DefaultRoutes);