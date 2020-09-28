import React, {Component, Fragment} from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import "../../css/ForgetPass.css";
import TextField from "@material-ui/core/TextField";
import {withRouter} from "react-router";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import DialogBoxPage from "./CustomDialogBox";
import NavigationBar from "./NavigationBar";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

class SendEmailLink extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alertShow: false,
            cEmail: "",
            cEmailError: " ",
            isDialogBoxVisible: false,
            showProgress: false,
        };
    }

    handleChange = ({target}) => {
        this.setState({
            [target.id]: target.value,
        });
    };

    validation = (event, pattern, message) => {
        if (event.target.value.match(pattern)) {
            this.setState({
                [event.target.id + "Error"]: " ",
            });
        } else {
            this.setState({
                [event.target.id + "Error"]: message
            })
        }
    };

    showLogin = () => {
        this.setState({
            isDialogBoxVisible: true
        })
    }

    resetPassword = () => {
        if (this.state.cEmailError.trim().length === 0 && this.state.cEmail.length > 0) {
            this.setState({
                showProgress: true,
            })
            return this.props.sendData(this.state.cEmail)
        }
        this.setState({
            cEmailError: "Enter Email Address",
        })
    }
    dialogBoxClose = () => {
        this.setState({
            isDialogBoxVisible: false,
        })
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
                <NavigationBar/>
                <div style={{paddingTop: "3%"}}>
                    <DialogBoxPage isDialogBoxVisible={this.state.isDialogBoxVisible} close={this.dialogBoxClose}/>
                    {(this.state.showProgress && !(this.props.isVerificationLinkSend || this.props.isEmailVerified)) &&
                    <div style={{padding: "150px", justifyContent: "center", justifyItems: "center"}}>
                        <Loader
                            type="ThreeDots"
                            color="#b90f4b"
                            height={60}
                            width={100}
                            timeout={50000} //8 secs
                        />
                        <div style={{display: "flex", justifyContent: "center", justifyItems: "center"}}>
                            <Typography id="message" variant="subtitle1"
                                        style={{margin: "2%", color: "grey", textAlign: "left"}}>
                                Wait while we are processing your request...
                            </Typography>
                            {/*<CircularProgress color="secondary" />*/}
                        </div>
                    </div>
                    }
                    {(this.props.isVerificationLinkSend || this.props.isEmailVerified) &&
                    <Grid container spacing={0} style={{paddingTop: "80px"}}>
                        <Grid item xs={12}>
                            <img height="150px" width="150px" src={require("../../assets/images/successcheck.png")}
                                 alt="success"/>
                        </Grid>
                        <Grid item xs={12}>
                            <h4>
                                {/*Verification Email Has Been sent Please Check Your Email Inbox !*/}
                                {this.props.responseMessage.includes("Verified")?<b>{this.props.responseMessage } Please Login</b>:<b>{ this.props.responseMessage } Please Check Your Email Inbox</b>}
                            </h4>
                        </Grid>
                        {this.props.isEmailVerified &&
                        <Grid item xs={12} sm={12} md={12}>
                            <Button
                                size="large"
                                color="inherit"
                                onClick={this.showLogin}
                                style={{
                                    background: "#b90f4b",
                                    color: "white",
                                    marginTop: "5%",
                                    marginBottom: "2%",
                                    padding: "17px",
                                    height: '10%'
                                }}
                            >
                                User Login
                            </Button>
                        </Grid>
                        }
                    </Grid>
                    }
                    {(!this.state.showProgress && !(this.props.isVerificationLinkSend || this.props.isEmailVerified)) &&
                    <Grid id="resetContainer" spacing={0} style={{marginTop:"10vh"}}>
                        <Grid item xs={12} sm={12} md={12}>
                            <Typography>
                                <b id="resetText">{this.props.title}</b>
                            </Typography>
                        </Grid>
                        <Paper id="paper" elevation={4} position="static" color="default"
                               style={{marginTop: "2%", height: "fit-content"}}>
                            <Grid item xs={12} sm={12} md={12}>
                                <Typography id="message" variant="subtitle1"
                                            style={{marginBottom: "2%", color: "grey", textAlign: "left"}}>
                                    Enter your email address and we'll send you
                                    a link to {this.props.subTitle}.
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12}>
                                <ThemeProvider theme={theme}>

                                    <TextField
                                        variant="outlined"
                                        id="cEmail"
                                        label="Email"
                                        fullWidth="true"
                                        style={{height: '50%'}}
                                        value={this.state.cEmail}
                                        onChange={this.handleChange}
                                        onBlur={textEvent => this.validation(textEvent, "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$", "Please enter valid email address")}
                                        error={this.state.cEmailError.trim().length !== 0}
                                        helperText={this.state.cEmailError}
                                        required/>
                                </ThemeProvider>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Button
                                    size="large"
                                    color="inherit"
                                    fullWidth="true"
                                    onClick={this.resetPassword}
                                    style={{
                                        background: "#b90f4b",
                                        color: "white",
                                        marginTop: "5%",
                                        marginBottom: "2%",
                                        padding: "3.5%",
                                        height: '10%'
                                    }}
                                >
                                    {this.props.mainButtonName}
                                </Button>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12}>
                                <Button
                                    onClick={this.showLogin}
                                    size="large"
                                    color="inherit"
                                    fullWidth="true"
                                    style={{background: "#006c9e", color: "white", marginTop: "1%", padding: "3.5%"}}
                                >
                                    Create Account
                                </Button>
                            </Grid>
                        </Paper>
                    </Grid>
                    }
                </div>
            </Fragment>
        )
    };
}

export default withRouter(SendEmailLink)