import {CardMedia, Typography} from "@material-ui/core";
import React, {Fragment} from 'react';
import "../../css/OrderSummary.css"

export default class OrderSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qValue: 1,
        };
    }

    render() {
        return (
            <Fragment>
                <div className="orderDisplayCart">
                    <CardMedia className="orderImageCart"
                               component="img"
                               image={this.props.bookDetails.book.bookImageSrc}
                               title={this.props.bookDetails.book.bookName}
                    />
                    <div className="orderDetails">
                        <Typography component="h2" className="orderBookName">
                            {this.props.bookDetails.book.bookName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" className="orderAuthorName">
                            by {this.props.bookDetails.book.authorName}
                        </Typography>
                        <Typography component="h2" className="orderQuantity">
                            Quantity {this.props.quantity}
                        </Typography>
                        <Typography component="h2"
                                    className="orderPrice"
                        >
                            Rs {this.props.bookDetails.book.bookPrice*this.props.quantity}
                        </Typography>
                    </div>
                </div>
            </Fragment>
        )
    }
};