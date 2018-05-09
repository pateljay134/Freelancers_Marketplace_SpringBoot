

import React from 'react';
import './css/freelancer.css';
import './css/bootstrap.min.css';
import './css/main.css';
import './css/util.css';
// import DisplayProjects from './displayprojects';
import axios from 'axios';
import Homepage from './homepage';
import ProjectData from './projectdata'
// import 'https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900';
// import 'https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i';
import './css/one-page-wonder.min.css';
//import { debug } from 'util';


class AddBid extends React.Component{
    constructor(props) {
        super(props);
        this.state = {days: null, usd: null, project_id : null, project_name : null, description : null, skills : null, employer : null, budget_range : null, total_bids : null}
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDays = this.handleDays.bind(this);
        this.handleUSD = this.handleUSD.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        // var data_inserted;
        var val = {project_id : this.state.project_id, days: this.state.days, usd : this.state.usd, employer : this.state, bidder_name: window.sessionStorage.getItem("username")}
        axios.post('http://localhost:8080/project/addbid', val)
        .then(res => {
            debugger
            var bid_added = res.data.bid_added;
            if(bid_added){
                window.location.href = 'http://localhost:3000/Dashboard';
            }
        });
    }

    handleDays(e){
        this.setState({
            days : e.target.value
        })
    }

    handleUSD(e){
        this.setState({
            usd : e.target.value
        })
    }

    componentDidMount() {
        var project_details = { project_id : window.sessionStorage.getItem("project_id")}
        debugger
        axios.post('http://localhost:8080/project/projectfetch', project_details)
        .then(res => {
            debugger
            this.setState({
                project_id : res.data.rows.project_id,
                project_name : res.data.rows.title,
                description : res.data.rows.description,
                skills : res.data.rows.skills_required,
                employer : res.data.rows.employer,
                budget_range : res.data.rows.budget_range,
                total_bids : res.data.rows.total_bids
            })
        });
    }

	render(){
        debugger
        if(window.sessionStorage.logged_in !== null ){
            debugger
		return(
            <div className="limiter">
		        <div className="container-login100">
			        <div className="wrap-login100 p-t-50 p-b-90">
				        <form method = "POST" className="login100-form validate-form flex-sb flex-w">
					        <span className="login100-form-title p-b-51"> Project Details</span>
                           <ProjectData/>
                            {/* <div className="flex-sb-m w-full p-t-3 p-b-24">
                                <div>
                                    <a href="#" onClick = {this.handleClick} className="txt1">
                                        Update Profile ?
                                    </a>
                                </div>
                            </div> */}
					        <span className="login100-form-title p-b-51"> Bid for the Project</span>
                            <div className="wrap-input100 validate-input m-b-16" >
                                <input className="input100" type="number" name="skills" onChange = {this.handleDays} placeholder="Days" required/>
                                <span className="focus-input100"></span>
                            </div>
                            <div className="wrap-input100 validate-input m-b-16" >
                                <input className="input100" type="number" name="skills" onChange = {this.handleUSD} placeholder="USD/hour" required />
                                <span className="focus-input100"></span>
                            </div>

                            <div className="container-login100-form-btn m-t-17">
                                <input type="submit" className="login100-form-btn" value="Submit Bid" onClick = {this.handleSubmit}/>
                            </div>

				        </form>
			        </div>
		        </div>
	        </div>
        )
    } else{
        return(
            <Homepage/>
        )
    }}
}

export default AddBid;
