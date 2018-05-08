import React, {Component} from 'react';
import './css/freelancer.css';
import './css/bootstrap.min.css';
import './css/main.css';
import './css/util.css';
import axios from 'axios';
// import 'https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900';
// import 'https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i';
import './css/one-page-wonder.min.css';
//import { debug } from 'util';

class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state = { name: null, email: null, phone_number: null, skills: null , about_me : null, password : null };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
        this.handleAboutMe = this.handleAboutMe.bind(this);
        this.handleSkills = this.handleSkills.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
    }
      
    handleName(e){
        this.setState({
            name : e.target.value
        })
    }
    handleEmail(e){
        this.setState({
            email : e.target.value
        })
    }
    handlePhoneNumber(e){
        this.setState({
            phone_number : e.target.value
        })
    }
    handleAboutMe(e){
        this.setState({
            about_me : e.target.value
        })
    }
    handleSkills(e){
        this.setState({
            skills : e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        var data_inserted;
        var val = {name: this.state.name, email: this.state.email, password: this.state.password, phone_number: this.state.phone_number, skills: this.state.skills, about_me: this.state.about_me}
        axios.post('http://localhost:3001/profileupdate', val)
        .then(res => {
            debugger
            data_inserted = res.data.data_inserted;
            if(data_inserted){
                this.props.history.push('/');
            }
        });
    }
    handleLoad(e){
        e.preventDefault();
        axios.post('http://localhost:3001/profilefetch')
        .then(res => {
            debugger
            this.setState({
                name : res.data.name, 
                email: res.data.email, 
                phone_number: res.data.phone_number, 
                skills: res.data.skills, 
                about_me : res.data.about_me,
                password : res.data.password
            })
        });
    }
    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
     }

	render(){
		return(
            <table>
                <tr>
                    <td>Project Title</td>
                    <td>Description</td>
                    <td>Skills Required</td>
                    <td>Employer</td>
                    <td>Budget Range</td>
                    <td>Number of Bids yet</td>
                    <td></td>
                </tr>
                
            </table>
        )
    }
}

export default Profile;
