import React from 'react';
import './css/freelancer.css';
import './css/bootstrap.min.css';
import './css/main.css';
import './css/util.css';
import './css/one-page-wonder.min.css';
import axios from 'axios';

class DisplayProjectDetails extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
        this.handleClick = this.handleClick.bind(this);
        this.handleLinkClick = this.handleLinkClick.bind(this);
    }
    handleLinkClick(e){
        // debugger
        // var profile = {username :this.props.bidder_name}
        // axios.post('http://localhost:8080/bidderfetch',profile)
        // .then(res => {
            debugger
            window.sessionStorage.setItem("bidderprofilename", this.props.bidder_name)
            debugger
            window.sessionStorage.setItem("bidderprofile", true)
            window.location.href = "http://localhost:3000/Profile"
        // });
    }
    handleClick(e){
        debugger
        var bidder_name = {bidder_name : e.target.value, project_id : window.sessionStorage.getItem("project_id")}
        axios.post('http://localhost:8080/bid/hirebidder',bidder_name)
        .then(res => {
            debugger
            window.location.href = "http://localhost:3000/adminaction"
        });
    }
	render(){
        return (
            <tr >
            <td >{this.props.bid_id}</td>
            <td >{this.props.days}</td>
            <td >{this.props.usd}</td>
            <td ><a href="#" style={{color:'blue'}} onClick = {this.handleLinkClick}>{this.props.bidder_name}</a></td>
            <button className="login100-form-btn-bid" value  = {this.props.bidder_name} onClick = {this.handleClick}>Hire Bidder</button> 
            </tr>
        )
    }
}

export default DisplayProjectDetails;
