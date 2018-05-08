import React from 'react';
import './css/freelancer.css';
import './css/bootstrap.min.css';
import './css/main.css';
import './css/util.css';
import axios from 'axios';
// import 'https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900';
// import 'https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i';
import './css/one-page-wonder.min.css';
//import { debug } from 'util';

class AddProject extends React.Component{
    constructor(props) {
        super(props);
        this.state = { name: null, description: null, skills: null, range: null };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleSkills = this.handleSkills.bind(this);
        this.handleRange = this.handleRange.bind(this);
    }
      
    handleName(e){
        //debugger
        this.setState({
            name : e.target.value
        })
    }
    handleDescription(e){
        //debugger
        this.setState({
            description : e.target.value
        })
    }
    handleSkills(e){
        //debugger
        this.setState({
            skills : e.target.value
        })
    }
    handleRange(e){
        //debugger
        this.setState({
            range : e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        debugger
        var project_added;
        var val = {name: this.state.name, description: this.state.description, skills: this.state.skills, range: this.state.range}
        axios.post('http://localhost:3001/addproject', val)
        .then(res => {
            project_added= res.data.project_added
            if(project_added)
            this.props.history.push('/');
            console.log(project_added);
        })
    }
	render(){
		return(
            <div className="limiter">
		        <div className="container-login100">
			        <div className="wrap-login100 p-t-50 p-b-90">
				        <form className="login100-form validate-form flex-sb flex-w">
					        <span className="login100-form-title p-b-51"> Add New Project </span>
                            <div className="wrap-input100 validate-input m-b-16" data-validate = "Project Name is required">
						        <input className="input100" type="text" name="projectname" required onChange = {this.handleName.bind(this)} placeholder="Enter Project Name" />
						        <span className="focus-input100"></span>
					        </div>
                            <div className="wrap-input100 validate-input m-b-16" data-validate = "Description must be there">
						        <input className="input100" type="text" name="description" required onChange = {this.handleDescription.bind(this)} placeholder="Enter Description" />
						        <span className="focus-input100"></span>
					        </div>
                            <div className="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
                                <input className="input100" type="text" name="skills" required onChange = {this.handleSkills.bind(this)} placeholder="Required Skills" />
                                <span className="focus-input100"></span>
                            </div>
                            <div className="wrap-input100 validate-input m-b-16" data-validate = "You must define Range">
						        <input className="input100" type="text" name="range" required onChange = {this.handleRange.bind(this)} placeholder="Enter Maximum Budget Range" />
						        <span className="focus-input100"></span>
					        </div>
                            {/* <div className="flex-sb-m w-full p-t-3 p-b-24">
                                <div>
                                    <a href="#" className="txt1">
                                        Forgot?
                                    </a>
                                </div>
					        </div> */}

                            <div className="container-login100-form-btn m-t-17">
                                <input type="submit" className="login100-form-btn" value="Add Project" onClick = {this.handleSubmit}/>
                            </div>

				        </form>
			        </div>
		        </div>
	        </div>
        )
    }
}

export default AddProject;
