import React, {Component} from "react";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

export default class CustomSnackBar extends Component {

    render() {
        return (
            <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} open={this.props.alertShow}
                      autoHideDuration={6000} onClose={this.props.closeAlertBox}>
                <Alert style={{backgroundColor: "#1f1f1f"}}
                       onClose={this.props.closeAlertBox} severity={this.props.severity}
                       variant={"filled"}>
                    {this.props.alertResponse}
                </Alert>
            </Snackbar>
        );
    }
}