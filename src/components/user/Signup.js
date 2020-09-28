import React, {Component, Fragment} from 'react';
import '../../css/LoginPage.css'
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import Signin from "./Signin";
import UserService from "../../services/UserService";
import Button from "@material-ui/core/Button";
import CustomSnackBar from "../utils/CustomSnackBar";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Loader from "react-loader-spinner";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {IconButton, InputAdornment} from "@material-ui/core";

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            fullname: "",
            phoneNumber: "",

            emailError: " ",
            passwordError: " ",
            fullnameError: " ",
            phoneNumberError: " ",

            loginChecked: true,
            signupChecked: false,

            alertShow: false,
            alertResponse: "",
            isVisible: false,
            passwordState: "password",

            showProgress: false,
        }
    };

    handleChange = ({target}) => {
        this.setState({
            [target.id]: target.value,
        });
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

    handleSubmit = () => {
        this.setState({
            showProgress: true
        })
        const user = {
            email: this.state.email,
            password: this.state.password,
            fullName: this.state.fullname,
            phoneNo: this.state.phoneNumber,
            status: false,
        };

        console.log("User ", user);
        new UserService().registerUser(user).then((response) => {
            console.log(response);
            if (response.status === 200) {
                this.setState({
                    severity: "success",
                    alertShow: true,
                    alertResponse: response.data.message,
                    showProgress: false,
                    loginChecked: true,
                    signupChecked: false,
                });
                this.clearFieldsData();
            } else {
                this.setState({
                    severity: "error",
                    alertShow: true,
                    showProgress: false,
                    alertResponse: response.data.message
                });
            }
        });
    }

    handlePasswordVisibility = (obj) => {
        obj = document.getElementById('password');
        if (obj.type === "password") {
            obj.type = "text";
            this.setState({
                isVisible: true,
                passwordState: "text",
            });
        } else {
            obj.type = "password";
            this.setState({
                isVisible: false,
                passwordState: "password",
            });
        }
    };

    clearFieldsData = () => {
        this.setState({
            fullname: "",
            email: "",
            password: "",
            phoneNumber: "",
        });
    };

    handleTabSelection = ({target}) => {
        if ([target.name].toString() === "login") {
            this.setState({loginChecked: true, signupChecked: false})
        }
        if ([target.name].toString() === "signup") {
            this.setState({loginChecked: false, signupChecked: true})
        }
    }
    closeAlertBox = () => {
        this.setState({alertShow: false});
    };
    showAlert = (severity, alertShow, alertResponse) => {
        this.setState({
            severity: severity,
            alertShow: alertShow,
            alertResponse: alertResponse
        })
    }

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
                <CustomSnackBar alertShow={this.state.alertShow}
                                severity={this.state.severity}
                                alertResponse={this.state.alertResponse}
                                closeAlertBox={this.closeAlertBox}/>
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
                <div className="hero" id="mainContainer">
                    <Card className="formBox"
                          style={{marginTop: '6%', borderRadius: "5%", backgroundColor: " #f2f2f2"}}>
                        <img alt="BookStore Login" src={require('../../assets/images/Login.png')}
                             className="loginImage"/>
                        <div style={{marginLeft: "112px", marginTop: "3%"}}>
                            <h3 style={{marginLeft: '1%', fontWeight: "bold"}}>
                                e BOOKSTORE
                            </h3>
                        </div>
                    </Card>


                    <Card className="loginBox"
                          style={{marginTop: '3%', borderRadius: "2%", boxShadow: "0 8px 16px 0 rgba(0,0,0,0.5)"}}>
                        <div className="loginWrap">
                            <div className="loginHtml">

                                <input id="tab-1" type="radio" name="login" className="LogIn"
                                       checked={this.state.loginChecked} onClick={this.handleTabSelection}/><label
                                htmlFor="tab-1" className="tab1">Login</label>

                                <input id="tab-2" type="radio" name="signup" className="signUp"
                                       checked={this.state.signupChecked} onClick={this.handleTabSelection}/>
                                <label htmlFor="tab-2" className="tab2">SignUp</label>

                                <div className="loginForm">
                                    <Signin showAlert={this.showAlert} isVisible={this.state.isVisible}
                                            handlePasswordVisibility={this.handlePasswordVisibility}/>
                                    <div className="signUpHtml">
                                        <ThemeProvider theme={theme}>
                                            <div className="group1">
                                                <TextField error={this.state.fullnameError.trim().length !== 0}
                                                           value={this.state.fullname}
                                                           helperText={this.state.fullnameError}
                                                           onChange={this.handleChange}
                                                           onBlur={textEvent => this.validation(textEvent, "^.{3,50}$", "Please enter valid name")}
                                                           id="fullname" label="Full Name"
                                                           variant="outlined"
                                                           fullWidth required autoComplete="off"
                                                           name="fullName"/>
                                            </div>
                                            <div className="group1">
                                                <TextField error={this.state.emailError.trim().length !== 0}
                                                           value={this.state.email}
                                                           helperText={this.state.emailError}
                                                           onChange={this.handleChange}
                                                           onBlur={textEvent => this.validation(textEvent, "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$", "Please enter valid email address")}
                                                           id="email" label="Email Id"
                                                           variant="outlined" fullWidth required
                                                           autoComplete="off" name="email"/>
                                            </div>
                                            <div className="password">
                                                <TextField error={this.state.passwordError.trim().length !== 0}
                                                           value={this.state.password}
                                                           helperText={this.state.passwordError}
                                                           onChange={this.handleChange}
                                                           className="password"
                                                           onBlur={textEvent => this.validation(textEvent, "^((?=[^@|#|&|%|$]*[@|&|#|%|$][^@|#|&|%|$]*$)*(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9#@$?]{8,})$", "Please enter valid password")}
                                                           id="password" label="Password"
                                                           type={this.state.passwordState} variant="outlined"
                                                           fullWidth required autoComplete="off" name="password"
                                                           InputProps={{ // <-- This is where the toggle button is added.
                                                               endAdornment: (
                                                                   <InputAdornment id="PasswordVisiblity" position="end">
                                                                       <IconButton id="PasswordVisiblity"
                                                                           aria-label="toggle password visibility"
                                                                           onClick={this.handlePasswordVisibility}
                                                                       >
                                                                           {this.state.isVisible ? <Visibility/> :
                                                                               <VisibilityOff/>}
                                                                       </IconButton>
                                                                   </InputAdornment>
                                                               )
                                                           }}
                                                />
                                            </div>
                                            <div className="group1">
                                                <TextField error={this.state.phoneNumberError.trim().length !== 0}
                                                           value={this.state.phoneNumber}
                                                           helperText={this.state.phoneNumberError}
                                                           onChange={this.handleChange}
                                                           onBlur={textEvent => this.validation(textEvent, "^([6-9]{1}[0-9]{9})$", "Please enter valid phone number")}
                                                           id="phoneNumber" label="Phone Number"
                                                           variant="outlined" fullWidth required
                                                           autoComplete="off" name="phoneNumber"/>
                                            </div>
                                            <div className="group1">
                                                <Button className="loginButton" onClick={this.handleSubmit}>Sign
                                                    Up
                                                </Button>
                                            </div>
                                        </ThemeProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                    {/*</div>*/}
                </div>
            </Fragment>
        );
    }
}

export default Signup;
