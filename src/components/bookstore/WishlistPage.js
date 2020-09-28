import React, {Component, Fragment} from "react";
import NavigationBar from "../utils/NavigationBar";
import {ExpansionPanel, Grid, Typography} from "@material-ui/core";
import "../../css/wishlistPage.css"
import OrderSummary from "./OrderSummary";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import WishListService from "../../services/WishListService";
import DialogBoxPage from "../utils/CustomDialogBox";
import Signup from "../user/Signup";
import Footer from "../utils/Footer";

class WishlistPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AddedToCart: [],
            count: 0,
            isDialogBoxVisible:false,
        }
    }


    getBooksAddedToCart() {
        new WishListService().fetchWishList().then(response => {
            console.log("cart fetch");
            console.log(response);
            (response.data.statusCode === 200) ?
                this.setState({
                    AddedToCart: response.data.data,
                    count: response.data.data.length
                })
                : (localStorage.getItem('userToken') === null || response.data.message === "Token Not Valid" || response.data.message === "Token Expired") &&
                this.setState({
                    isDialogBoxVisible: true,
                },()=> this.clearTokens())
        })
    };

    clearTokens = () =>{
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
    }
    componentDidMount() {
        this.getBooksAddedToCart();
    }

    render() {
        const AddedToCart = this.state.AddedToCart;
        return (
            <Fragment>
                <div className="WishListMainDiv">
                <NavigationBar/>
                <DialogBoxPage component={<Signup/>} isDialogBoxVisible={this.state.isDialogBoxVisible}/>
                <Grid container>
                    <Breadcrumbs aria-label="breadcrumb" id="breadcrumb">
                        <Link color="inherit" href="/">
                            Home
                        </Link>
                        <Typography color="textPrimary">Wishlist</Typography>
                    </Breadcrumbs>
                    <Typography component="h5" variant="h5" id="wishlistTitle"
                    >My Wishlist ({this.state.count})</Typography>
                    <ExpansionPanel id="wishlistContainer">
                        {this.state.count === 0 ?
                            <div id="emptyCart">
                                <img src={require(`../../assets/images/emptyWishlist.jpg`)}
                                     alt="Empty CartPage"
                                     width="250px" height="150px"/>
                                <h3>Your wishlist is empty</h3>
                            </div> :
                            <div container alignItems="center">
                                {AddedToCart.map((id, index) =>
                                    <div>{console.log(AddedToCart)}
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <OrderSummary
                                                bookDetails={id}
                                                quantity={1}
                                            />
                                            {index !== AddedToCart.length - 1 ?
                                                <Divider/> : console.log()
                                            }
                                        </Grid>
                                    </div>
                                )}
                            </div>
                        }
                    </ExpansionPanel>
                </Grid>
                <br/>
                </div>
                <Footer/>
            </Fragment>
        );
    }
}

export default WishlistPage;