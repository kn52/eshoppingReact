import React, {Component} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import Cancel from '@material-ui/icons/Cancel';
import '../../css/NavigationBar.css'
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import PersonIcon from '@material-ui/icons/Person';
import Badge from "@material-ui/core/Badge";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import PopupState, {bindPopover, bindTrigger} from 'material-ui-popup-state';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import DialogBoxPage from "./CustomDialogBox";
import {withRouter} from "react-router";
import Signup from "../user/Signup";
import bookImage from "../../assets/images/bookImage.png"

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogBoxVisible: false,
            url: "",
            width:window.innerWidth,
            open:true
        };
    }

    addNewBook = () => {
        this.props.history.push({
            pathname: '/admin/add/book',
            state: {authenticated: true}
        })
    }
    handleClickOpen = () => {
        localStorage.getItem('userToken') === null ?
            this.setState({
                isDialogBoxVisible: true,
            }) :
            this.props.history.push('/cart');
    };

    handleClose = () => {
        this.setState({
            isDialogBoxVisible: false,
        })
    };

    returnSearchTextValue = (searchText) => {
        this.props.searchedText(searchText)
    };

    logout = () => {
        if(window.location.href.includes("admin")){
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminName');
        }
        if(!window.location.href.includes("admin")){
            localStorage.removeItem('userToken');
            localStorage.removeItem('userName'); 
        }
        
        window.location.href = '/';
    }

    getSearch = (homepagePath,isAdminPage,isAdminLogin) =>{
        return (<div id="searchbar" className="search search_bar"
            style={((homepagePath === '' || isAdminPage) && !isAdminLogin) ? {visibility: "visible"} : {visibility: "hidden"}}>
            <div id="searchicon" className={(this.state.width<617)?"searchIcon search_icon"
                                                        :"searchIcon search_Icon"}>
                <SearchIcon onClick={(this.state.open && this.state.width<617) && this.openSearch.bind()}/>
            </div>
            <InputBase fullWidth
                        id="searchText"
                        placeholder=" Search"
                        className="inputRoot inputInput"
                        inputProps={{'aria-label': 'search'}}
                        onChange={(event) => this.returnSearchTextValue(event.target.value)}
            />
            { (!this.state.open) && <Cancel onClick={this.openSearch.bind(this)} 
                style={{color:"silver",margin:"1%"}}/>}
        </div>);
    }

    openSearch = () => { 
        if(this.state.open){
            document.getElementById("searchbar").className="search responsive_search_bar";
            document.getElementById("searchicon").className="searchIcon search_Icon";
        }
        if(!this.state.open){
            document.getElementById("searchbar").className="search search_bar"
            document.getElementById("searchicon").className="searchIcon search_icon";
        }
        this.setState({open:!this.state.open});
    }

    getUpdatedDimensions = () => { 
        this.setState({ width:window.innerWidth });
        if(window.innerWidth>=617){
            document.getElementById("searchbar").className="search search_bar";
            this.setState({ open:true });
        }
    }

    render() {
        const homepagePath = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        const isAdminPage = window.location.href.includes("admin");
        const isAdminLogin = window.location.href.includes("login");
        const isAddOrUpdateBookPage = window.location.href.includes("book");
        window.addEventListener('resize',this.getUpdatedDimensions);
        return (
            <AppBar id="App-header">
                <DialogBoxPage component={<Signup/>} isDialogBoxVisible={this.state.isDialogBoxVisible}
                               close={this.handleClose}/>
                <Toolbar id="toolbar">
                    <LocalLibraryIcon id="App-icon"/>
                    <Link style={{color: 'white', textDecoration: 'none'}} to={'/'}>
                        <Typography id="Headers-font">
                            e BookStore
                        </Typography>
                    </Link>
                    {/*{(!this.state.width<617) && this.getSearch(homepagePath,isAdminPage,isAdminLogin) }*/}

                    
                    <div className="grow"/>
                    <div className="shoppingCartDiv"
                        style={homepagePath === '' || isAdminPage ? {visibility: "visible"} : {visibility: "hidden"}}
                    >
                        { (this.state.width<617) && this.getSearch(homepagePath,isAdminPage,isAdminLogin) }
						{ (this.state.width<617) && <div style={{width:"25px"}}></div>}
                        {((homepagePath === "/" || homepagePath === "") && !isAdminLogin) &&
                        <IconButton id="profileIcon" aria-label="show 4 new mails" color="inherit"
                                    onClick={this.handleClickOpen}>
                            <Badge badgeContent={this.props.badgeCount} id="badge"
                                   style={{border: "2px solid #b90f4b"}}
                                   color="primary">
                                <ShoppingCartOutlinedIcon
                                    style={{fontSize: '100%', display: 'flex'}}/>
                            </Badge>
                        </IconButton>}
                        {(!isAdminLogin && !isAddOrUpdateBookPage && homepagePath !== "/" && homepagePath !== "") &&
                        <IconButton id="profileIcon" aria-label="show 4 new mails" color="inherit"
                                    onClick={this.addNewBook}>
                            <img alt={"addBookIcon"} src={bookImage} color="inherit"
                                 style={{fontSize: '100%', height: "32px", display: 'flex'}}/>
                        </IconButton>
                        }
                    </div>
                    <div className="logoutDiv"
                         style={((homepagePath === '' || isAdminPage) && !isAdminLogin) ? {visibility: "visible"} : {visibility: "hidden"}}
                    >
                        <PopupState variant="popover" popupId="demo-popup-popover">
                            {(popupState) => (
                                <div>
                                    <IconButton id="profileIcon" color="inherit">
                                        <PersonIcon variant="contained" {...bindTrigger(popupState)}>
                                        </PersonIcon>
                                    </IconButton>
                                    <Popover
                                        style={{marginTop: "38px"}}
                                        {...bindPopover(popupState)}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                    >
                                        {localStorage.length === 0 ?
                                            <div className="loginPopUp">
                                                <h6>Welcome</h6>
                                                <div style={{fontSize: '13px'}}>
                                                    {this.props.location.pathname === "/" ? "To access account and manage orders" : "Welcome Back Admin"}
                                                </div>
                                                {this.props.location.pathname === "/" &&
                                                <Button className="loginSignUp" onClick={this.handleClickOpen}>
                                                    Login/SignUp
                                                </Button>
                                                }
                                            </div> :
                                            <div className="loginPopUp">
                                                <p className="logoutTitle">Hello,{isAdminPage?localStorage.getItem('adminName'):localStorage.getItem('userName')}</p>
                                                {this.props.location.pathname === "/" &&
                                                <IconButton style={{backgroundColor: "white"}} className="myOrder"
                                                            color="inherit">
                                                    <ShoppingBasketOutlinedIcon fontSize="small"/> <b
                                                    id="listTitle"><Link to="/orders">My Orders</Link></b>
                                                </IconButton>}
                                                {this.props.location.pathname === "/" &&
                                                <IconButton style={{backgroundColor: "white"}} className="myOrder"
                                                            color="inherit">
                                                    <FavoriteBorderOutlinedIcon fontSize="small"/> <b
                                                    id="listTitle"><Link to="/wishlist">Wishlist</Link></b>
                                                </IconButton>
                                                }
                                                <Button id="logout" onClick={this.logout}>
                                                    Logout
                                                </Button>
                                            </div>}
                                    </Popover>
                                </div>
                            )}
                        </PopupState>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withRouter(NavigationBar);