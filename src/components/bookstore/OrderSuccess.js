import React, {Fragment} from "react";
import NavigationBar from "../utils/NavigationBar";
import "../../css/OrderSuccess.css"
import Button from "@material-ui/core/Button";
import Footer from "../utils/Footer";

export default class UpdateBook extends React.Component {
    constructor(props) {
        super(props);
        this.props.location.state === undefined ?
            window.location.href = '/'
            :
            console.log(this.props.location.state.orderId);
    }

    render() {
        const email = "admin@ebookstore.com";
        const mobileNumber = "9876543210";
        const address = "Malhotra Chambers,Govandi East,Mumbai,Maharashtra 400088";
        return (
            <Fragment>
                <div className="WishListMainDiv">
                    <NavigationBar/>
                    <img id="orderImage"
                         src={require(`../../assets/images/OrderSuccess.png`)}
                         alt={"OrderSuccess"}/>
                    <div className="orderMessage">
                        hurray!!! your order is confirmed the order id is
                        <b> #{this.props.location.state.orderId}</b> save the order id
                        for further communication...
                    </div>
                    <table className="orderTable">
                        <thead>
                        <tr className="tableRow">
                            <th>Email Us</th>
                            <th>Contact Us</th>
                            <th>Address</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="tableRow">
                            <td data-for='emailId'>{email}
                            </td>
                            <td data-for='mobileNumber'>{mobileNumber}
                            </td>
                            <td data-for='address'> {address}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <Button href={"/"} className="orderButton">Continue Shopping</Button>
                </div>
                <Footer/>
            </Fragment>
        );
    }
}
