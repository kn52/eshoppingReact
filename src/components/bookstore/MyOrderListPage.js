import React, {Component, Fragment} from "react";
import NavigationBar from "../utils/NavigationBar";
import {ExpansionPanel, Grid, Typography} from "@material-ui/core";
import "../../css/wishlistPage.css"
import OrderSummary from "./OrderSummary";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import "../../css/MyOrderListPage.css";
import OrderService from "../../services/OrderService";
import DialogBoxPage from "../utils/CustomDialogBox";
import Signup from "../user/Signup";
import Footer from "../utils/Footer";

class MyOrderListPage extends Component {
    constructor(props) {
        super(props);
        this.getOrderedItemsList();
        this.state = {
            OrderedItemsList: [],
            count: 0,
            isDialogBoxVisible: false,
        }
    }

    getOrderedItemsList() {
        new OrderService().fetchOrders().then(response => {
            console.log("order fetch");
            console.log(response);
            (response.data.statusCode === 200) ?
                this.setState({
                    OrderedItemsList: response.data.data,
                    count: response.data.data.length
                })
                : (localStorage.getItem('userToken') === null || response.data.message === "Token Not Valid" || response.data.message === "Token Expired") &&
                this.setState({
                    isDialogBoxVisible: true,
                }, () => this.clearTokens())
        })
    };

    clearTokens = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
    }

    componentDidMount() {

    }

    render() {
        const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const OrderedItemsList = this.state.OrderedItemsList;
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
                            <Typography color="textPrimary">My Order</Typography>
                        </Breadcrumbs>
                        <Typography component="h5" variant="h5" id="wishlistTitle"
                        >My Order ({this.state.count})</Typography>
                        {this.state.count === 0 &&
                        <ExpansionPanel id="wishlistContainer">
                            <div id="emptyCart">
                                <img src={require(`../../assets/images/emptyOrder.png`)}
                                     alt="Empty CartPage"
                                     width="250px" height="150px"/>
                                <h3>You have not placed any order yet</h3>
                            </div>
                        </ExpansionPanel>}
                        <div id="myOrderContainer">
                            {OrderedItemsList.map((id, index) =>
                                <div id="myOrderCart">
                                    <div id="OrderDate">
                                        <Typography style={{fontWeight: "bold"}}>Order Placed on
                                            {" " + id.orderPlacedDate.substr(8, 2)}
                                            {" " + months[parseInt(id.orderPlacedDate.substr(5, 2)) - 1]}
                                            {" " + id.orderPlacedDate.substr(0, 4)}
                                        </Typography></div>
                                    <div id={id.orderProducts.length > 2 ? "cartScroll" : ""}>
                                        {id.orderProducts.map((id2, index) =>
                                            <Grid
                                                style={{width: "fit-content", display: "flex", flexDirection: "row"}}
                                                item
                                                xs={12}
                                                sm={12} md={12} lg={12} xl={12}>
                                                <OrderSummary
                                                    bookDetails={id2}
                                                    quantity={id2.quantity}
                                                />
                                            </Grid>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Grid>
                </div>
                <Footer/>
            </Fragment>
        );
    }
}

export default MyOrderListPage;