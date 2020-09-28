import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import UserService from "../../services/UserService";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from "@material-ui/core/Button";
import {withRouter} from 'react-router';
import AdminService from "../../services/AdminService";
import {IconButton, InputAdornment} from "@material-ui/core";

class Signin extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            email: "",
            loginPassword: "",

            emailError: " ",
            loginPasswordError: " ",
            alertShow: false,
            alertResponse: "",
            url: this.props.location.pathname,

            isVisible: false,
            passwordState: "password",
        }
    }

    handleChange = ({target}) => {
        this.setState({
            [target.id]: target.value,
        });
    };
    handlePasswordVisibility = (obj) => {
        obj = document.getElementById('loginPassword');
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

    forgetPassword = () => {
        window.location.href = '/forget/password'
    }
    handleSubmit = () => {
        const user = {
            email: this.state.email,
            password: this.state.loginPassword,
        };
        console.log("User ", user);
        let loginService = !this.props.location.pathname.includes("admin") ? new UserService().loginUser(user) : new AdminService().adminLogin(user);
        loginService.then((response) => {
            console.log(response);
            if (response.status === 200) {
                this.props.showAlert("success", true, response.data.message)
                if (this.props.location.pathname === "admin/login" || this.props.location.pathname === "admin/login/" || this.props.location.pathname === "/admin/login") {
                    localStorage.setItem('adminToken', response.headers.authorization);
                    localStorage.setItem('adminName', response.data.data);
                } else {
                    localStorage.setItem('userToken', response.headers.authorization);
                    localStorage.setItem('userName', response.data.data);
                }
                (this.props.location.pathname === "admin/login" || this.props.location.pathname === "admin/login/" || this.props.location.pathname === "/admin/login") ?
                    this.props.history.push({
                        pathname: '/admin',
                        state: {authenticated: true}
                    }) :
                    (this.props.location.pathname.includes("verify") || this.props.location.pathname.includes("reset")) ? window.location.href = "/" :
                        window.location.href = this.props.location.pathname;
            } else {
                this.props.showAlert("error", true, response.data.message)
            }
        });
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
            <div className="logInHtml">
                <ThemeProvider theme={theme}>
                    <div className="loginContainer">
                        <div className="group1">
                            <TextField
                                error={this.state.emailError.trim().length !== 0}
                                value={this.state.email}
                                helperText={this.state.emailError}
                                onChange={this.handleChange}
                                onBlur={textEvent => this.validation(textEvent, "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$", "Please enter valid email address")}
                                id="email" label="Email Id"
                                variant="outlined"
                                fullWidth required autoComplete="off" name="email"/>
                        </div>
                        <div className="password">
                            <TextField error={this.state.loginPasswordError.trim().length !== 0}
                                       value={this.state.loginPassword}
                                       helperText={this.state.loginPasswordError}
                                       onChange={this.handleChange}
                                       className="password"
                                       onBlur={textEvent => this.validation(textEvent, "^((?=[^@|#|&|%|$]*[@|&|#|%|$][^@|#|&|%|$]*$)*(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9#@$?]{8,})$", "Please enter valid password")}
                                       id="loginPassword" label="Password"
                                       type="password" variant="outlined"
                                       fullWidth required autoComplete="off" name="password"
                                       InputProps={{ // <-- This is where the toggle button is added.
                                           endAdornment: (
                                               <InputAdornment id="PasswordVisiblity" position="end">
                                                   <IconButton id="PasswordVisiblity"
                                                               aria-label="toggle password visibility"
                                                               onClick={this.handlePasswordVisibility}
                                                   >
                                                       {this.state.isVisible ? <Visibility/> : <VisibilityOff/>}
                                                   </IconButton>
                                               </InputAdornment>
                                           )
                                       }}
                            />
                        </div>
                        <div className="forgetPassword">
                            <p style={{margin: "2px", position: "absolute", cursor: "pointer"}}
                               onClick={this.forgetPassword}> Forget
                                Password</p>
                        </div>
                        <div className="group1">
                            <Button className="loginButton" variant="contained" onClick={this.handleSubmit}>Login
                            </Button>
                        </div>
                    </div>
                </ThemeProvider>
            </div>
        );
    }
}

export default withRouter(Signin);