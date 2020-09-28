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

export default class DefaultRoutes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path={"/admin/add/book"} exact component={AddBook}/>
                    <Route path={"/admin/update/book"} exact component={AddBook}/>
                    <Route path={"/admin"} exact component={HomePage}/>
                    <Route path={"/admin/login"} exact component={AdminLogin}/>
                    <Route path={"/"} exact component={HomePage}/>
                    <Route path={"/cart"} exact component={CartPage}/>
                    <Route path={"/order/successful"} exact component={OrderSuccess}/>
                    <Route path={"/wishlist"} exact component={WishlistPage}/>
                    <Route path={"/orders"} exact component={MyOrderListPage}/>
                    <Route path={"/forget/password"} exact component={ForgetPassword}/>
                    <Route path={"/reset/password"} exact component={ResetPassword}/>
                    <Route path={"/verify/email/"} exact component={VerifyEmail}/>
                    <Route path={"/book/review"} exact component={ProductReview}/>
                </Switch>
            </BrowserRouter>
        );
    }
}