import React, {Component} from "react";
import "../../css/HomePage.css";
import "../../css/scrollbar.css";
import Grid from "@material-ui/core/Grid";
import HomepagePlaceHolder from "./HomepagePlaceHolder";

export default class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        };
    }

    render() {
        return (
            <Grid container spacing={4}>
                {this.state.bookList.map(id =>
                    <Grid alignItems="center" key={id.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <HomepagePlaceHolder/>
                    </Grid>
                )}
            </Grid>
        );
    }
}

