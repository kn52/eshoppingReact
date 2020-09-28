import React, {Fragment} from 'react';
import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CartView from "./CartView.js";
import FormControl from "@material-ui/core/FormControl";
import {get} from "../../services/HttpService";
import NavigationBar from "../utils/NavigationBar";
import "../../css/CartPage.css";
import OrderSummary from "./OrderSummary";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import CartService from "../../services/CartService";
import {withRouter} from 'react-router';
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import CustomerService from "../../services/CustomerService";
import OrderService from "../../services/OrderService";
import UserService from "../../services/UserService";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Loader from "react-loader-spinner";
import DialogBoxPage from "../utils/CustomDialogBox";
import Signup from "../user/Signup";
import Footer from "../utils/Footer";


class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded2: null,
            expanded3: null,
            AddedToCart: [],
            count: "",
            totalPrice: 0,

            isPanelOpen1: false,
            isPanelOpen2: false,
            isValid: false,
            isTest: false,
            isScrolled: false,
            isDialogBoxVisible: false,

            cName: "",
            cPhone: "",
            cPin: "",
            cLocality: "",
            cAddress: "",
            cTown: "",
            cLandmark: "",
            type: "HOME",

            cPinError: " ",
            cLocalityError: " ",
            cAddressError: " ",
            cTownError: " ",
            cLandmarkError: " ",

            orderId: "",
            showProgress: false
        };
    }

    handleCheckout = () => {
        this.setState({
            showProgress: true
        });
        const customer = {
            customerPinCode: this.state.cPin,
            customerLocality: this.state.cLocality,
            customerAddress: this.state.cAddress,
            customerTown: this.state.cTown,
            customerLandmark: this.state.cLandmark,
            customerAddressType: this.state.type,
        };

        console.log("customer ", customer);
        const orderDetails = {
            totalPrice: this.state.totalPrice,
            addressType: this.state.type
        };
        new CustomerService().addCustomer(customer).then((response) => {
            console.log(response);
            if (response.status === 200) {
                new OrderService().placeOrder(orderDetails).then((response) => {
                        console.log("order", this.state.totalPrice);
                        console.log(response);
                        this.setState({
                            orderId: response.data.data,
                            showDialog: false,
                        }, () => this.props.history.push({
                            pathname: '/order/successful',
                            state: {orderId: response.data.data}
                        }));
                    }
                )
            }
        });
    };

    handleChange = ({target}) => {
        this.setState({
            [target.id]: target.value,
        });
    };

    handleEditCartView = () => {
        this.setState({
            isTest: false,
            isPanelOpen1: false,
            isPanelOpen2: false,
            expanded2: "",
            expanded3: ""
        });
    };

    handleEditCustomerForm = () => {
        this.setState({
            isTest: false,
            isPanelOpen2: false,
            expanded3: ""
        });
    };

    handleCustomerDetailExpansionPanel = panel => (event, expanded2) => {
        this.setState({
            expanded2: panel,
            isPanelOpen1: true,
        });
    };

    handleOrderSummaryExpansionPanel = panel => (event, expanded3) => {
        if (this.canBeSubmitted()) {
            this.setState({
                expanded3: panel,
                isPanelOpen2: true,
                isValid: true,
                isTest: true,
            }, () => this.fetchCartBooks());

        }
        console.log(this.state.isTest)
    };

    validation = (event, pattern, message) => {
        if (event.target.value.match(pattern)) {
            this.setState({
                [event.target.id + "Error"]: " "
            })
        } else {
            this.setState({
                [event.target.id + "Error"]: message
            })
        }
    };

    handleRadioButton = (event) => {
        this.setState({type: event.target.value}, () => this.fetchCustomerDetails());

    };


    fetchCartBooks() {
        get("cart").then(response => {
            console.log("cart fetch");
            console.log(response);
            (response.data.statusCode === 200) ?
                this.setState({
                    AddedToCart: response.data.data,
                    count: response.data.data.length,
                }, () => this.calculateTotalPrice())
                :
                (localStorage.getItem('userToken') === null || response.data.message === "Token Not Valid" || response.data.message === "Token Expired") ?
                    this.setState({
                        isDialogBoxVisible: true,
                    }, () => this.clearTokens()) :
                    this.setState({
                            count: 0,
                        }
                    )
        })
            .catch(error => this.setState({error, isLoading: false}));
    };

    clearTokens = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
    }

    getUserDetails = () => {
        new UserService().getUserDetails().then(response => {
            console.log("user fetch");
            console.log(response);
            if (response.data.statusCode === 200) {
                this.setState({
                    cName: response.data.data.fullName,
                    cPhone: response.data.data.phoneNo,
                })
            }
        })
    }

    fetchCustomerDetails = () => {
        new CustomerService().getCustomerDetails(this.state.type).then(response => {
            console.log("Customer Details fetch");
            console.log(response);
            if (response.data.statusCode === 200) {
                this.setState({
                        cPin: response.data.data.customerPinCode.toString(),
                        cLocality: response.data.data.customerLocality,
                        cAddress: response.data.data.customerAddress,
                        cTown: response.data.data.customerTown,
                        cLandmark: response.data.data.customerLandmark,
                        type: response.data.data.customerAddressType,
                    }
                );
            } else {
                this.setState({
                        cPin: "",
                        cLocality: "",
                        cAddress: "",
                        cTown: "",
                        cLandmark: "",
                    }
                );
            }
        });
    }

    componentDidMount() {
        this.fetchCartBooks()
        this.getUserDetails();
        this.fetchCustomerDetails();
        window.addEventListener("scroll", () => {
            const isTop = window.scrollY < 100;
            console.log(isTop);
        })
    }

    handleRemove = id => event => {
        new CartService().deleteCart(id).then(response => {
            this.fetchCartBooks()
        });
    };

    formFilledCheck() {
        return this.state.cPin.trim().length > 0 && this.state.cLocality.trim().length > 0 &&
            this.state.cAddress.trim().length > 0 && this.state.cTown.trim().length > 0 && this.state.cLandmark.trim().length > 0 && this.state.type !== "";
    }

    errorCheck() {
        return this.state.cPinError.trim().length === 0 && this.state.cLocalityError.trim().length === 0 &&
            this.state.cAddressError.trim().length === 0 && this.state.cTownError.trim().length === 0 && this.state.cLandmarkError.trim().length === 0;
    }

    canBeSubmitted() {
        return this.errorCheck() && this.formFilledCheck();
    }

    updateCartDetails = (qValue, cartId) => {
        new CartService().updateCart(cartId, qValue).then((response) => {
            console.log(response);
        })
    }
    calculateTotalPrice = () => {
        this.setState({
            totalPrice: this.state.AddedToCart.reduce(function (totalPrice, cartItemList) {
                return totalPrice + cartItemList.quantity * cartItemList.book.bookPrice;
            }, 0)
        })

    }

    render() {
        console.log(this.state.totalPrice)
        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#b90f4b',
                },
            },
        });
        const {expanded2} = this.state;
        const {expanded3} = this.state;
        const AddedToCart = this.state.AddedToCart;
        const count = this.state.count;
        return (
            <Fragment>
                <div className="WishListMainDiv">
                    <NavigationBar/>
                    <Grid container>
                        <Breadcrumbs aria-label="breadcrumb" id="breadcrumb">
                            <Link color="inherit" href="/">
                                Home
                            </Link>
                            <Typography color="textPrimary">Cart</Typography>
                        </Breadcrumbs>
                        <DialogBoxPage component={<Signup/>} isDialogBoxVisible={this.state.isDialogBoxVisible}/>
                        <div id="cartContainer">
                            {this.state.showProgress &&
                            <Dialog className="processingDialog"
                                    fullWidth={true}
                                    onClose={this.state.showProgress}
                                    aria-labelledby="customized-dialog-title"
                                    open={this.state.showProgress}>
                                <DialogContent>
                                    <div className="loaderDialog">
                                        <Loader
                                            type="ThreeDots"
                                            color="#fff"
                                            height={35}
                                            width={200}
                                            timeout={50000}
                                        />
                                    </div>
                                    <div>
                                        <Typography className="loaderText" variant="h6">
                                            <b>Wait while we are processing your request...</b>
                                        </Typography>
                                    </div>
                                </DialogContent>
                            </Dialog>
                            }
                            <ExpansionPanel expanded id="expansionPanel">
                                <Typography component="h5" variant="h5" id="myCartHeader">My Cart
                                    ({count})</Typography>
                                {count === 0 ?
                                    <div id="emptyCart">
                                        <img src={require(`../../assets/images/emptyCart.png`)}
                                             alt="Empty CartPage"
                                             width="100px" height="100px"/>
                                        <h3>Your cart is empty</h3>
                                    </div> : <div>
                                        {this.state.isPanelOpen1 === true ?
                                            <Typography component="subtitle1"
                                                        variant="subtitle1"
                                                        id="editButton"
                                            >
                                                <Button size="small" onClick={this.handleEditCartView}>
                                                    Edit
                                                </Button>
                                            </Typography> : null
                                        }
                                        <div id={count > 2 ? "cartScroll" : ""}>
                                            {AddedToCart.map((id, index) =>
                                                <Grid key={id.id} item xs={24} sm={24} md={24} lg={12} xl={12}>
                                                    <CartView
                                                        cartId={id.cartItemsId}
                                                        bookDetails={id}
                                                        qValue={id.quantity}
                                                        handleRemove={this.handleRemove}
                                                        totalPrice={this.updateCartDetails}
                                                        pannel={this.state.isPanelOpen1}
                                                    />
                                                    {index !== AddedToCart.length - 1 ?
                                                        <Divider/> : console.log()
                                                    }
                                                </Grid>
                                            )}
                                        </div>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Button variant="outlined"
                                                    id="confirmOrderButton"
                                                    size="large"
                                                    color="inherit"
                                                    onClick={this.handleCustomerDetailExpansionPanel('panel2')}
                                                    style={this.state.isPanelOpen1 === false ? {
                                                        width: "136",
                                                        fontSize: "14px",
                                                        visibility: "visible",
                                                        background: "#b90f4b",
                                                        marginBottom: "20px",
                                                        marginRight: "20px",
                                                        float: 'right',
                                                        color: "white",
                                                        marginTop: "2%"
                                                    } : {visibility: "hidden"}}
                                            >
                                                CONFIRM ORDER
                                            </Button>
                                        </Grid>
                                    </div>
                                }
                            </ExpansionPanel>
                            <ExpansionPanel expanded={expanded2 === 'panel2'} id="expansionPanel">
                                <ExpansionPanelSummary>
                                    <Typography component="h5" variant="h5" id="cartHeader"
                                    >Customer Details</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails style={{display: "flex", flexDirection: "column",padding:"0"}}>
                                    {this.state.isPanelOpen2 === true ?
                                        <Typography component="subtitle1"
                                                    variant="subtitle1"
                                                    id="editButton"
                                        >
                                            <Button size="small" onClick={this.handleEditCustomerForm}>
                                                Edit
                                            </Button>
                                        </Typography> : null
                                    }
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid item xs={12} sm={6} md={6}>
                                            <ThemeProvider theme={theme}>
                                                <TextField id="cName" label="Name" variant="outlined"
                                                           name="Name"
                                                           className="customerDetails"
                                                           value={this.state.cName}
                                                           disabled
                                                           size="small"
                                                           helperText=" "
                                                           fullWidth required/>
                                            </ThemeProvider>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <TextField id="cPhone" label="Phone Number" variant="outlined"
                                                       name="Phone Number"
                                                       className="customerDetails"
                                                       value={this.state.cPhone}
                                                       disabled
                                                       size="small"
                                                       helperText=" "
                                                       fullWidth required/>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <TextField id="cAddress" label="Address" multiline
                                                       onChange={this.handleChange}
                                                       name="Address"
                                                       className="customerDetails"
                                                       value={this.state.cAddress}
                                                       size="small"
                                                       disabled={this.state.isTest}
                                                       onBlur={textEvent => this.validation(textEvent, "^.{6,}$", "Please Enter at least 6 Characters")}
                                                       error={this.state.cAddressError.trim().length !== 0}
                                                       helperText={this.state.cAddressError}
                                                       rows={3} variant="outlined" fullWidth required/>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <TextField id="cTown" label="City/Town" variant="outlined"
                                                       name="City/Town"
                                                       className="customerDetails"
                                                       disabled={this.state.isTest}
                                                       onChange={this.handleChange}
                                                       value={this.state.cTown}
                                                       size="small"
                                                       onBlur={textEvent => this.validation(textEvent, "^[A-Za-z .]{3,}", "Please enter at least 3 character")}
                                                       error={this.state.cTownError.trim().length !== 0}
                                                       helperText={this.state.cTownError}
                                                       fullWidth required/>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <TextField id="cPin" label="Pin Code" variant="outlined"
                                                       name="Pin Code"
                                                       className="customerDetails"
                                                       value={this.state.cPin}
                                                       disabled={this.state.isTest}
                                                       onChange={this.handleChange}
                                                       size="small"
                                                       onBlur={textEvent => this.validation(textEvent, "^[0-9]{6}$", "Please enter valid pincode")}
                                                       error={this.state.cPinError.trim().length !== 0}
                                                       helperText={this.state.cPinError}
                                                       fullWidth required/>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <TextField id="cLocality" label="Locality" variant="outlined"
                                                       name="Locality"
                                                       className="customerDetails"
                                                       value={this.state.cLocality}
                                                       disabled={this.state.isTest}
                                                       onChange={this.handleChange}
                                                       size="small"
                                                       onBlur={textEvent => this.validation(textEvent, "^[A-Za-z .]{3,}", "Please enter at least 3 character")}
                                                       error={this.state.cLocalityError.trim().length !== 0}
                                                       helperText={this.state.cLocalityError}
                                                       fullWidth required/>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <TextField id="cLandmark" label="Landmark" variant="outlined"
                                                       name="Landmark"
                                                       className="customerDetails"
                                                       disabled={this.state.isTest}
                                                       onChange={this.handleChange}
                                                       value={this.state.cLandmark}
                                                       size="small"
                                                       onBlur={textEvent => this.validation(textEvent, "^[A-Za-z .]{3,}", "Please enter at least 3 character")}
                                                       error={this.state.cLandmarkError.trim().length !== 0}
                                                       helperText={this.state.cLandmarkError}
                                                       fullWidth required/>
                                        </Grid>
                                        <Grid item xs={12} sm={7} md={7} style={{marginLeft: "5%"}}>
                                            <Typography style={{display: "flex"}}>Type</Typography>

                                            <FormControl component="fieldset" style={{display: "flex",width: "50vw"}}>
                                                <RadioGroup row aria-label="type" id="type" name="type"
                                                            value={this.state.type}
                                                            onChange={this.handleRadioButton}>
                                                    <FormControlLabel value="HOME"
                                                                      disabled={this.state.isTest}
                                                                      control={<Radio style={{color: "#b90f4b"}}/>}
                                                                      label="Home"/>

                                                    <FormControlLabel value="WORK"
                                                                      disabled={this.state.isTest}
                                                                      control={<Radio style={{color: "#b90f4b"}}/>}
                                                                      label="Work"/>

                                                    <FormControlLabel value="OTHER"
                                                                      disabled={this.state.isTest}
                                                                      control={<Radio style={{color: "#b90f4b"}}/>}
                                                                      label="Other"/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            color="inherit"
                                            disabled={!this.canBeSubmitted()}
                                            onClick={this.handleOrderSummaryExpansionPanel('panel3')}
                                            style=
                                                {this.canBeSubmitted() === false ? {
                                                    fontSize: "14px",
                                                    visibility: "visible",
                                                    marginBottom: "20px",
                                                    marginRight: "20px",
                                                    float: 'right',
                                                    marginTop: "2%",
                                                    background: "#E0E0E0",
                                                    color: "Black",
                                                    border: "none"
                                                } : (this.state.isPanelOpen2 === false ? {
                                                    width: "136",
                                                    fontSize: "14px",
                                                    visibility: "visible",
                                                    background: "#b90f4b",
                                                    marginBottom: "20px",
                                                    marginRight: "20px",
                                                    float: 'right',
                                                    color: "white",
                                                    marginTop: "2%",
                                                } : {visibility: "hidden"})}
                                        >
                                            CONTINUE
                                        </Button>
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel expanded={expanded3 === 'panel3'} id="expansionPanel"
                                            style={{marginTop: "15px"}}>
                                <Typography component="h5" variant="h5" id="orderSummary"
                                >Order Summary</Typography>
                                <div container alignItems="center" id={count > 2 ? "orderScroll" : ""}>
                                    {AddedToCart.map((id) =>
                                        <div>
                                            <Grid key={id.id} item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <OrderSummary
                                                    bookDetails={id}
                                                    quantity={id.quantity}
                                                />
                                                <Divider/>
                                            </Grid>
                                        </div>
                                    )}
                                </div>
                                <div id="lastCart">
                                    <div id="totalPrice">Total Price : Rs. {this.state.totalPrice}</div>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            color="inherit"
                                            style={{
                                                width: "136",
                                                fontSize: "14px",
                                                visibility: "visible",
                                                background: "#b90f4b",
                                                marginBottom: "20px",
                                                marginRight: "20px",
                                                float: 'right',
                                                color: "white",
                                                marginTop: "2%"
                                            }}
                                            onClick={this.handleCheckout}>
                                            CHECKOUT
                                        </Button>
                                    </Grid>
                                </div>
                            </ExpansionPanel>
                        </div>
                    </Grid>
                </div>
                <Footer/>
            </Fragment>
        );
    }
}

export default withRouter(CartPage);
