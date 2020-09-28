import React, {Component, Fragment} from "react";
import "../../css/ForgetPass.css";
import UserService from "../../services/UserService";
import {withRouter} from "react-router";
import SendEmailLink from "../utils/SendEmailLink";
import CustomSnackBar from "../utils/CustomSnackBar";
import Footer from "../utils/Footer";

class VerifyEmail extends Component {

    constructor() {
        super();
        this.state = {
            alertShow: false,
            alertResponse: "",
            isEmailVerified: false,
            isVerificationEmailSent: false,
            loaded: false
        };
    }

    componentDidMount() {
        this.verifyEmail()
    }

    verifyEmail = () => {
        new UserService().verifyEmail(this.props.location.search).then((response) => {
            console.log(response.data);
            console.log("check" + response.data.message)
            if (response.data.message !== "Token Expired") {
                this.setState({
                    alertShow: true,
                    alertResponse: response.data.message,
                    isEmailVerified: true,
                });
            } else {
                this.setState({
                    alertShow: true,
                    alertResponse: response.data.message
                });
            }
        });
        setTimeout(() => {
            this.setState({
                loaded: true
            });
        }, 1000)
    };

    sendVerificationEmail = (emailId) => {
        new UserService().sendEmailWithTokenLink(emailId).then((response) => {
            console.log(response.data);
            if (response.status === 200) {
                this.setState({
                    alertShow: true,
                    alertResponse: response.data.message,
                    isVerificationEmailSent: true
                });
            } else {
                this.setState({
                    alertShow: true,
                    alertResponse: response.data.message
                });
            }
        });
    };
    closeAlertBox = () => {
        this.setState({alertShow: false});
    };

    render() {
        return (
            <Fragment>
                <div className="WishListMainDiv">
                <CustomSnackBar alertShow={this.state.alertShow}
                                severity={this.state.severity}
                                alertResponse={this.state.alertResponse}
                                closeAlertBox={this.closeAlertBox}/>
                {this.state.loaded !== false &&
                <SendEmailLink title="Verify Email"
                               subTitle="to verify your email" mainButtonName="Resend Email"
                               isVerificationLinkSend={this.state.isVerificationEmailSent}
                               isEmailVerified={this.state.isEmailVerified}
                               responseMessage={this.state.alertResponse}
                               sendData={this.sendVerificationEmail}/>
                }
                </div>
                <Footer/>
            </Fragment>
        )
    };
}

export default withRouter(VerifyEmail)