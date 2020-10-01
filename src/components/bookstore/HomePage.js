import React, {Component, Fragment} from "react";
import "../../css/scrollbar.css";
import Grid from "@material-ui/core/Grid";
import Card from "./Book";
import Pagination from "@material-ui/lab/Pagination";
import NavigationBar from "../utils/NavigationBar";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import BookStoreService from "../../services/BookStoreService";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import CartService from "../../services/CartService";
import Loader from "../utils/Loader";
import WishListService from "../../services/WishListService";
import {withRouter} from "react-router";
import Footer from "../utils/Footer";
import { connect } from 'react-redux';
import { addBooks } from '../../redux/actions/BookAction';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.fetchCartList();
        this.fetchWishList();
        this.state = {
            id: 0,
            bookList: [{
                
            }],
            count: 0,
            pageValue: 1,
            searchText: " ",
            badgeCount: 0,
            selectValue: "",
            counter: 0,
            cartList: "",
            wishList: "",
            loaded: false
        };
    }

    clearTokens = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
    }

    fetchCartList = () => {
        if (!this.props.location.pathname.includes("admin") && this.props.allowUser === true) {
            new CartService().fetchCart("cart").then((response) => {
                    (response.data.statusCode === 200) ?
                        this.setState({
                            counter: response.data.data.length,
                            cartList: response.data.data.map(value => value.book.isbnNumber).toString()
                        }) :
                        (localStorage.getItem('userToken') === null || response.data.message === "Token Not Valid" || response.data.message === "Token Expired") ?
                            this.setState({
                                isDialogBoxVisible: true,
                            }, () => this.clearTokens()) :
                            this.setState({
                                counter: 0,
                                cartList: ""
                            })
                }
            );
        }
    };

    fetchWishList = () => {
        if (!this.props.location.pathname.includes("admin") && this.props.allowUser === true) {
            new WishListService().fetchWishList().then((response) => { 
                    (response.data.statusCode === 200) ?
                        this.setState({
                            wishList: response.data.data.map(value => value.book.isbnNumber).toString()
                        })
                        :
                        this.setState({
                            wishList: ""
                        });
                }
            );
        }
    };

    getBooks = () => {
        new BookStoreService().fetchBooks(this.state.pageValue, this.state.searchText, this.state.selectValue)
            .then((response) => {
                    console.log("fetchbook")
                    console.log(response.data.data);
                    if (response.data.statusCode === 208){
                        this.setState({
                            bookList: [],
                            count: 0,
                        })
                    }
                    else {
                        const data = response.data.data;
                        this.props.addBooks(data);
                        this.setState({
                            bookList: this.props.booklist.content,
                            count: this.props.booklist.totalElements,
                        });
                    }
                }
            )
            .catch((error) => {
                console.log(error)
            });
        setTimeout(() => {
            this.setState({
                loaded: true
            });

        }, 2000)
        window.scrollTo(0, 0);
    }

    componentDidMount() {
        this.getBooks()
    }

    onPageChange = (event, value) => {
        this.setState({pageValue: value,}, () => {
            this.getBooks()
        });
        this.handleChange(this.state.selectValue)
    };

    getSearchFieldTextValue = (text) => {
        this.setState({searchText: text, pageValue: 1}, () => this.getBooks())
    };

    handleChange = (value) => {
        this.setState({
            selectValue: value,
        }, () => this.getBooks())
    };

    badgeCount = (count) => {
        this.setState({badgeCount: count})
    };

    render() {
        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#b90f4b',
                },
            },
        });
        return (
            <Fragment>
                <NavigationBar searchedText={this.getSearchFieldTextValue} badgeCount={this.state.counter}/>
                <Container id="homePageContainer">
                    <div className="BooksCountSortFieldDiv">
                        <p>Books <span>({this.state.count} items) </span></p>
                        <ThemeProvider theme={theme}>
                            {this.state.count === 0 ?
                                <div>
                                </div> :
                                <Select id="sortField"
                                        native
                                        className="select-filter"
                                        variant="outlined"
                                        onChange={event => this.handleChange(event.target.value)}>
                                    <option value={"DEFAULT"}>Filter</option>
                                    {this.props.location.pathname !== "/" &&
                                    <option value={"QUANTITY_LOW_TO_HIGH"}>Quantity:Low To High</option>
                                    }
                                    <option value={"LOW_TO_HIGH"}>Price : Low To High</option>
                                    <option value={"HIGH_TO_LOW"}>Price : High To Low</option>
                                    <option value={"NEW_ARRIVALS"}>New Arrival</option>
                                </Select>
                            }
                        </ThemeProvider>
                    </div>
                    {this.state.loaded === true && this.state.count === 0 &&
                    <div className="resultNotFound">
                        <img src={require(`../../assets/images/noResult.png`)} alt="No Result Found"
                             width="300px" height="200px"/>
                        <h2>Sorry, no results found!</h2>
                    </div>}
                    {
                        ((this.props.location.pathname === "/admin" || this.props.location.pathname === "/admin/") && (localStorage.getItem('adminToken') === null)) &&
                        this.props.history.push("/admin/login")
                    }
                    {this.state.loaded === false && <Loader/>}
                    {this.state.loaded === true && this.state.count !== 0 &&
                    <Grid container spacing={4}>
                        {this.state.bookList.map(id =>
                            <Grid alignItems="center" key={id.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <Card
                                    bookId={id}
                                    badgeCount={this.badgeCount}
                                    cart={this.state.cartList}
                                    wishList={this.state.wishList}
                                    updateCartList={this.fetchCartList}
                                    updateWishList={this.fetchWishList}
                                    updateBookList={this.getBooks}
                                />
                            </Grid>
                        )}

                    </Grid>
                    }
                    <br/>
                </Container>
                <Grid container justify={"center"}>
                    <Pagination size="small" count={Math.ceil(this.state.count / 12)} variant="text" color="secondary"
                                onChange={this.onPageChange}/>
                </Grid>
                <br/>
                <Footer/>
            </Fragment>
        );
    }
}

const mapToStateProps = state => {
    console.log("Home "+ state.book.books);
    return {
        allowUser: state.auth.userAuth,
        booklist: state.book.books,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addBooks: (books) => { dispatch(addBooks(books)) }
    }
}

export default connect(mapToStateProps,mapDispatchToProps)(withRouter(HomePage));