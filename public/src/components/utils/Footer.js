import Typography from "@material-ui/core/Typography";
import React, {Component} from "react";

export default class Footer extends Component {
    render() {
        return (
            <footer id="footer">
                <Typography id="footer-font">
                    &copy; Copyright {new Date().getFullYear()} - {new Date().getFullYear() + 1} , The e BookStore
                    Pvt
                    Ltd.
                </Typography>
            </footer>
        );
    }
}

