import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import "../../css/Book.css";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import CartService from "../../services/CartService";
import {withRouter} from 'react-router';
import IconButton from "@material-ui/core/IconButton";
import {Favorite} from "@material-ui/icons";
import InfoIcon from '@material-ui/icons/Info';
import DialogBoxPage from "../utils/CustomDialogBox";
import WishListService from "../../services/WishListService";
import CustomSnackBar from "../utils/CustomSnackBar";
import AdminService from "../../services/AdminService";

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartList: [],
            buttonText1: "Add To CartPage",
            counter: 0,

            isDialogBoxVisible: false,
            isAddToWishList: false,

            alertShow: false,
            alertResponse: "",
            severity: "",
            url: this.props.location.pathname,
        };
    }

    handle = () => {
        this.props.history.push('/login');
    }

    addToCart = async (id) => {
        const cart = {
            id: id,
            quantity: 1,
            price: this.props.bookId.bookPrice
        };
        this.setState({buttonText: 'Added To CartPage'});
        let response = await new CartService().addToCart(cart);
        (response.data.statusCode === 200 || response.data.message === "Book Already Exists In Cart") ?
            this.props.updateCartList()
            :
            this.setState({
                isDialogBoxVisible: true,
            }, () => this.clearTokens());
    };

    clearTokens = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
    }

    handleWishListOperations = () => {
        this.props.wishList.includes(this.props.bookId.isbnNumber) ?
            new WishListService().removeFromWishList(this.props.bookId.id).then((response) => {
                console.log("wishList remove");
                console.log(response);
                this.props.updateWishList()
                if (response.data.statusCode === 200) {
                    this.setState({
                        severity: "success",
                        alertShow: true,
                        alertResponse: response.data.message
                    })
                }
            }) :
            new WishListService().addToWishList(this.props.bookId.id).then((response) => {
                console.log("wishList add");
                console.log(response);
                if (response.data.statusCode === 200) {
                    this.props.updateWishList(true)
                    this.setState({
                        severity: "success",
                        alertShow: true,
                        alertResponse: response.data.message
                    })
                }
            })
    }

    dialogBoxOpen = () => {
        if (localStorage.getItem('userToken') === null)
            this.setState({
                isDialogBoxVisible: true,
            });
    };

    dialogBoxClose = () => {
        this.setState({
            isDialogBoxVisible: false,
        })
    };
    closeAlertBox = () => {
        this.setState({alertShow: false});
    };

    viewMoreDetails = () => {
        let bookInfo = this.props.bookId;
        this.props.history.push({
            pathname: "/book/review",
            state: {bookInfo: bookInfo}
        })
    }

    deleteBook = () => {
        new AdminService().deleteBook(this.props.bookId.id).then((response) => {
            console.log("delete book");
            console.log(response);
            if (response.data.statusCode === 200) {
                this.props.updateBookList()
                this.setState({
                    severity: "success",
                    alertShow: true,
                    alertResponse: response.data.message
                })
            } else {
                this.setState({
                    severity: "error",
                    alertShow: true,
                    alertResponse: response.data.message
                })
            }
        })
    };

    updateBook = () => {
        this.props.history.push({
            pathname: '/admin/update/book',
            state: {bookData: this.props.bookId}
        })
    };

    render() {
        const DetailTooltip = withStyles((theme) => ({
            arrow: {
                color: theme.palette.common.white,
            },
            tooltip: {
                backgroundColor: 'white',
                color: 'rgba(0, 0, 0, 0.87)',
                boxShadow: theme.shadows[8],
                fontSize: 1,
                maxWidth: 480,
                padding: 15,
                overflowScrolling: 'auto',
            },
        }))(Tooltip);
        return (
            <Card id="card">
                <CustomSnackBar alertShow={this.state.alertShow}
                                severity={this.state.severity}
                                alertResponse={this.state.alertResponse}
                                closeAlertBox={this.closeAlertBox}/>
                <DialogBoxPage isDialogBoxVisible={this.state.isDialogBoxVisible} close={this.dialogBoxClose}/>
                <DetailTooltip title={
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom color="inherit"><b style={{fontSize: '16px'}}>Book
                            Description</b></Typography>
                        <Typography color="grey" style={{
                            fontSize: '13px',
                            textAlign: "justify"
                        }}>{this.props.bookId.bookDetail}</Typography>
                    </React.Fragment>}
                               placement="right-start" arrow>
                    <CardActionArea id="CardContainer">
                        <CardMedia id="bookImage"
                                   component="img"
                                   image={this.props.bookId.bookImageSrc}
                        />
                        <InfoIcon className="infoIcon" color={"primary"} onClick={this.viewMoreDetails}/>
                        <div className="outOfStockLabel"
                             style={this.props.bookId.noOfCopies <= 0 ? {visibility: "visible"} : {visibility: "hidden"}}>OUT
                            OF
                            STOCK
                        </div>
                    </CardActionArea>
                </DetailTooltip>
                <CardContent id="cardBottom">
                    <p className="bookTitle">{this.props.bookId.bookName}</p>
                    <IconButton className={this.state.url === "/" ? "wishlist" : "hideWishList"}
                                onClick={this.dialogBoxOpen}
                                color="inherit">
                        {this.props.wishList.includes(this.props.bookId.isbnNumber) ?
                            <Favorite color="primary" onClick={this.handleWishListOperations}/> :
                            <Favorite color="disabled" onClick={this.handleWishListOperations}/>
                        }
                    </IconButton>
                    <p className="bookAuthorName">by {this.props.bookId.authorName}</p>
                    <p className="bookPrice">Rs. {this.props.bookId.bookPrice}</p>
                    {this.state.url === "/" ?
                        <Button id="addToCartButton" variant="contained" size="small"
                                style={this.props.bookId.noOfCopies === 0 ? {
                                    color: "black",
                                    backgroundColor: '#C2C1C2'
                                } : (this.props.cart.includes(this.props.bookId.isbnNumber) ? {
                                    color: "white",
                                    backgroundColor: "#4d8cb9"
                                } : {color: "white", backgroundColor: "#b90f4b"})}
                                onClick={() => this.props.cart.includes(this.props.bookId.isbnNumber) ? this.props.history.push('/cart') : this.addToCart(this.props.bookId.id)}
                                disabled={this.props.bookId.noOfCopies === 0}>
                            {this.props.cart.includes(this.props.bookId.isbnNumber) ? "Go To Cart" : "Add To Cart"}
                        </Button>
                        : <Button style={{
                            color: "white",
                            backgroundColor: '#b90f4b'
                        }} onClick={() => this.updateBook(this.props.bookId)}>Update Book </Button>
                    }
                </CardContent>
            </Card>
        )
    };
}

export default withRouter(Book);
