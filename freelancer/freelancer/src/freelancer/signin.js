import React from 'react';
import './css/freelancer.css';
import './css/bootstrap.min.css';
import './css/main.css';
import './css/util.css';
import axios from 'axios';
// import {Redirect} from 'react-router';
import Homepage from './homepage';
// import Header from './header';
// import 'https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900';
// import 'https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i';
import './css/one-page-wonder.min.css';

class SignIn extends React.Component{
    constructor(props) {
        super(props);
        this.state = { email: null, password: null };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }
   
    handleEmail(e){
        this.setState({
            email : e.target.value
        })
    }
    handlePassword(e){
        this.setState({
            password : e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault();
        debugger
        var logged_in;
        var val = {email: this.state.email, password: this.state.password}
        axios.post('http://localhost:3001/signinprocess', val)
        .then(res => {
            debugger
            logged_in = res.data.logged_in;
            console.log(logged_in);
            console.log(res.data.logged_in);
            window.sessionStorage.setItem("logged_in", logged_in);
            window.sessionStorage.setItem("username", this.state.email);
            window.sessionStorage.setItem("password", this.state.password);
                //<Redirect to='http://localhost:3000/' />
            if(logged_in){
                this.props.history.push('/');
            }
        })
        
    }
	render(){
        debugger
        if(window.sessionStorage.logged_in === "false"){
		return(
            <div className="limiter">
		        <div className="container-login100">
			        <div className="wrap-login100 p-t-50 p-b-90">
				        <form method = "POST" className="login100-form validate-form flex-sb flex-w">
					        <span className="login100-form-title p-b-51"> Login </span>
                            <div className="wrap-input100 validate-input m-b-16" data-validate = "Username is required">
						        <input className="input100" type="email" name="username" required onChange = {this.handleEmail.bind(this)} placeholder="Username"/>
						        <span className="focus-input100"></span>
					        </div>
                            <div className="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
                                <input className="input100" type="password" name="pass" required onChange = {this.handlePassword.bind(this)} placeholder="Password"/>
                                <span className="focus-input100"></span>
                            </div>

                            <div className="container-login100-form-btn m-t-17">
                                <input type="submit" className="login100-form-btn" value="SignIn" onClick = {this.handleSubmit}/>
                            </div>

				        </form>
			        </div>
		        </div>
	        </div>
        )
    }else{
        return(<div>
            {/* <Header/> */}
            <Homepage/>
        </div>
        )
    }
    }
}

export default SignIn;