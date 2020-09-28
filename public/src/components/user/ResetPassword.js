import React, {Component, Fragment} from "react";
import "../../css/ForgetPass.css";
import UserService from "../../services/UserService";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CustomSnackBar from "../utils/CustomSnackBar";
import "../../css/ResetPassword.css";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import DialogBoxPage from "../utils/CustomDialogBox";
import NavigationBar from "../utils/NavigationBar";
import Footer from "../utils/Footer";
import {IconButton, InputAdornment} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";

export default class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: "",
            passwordError: " ",

            confirmPassword: "",
            confirmPasswordError: " ",

            alertShow: false,
            alertResponse: "",
            responseStatus: false,
            passwordIsVisible: false,
            confirmPasswordIsVisible: false,

            isPasswordReset: false,
            isDialogBoxVisible: false,
            showProgress: false,
        };
    }

    isFormFilled = () => {
        return this.state.password.length > 0 && this.state.passwordError.trim().length === 0
            && this.state.confirmPasswordError.trim().length === 0 && this.state.confirmPassword.length > 0;
    }

    showLogin = () => {
        this.setState({
            isDialogBoxVisible: true
        })
    }
    setNewPassword = () => {
        const newPassword = {
            password: this.state.password,
        };
        new UserService().setNewPassword(newPassword, this.props.location.search).then((response) => {
            console.log(response.data);
            this.setState({
                showProgress: true,
            })
            if (response.status === 200) {
                this.setState({
                    alertShow: true,
                    alertResponse: response.data.message,
                    responseStatus: true,
                    isPasswordReset: true,
                    //  isDialogBoxVisible:true
                });
            } else {
                this.setState({
                    alertShow: true,
                    alertResponse: response.data.message,
                    showProgress: false
                });
            }
        });
    };

    setValue = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    confirmPasswordValidation(event) {
        if (event.target.value !== this.state.password || event.target.value.trim() === "") {
            this.setState({
                [event.target.id + "Error"]: "Password Not Match",
            });
            if (!event.target.value.match("^((?=[^@|#|&|%|$]*[@|&|#|%|$][^@|#|&|%|$]*$)*(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9#@$?]{8,})$"))
                this.setState({
                    [event.target.id + "Error"]: "Please enter valid password",
                });
        } else {
            this.setState({
                [event.target.id + "Error"]: " ",
            });
        }
    }

    handlePasswordVisibility = (value) => {
        const obj = document.getElementById(value);
        if (obj.type === "password") {
            obj.type = "text";
            this.setState({
                [value + "IsVisible"]: true,
            });
        } else {
            obj.type = "password";
            this.setState({
                [value + "IsVisible"]: false,
            });
        }
    }

    validation = (event, pattern, message) => {
        console.log(event.target.value)
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

    closeAlertBox = () => {
        this.setState({alertShow: false});
    };
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
                <div className="ResetPasswordMainDiv">
                    <NavigationBar/>
                    <div style={{marginTop: "100px"}}>
                        <CustomSnackBar alertShow={this.state.alertShow}
                                        severity={this.state.severity}
                                        alertResponse={this.state.alertResponse}
                                        closeAlertBox={this.closeAlertBox}/>
                        <ThemeProvider theme={theme}>
                            <Grid container spacing={1} >
                                <DialogBoxPage isDialogBoxVisible={this.state.isDialogBoxVisible}
                                               close={this.dialogBoxClose}/>
                                {this.state.isPasswordReset &&
                                <Grid container spacing={1} style={{paddingTop: "80px"}}>
                                    <Grid item xs={12}>
                                        <img height="150px" width="150px"
                                             src={require("../../assets/images/successcheck.png")} alt="success"/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <h4>
                                            Password Reset Successfully !
                                        </h4>
                                    </Grid>
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
                                </Grid>
                                }
                                {!this.state.isPasswordReset &&
                                <Grid id="resetContainer" item xs={12} sm={12} md={12}>
                                    <Typography>
                                        <b id="resetText">Reset Password</b>
                                    </Typography>
                                </Grid>}
                                {!this.state.isPasswordReset &&
                                <Paper id="paper" elevation={4} position="static" color="default"
                                       style={{marginTop: "2%",height:"fit-content"}}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Typography id="message" variant="subtitle1"
                                                    style={{marginBottom: "2%", color: "grey", textAlign: "left"}}>
                                            Enter New Password
                                            To Reset Your Password.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <TextField
                                            type="password"
                                            variant="outlined"
                                            id="password"
                                            label="Password"
                                            fullWidth="true"
                                            autoFocus
                                            value={this.state.password}
                                            onChange={textEvent => this.setValue(textEvent)}
                                            onBlur={textEvent => this.validation(textEvent, "^((?=[^@|#|&|%|$]*[@|&|#|%|$][^@|#|&|%|$]*$)*(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9#@$?]{8,})$", "Please enter valid password")}
                                            error={this.state.passwordError.trim().length !== 0}
                                            helperText={this.state.passwordError}
                                            required
                                            InputProps={{ // <-- This is where the toggle button is added.
                                                endAdornment: (
                                                    <InputAdornment id="PasswordVisiblity" position="end">
                                                        <IconButton id="PasswordVisiblity"
                                                                    aria-label="toggle password visibility"
                                                                    onClick={e => this.handlePasswordVisibility("password")}
                                                        >
                                                            {this.state.passwordIsVisible ? <Visibility/> :
                                                                <VisibilityOff/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}/>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <TextField
                                            type="password"
                                            variant="outlined"
                                            label="Confirm Password"
                                            id="confirmPassword"
                                            fullWidth="true"
                                            value={this.state.confirmPassword}
                                            onChange={this.setValue}
                                            onBlur={textEvent => this.confirmPasswordValidation(textEvent)}
                                            error={this.state.confirmPasswordError.trim().length !== 0}
                                            helperText={this.state.confirmPasswordError}
                                            required InputProps={{ // <-- This is where the toggle button is added.
                                            endAdornment: (
                                                <InputAdornment id="PasswordVisiblity" position="end">
                                                    <IconButton id="PasswordVisiblity"
                                                                aria-label="toggle password visibility"
                                                                onClick={e => this.handlePasswordVisibility("confirmPassword")}
                                                    >
                                                        {this.state.confirmPasswordIsVisible ? <Visibility/> :
                                                            <VisibilityOff/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}/>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Button
                                            size="large"
                                            color="inherit"
                                            fullWidth="true"
                                            onClick={this.setNewPassword}
                                            disabled={!this.isFormFilled()}
                                            style=
                                                {this.isFormFilled() === false ? {
                                                    background: "#E0E0E0",
                                                    color: "black",
                                                    marginTop: "15px"
                                                } : {
                                                    background: "#b90f4b",
                                                    color: "white",
                                                    marginTop: "15px"
                                                }}
                                        >
                                            Reset Password
                                        </Button>
                                    </Grid>
                                </Paper>
                                }
                            </Grid>
                        </ThemeProvider>
                    </div>
                </div>
                <Footer/>
            </Fragment>
        )
    };
}
