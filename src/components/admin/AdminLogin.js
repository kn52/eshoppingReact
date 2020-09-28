import React, {Component, Fragment} from "react";
import NavigationBar from "../utils/NavigationBar";
import Signin from "../user/Signin";
import "../../css/AdminLogin.css";
import Card from "@material-ui/core/Card";
import Footer from "../utils/Footer";
import CustomSnackBar from "../utils/CustomSnackBar";

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: "",
            severity: "",
            alertShow: "",
            alertResponse: "",
        }
    }

    showAlert = (severity, alertShow, alertResponse) => {
        this.setState({
            severity: severity,
            alertShow: alertShow,
            alertResponse: alertResponse
        })
    };

    handlePasswordVisibility = (obj) => {
        obj = document.getElementById('password');
        if (obj.type === "password") {
            obj.type = "text";
            this.setState({
                isVisible: true,
            });
        } else {
            obj.type = "password";
            this.setState({
                isVisible: false,
            });
        }
    };
    closeAlertBox = () => {
        this.setState({alertShow: false});
    };

    render() {
        return (
            <Fragment>
                <div className="AdminLoginMainDiv">
                    <NavigationBar/>
                    <CustomSnackBar alertShow={this.state.alertShow}
                                    severity={this.state.severity}
                                    alertResponse={this.state.alertResponse}
                                    closeAlertBox={this.closeAlertBox}/>
                    <Card className="adminLogin">
                        <div className="adminLabel">Admin Login</div>
                        <div className="adminSignUp">
                            <Signin showAlert={this.showAlert} isVisible={this.state.isVisible}
                                    handlePasswordVisibility={this.handlePasswordVisibility}/>
                        </div>
                    </Card>
                </div>
                <Footer/>
            </Fragment>
        )
    }
}

export default AdminLogin;