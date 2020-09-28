import React from 'react';
// import Service from '../service/Service';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Divider from '@material-ui/core/Divider';
import Rating from '@material-ui/lab/Rating';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import StarIcon from '@material-ui/icons/Star';
import '../../css/ProductReview.css';
import {ThemeProvider} from '@material-ui/styles';
import NavigationBar from "../utils/NavigationBar";
import Link from "@material-ui/core/Link";
import CustomerService from "../../services/CustomerService";
import Footer from "../utils/Footer";


export default class ProductReview extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.location.state === undefined)
            window.location.href = "/"
        this.state = {
            bookInfo: '',
            feedback: '',
            feedbacks: [],
            feedbackLength: 0,
            readMore: true,
            rating: "NaN",
            averageRating: 0
        }
    }

    componentDidMount() {
        console.log(this.props.location.state.bookInfo);
        this.setState({
            bookInfo: this.props.location.state.bookInfo
        });
        this.getFeedback(this.props.location.state.bookInfo);
        this.getCustomerFeedback();
    }

    handleChange(field, event) {
        this.setState({[event.target.name]: event.target.value});
    }

    getFeedback = (object) => {
        console.log("object.isbnNumber");
        new CustomerService().getAllFeedback(object.isbnNumber).then((response) => {
            console.log(response.data.data);
            console.log(this.state.feedbacks)
            this.setState({
                feedbacks: response.data.data,
                averageRating: response.data.data.reduce(function (averageRating, feedbackData) {
                    return averageRating + feedbackData.rating
                }, 0) / response.data.data.length
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    addFeedback = (e) => {
        e.preventDefault();
        console.log(this.state.bookInfo)
        var data = {
            rating: this.state.rating,
            feedbackMessage: this.state.feedback,
            isbNumber: this.state.bookInfo.isbnNumber
        };

        new CustomerService().addFeedback(data).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });

        this.setState({
            rating: '',
            feedback: ''
        }, () => e.preventDefault());
        console.log(this.state.feedback);
        e.preventDefault();
        //this.getFeedback(this.state.bookInfo);
        window.location.reload(false);
    }

    handleReadMore = () => {
        this.setState({readMore: false});
        return (
            this.displayBookDetail()
        );
    }

    handleReadLess = () => {
        this.setState({readMore: true});
        return (
            this.displayBookDetail()
        );
    }

    getCustomerFeedback = () => {
        var bookId = this.props.location.state.bookInfo.id;
        new CustomerService().getCustomerFeedback(bookId).then(response => {
            if (response.data.data[0].feedbackMessage.length > 0) {
                this.setState({feedbackLength: response.data.data[0].feedbackMessage.length});
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    displayBookDetail = () => {
        let bookDiscription = [];

        if (this.state.readMore) {
            var text = String(this.state.bookInfo.bookDetail);

            text = text.split(" ")

            bookDiscription = text.slice(0, 40).join(" ");
            return (<p>{bookDiscription}...<span className="read-more" onClick={() => {
                this.handleReadMore(this)
            }}>Read More</span></p>)
        }

        if (!this.state.readMore) {
            bookDiscription = this.state.bookInfo.bookDetail;
            return (<p>{bookDiscription}<span className="read-more" onClick={() => {
                this.handleReadLess(this)
            }}>Read Less</span></p>)
        }
    }
    calculateRating = () => {
        // alert(this.feedbacks)
        // this.setState({
        //     rating: this.state.feedbacks.reduce(function (rating, feedbackData) {
        //         return rating + feedbackData.rating
        //     }, 0)
        //     ,aggregateRating:this.state.rating/this.feedbacks.length})

    }

    render() {
        const isAdminPage = localStorage.getItem('adminToken') !== null;
        let displayFeedback;
        if (this.state.feedbacks.length > 0) {
            displayFeedback = this.state.feedbacks.map(iteam => {

                return (
                    <div className="product-feedback-container">
                        <div style={{display: "flex"}}>
                            <div className="customer-profile-icon">
                            <span className="customer-profile-icon-content">
                                {iteam.userName.substr(0, 1).toUpperCase()}
                            </span>
                            </div>
                            <div className="customer-feedback-name">
                                <span className="product-review-book-name-size">
                                    {iteam.userName}
                                </span>
                            </div>
                        </div>
                        <Rating name="simple-controlled" value={iteam.rating} readOnly="true"
                                className="product-customer-rating"/>
                        <p className="product-feedback ">
                            {iteam.feedbackMessage}
                        </p>
                    </div>

                );
            });
        }

        if (this.state.feedbacks.length === 0) {
            displayFeedback = <div className="product-feedback-container product-feedback"><span>No review available for this book</span>
            </div>
        }
        let feedbackForm = [];
        if (localStorage.getItem("userToken") !== null) {
            feedbackForm =
                <div className="customer-feedback-form product-review-font">
                    <span className="product-review-bookdetail-size">Overall rating</span>
                    <Rating
                        name="rating"
                        value={this.state.rating}
                        onChange={this.handleChange.bind(this, 'rating')}
                    />
                    <ThemeProvider>
                        <TextField
                            id="outlined-multiline-static"
                            label="Comment"
                            multiline
                            color="secondary"
                            name="feedback"
                            rows={4}
                            onChange={this.handleChange.bind(this, 'feedback')}
                            variant="outlined"
                            style={{width: "92.5%", backgroundColor: "white"}}
                        />
                    </ThemeProvider>
                    <div className="product-feedback-button-container">
                        <Button id="productfeedbackbutton" onClick={e => this.addFeedback(e)}>Submit</Button>
                    </div>
                </div>

        }
        if (this.state.feedbackLength > 0 || isAdminPage) {
            feedbackForm = [];
        }

        return (
            <div>
                <div className="ProductReviewMainDiv">
                <NavigationBar/>
                <div className="orderTitle">
                    <Breadcrumbs aria-label="breadcrumb" id="breadcrumb">
                        <Link color="inherit" href={isAdminPage ? "/admin" : "/"}>
                            Home
                        </Link>
                        <Typography color="textPrimary">Comments</Typography>
                    </Breadcrumbs>
                </div>
                <div className="product-review-main">
                    <div className="product-review-product-info">
                        <div id="productreviewimage">
                            <img style={{height: "100%", width: "100%"}}
                                 src={`${this.state.bookInfo.bookImageSrc}`}
                                 alt="book"/>
                        </div>
                        <div className="product-info">
                            < div className="product-review-book-info">
                                <div style={{
                                    height: "150px",
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    flexDirection: "column"
                                }}>
                                    <span className="product-review-book-name product-review-font">
                                        {this.state.bookInfo.bookName}
                                    </span>
                                    <span className="product-review-author-name product-review-font">by
                                        {" " + this.state.bookInfo.authorName}
                                    </span>
                                    {
                                        this.state.averageRating.toString() !== "NaN" && <div className="product-rating">
                                        <span
                                            className="product-rating-count product-review-font">{this.state.averageRating}</span>
                                            <div className="product-review-rating-icon product-review-font"><StarIcon
                                                id="iconSize"/></div>
                                        </div>
                                    }
                                    <span className="product-review-book-price product-review-font">Rs.
                                        {this.state.bookInfo.bookPrice}
                                    </span>
                                </div>
                                <Divider/>
                                <span className="product-review-bookdetail product-review-font">Book Description:</span>
                                <p className="product-review-bookdetail-size product-review-font">
                                    {this.displayBookDetail()}
                                </p>
                                <Divider/>
                                <span className="customer-feedback product-review-font">Customer Review</span>
                                {feedbackForm}
                            </div>
                            {displayFeedback}
                        </div>
                    </div>
                </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
