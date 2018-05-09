import React from 'react';
import './css/freelancer.css';
import './css/bootstrap.min.css';
import './css/main.css';
import './css/util.css';
import axios from 'axios';
class ProfileImage extends React.Component{
	constructor(props) {
        super(props);
        this.state = { file: '', updateimage: false, image_name : null };
        this.handleImage = this.handleImage.bind(this);
        this.handleImageUpdation = this.handleImageUpdation.bind(this);
        this.handleImageUploading = this.handleImageUploading.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    componentWillMount() {
        var profile
        var self=this
        if(window.sessionStorage.getItem("username") === window.sessionStorage.getItem("bidderprofilename")){
        profile = {username : window.sessionStorage.getItem("username")}
        axios.post('http://localhost:8080/user/profilefetch', profile)
        .then(res => {
            this.setState({
                image_name : res.data.rows.profile_image
            })
        });
        }else{
            profile = {username : window.sessionStorage.getItem("username")}
            axios.post('http://localhost:8080/userprofilefetch', profile)
            .then(res => {
                self.setState({
                    image_name : res.data.rows.profile_image
                })
            });
        }
    }
    handleImage(e){
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
            });
        }
        reader.readAsDataURL(file)
    }

    handleImageUploading(e){
        e.preventDefault();
        // var username = {username : window.sessionStorage.getItem("username")}
        const formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('id', 1);
        formData.append('username', window.sessionStorage.getItem("username"));
        console.log(formData)
        //formData.append()
        debugger
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post('http://localhost:8080/user/imageupdate', formData, config)
        .then(res => {
            debugger
            var data_inserted = res.data.image_updated;
            if(data_inserted){
                alert('update successful');
                }
                this.setState({updateimage : false})
				window.location.href = "http://localhost:3000/Profile"
                // this.props.history.push('/Profile');
            }
        );
    }

    handleImageUpdation(e){
        e.preventDefault();
            this.setState({
                updateimage:true,
            });
    }

    handleCancel(e){
        e.preventDefault();
            this.setState({
                updateimage:false,
            });
    }

	render(){
        if(this.state.updateimage){
            return(
                <form onSubmit={this.handleImageUploading}>
                    <div className="input100" data-validate = "Name is required">
                        <input type="file" onChange={this.handleImage} className="input100"/><br />
                    </div>
                    <button type = "submit" className="login100-form-btn-file" value="Upload Image" >Upload Image</button>
                    <button type = "cancel" className="login100-form-btn-file" value="Cancel" onClick = {this.handleCancel}>Cancel</button>
                </form>
            )
        }
        else if(this.state.image_name === null){
            debugger
            return(
                <div>
                    <img src={require("../images/avatar.gif")} style={{width: 110, height: 120, marginLeft:145}} alt = "Not Uploaded Yet"/>
                    <div className="flex-sb-m w-full p-t-3 p-b-24">
                        <button className="txt1" style={{width: 200, height: 120, marginLeft:95}} onClick={this.handleImageUpdation}>
                            Update Profile Image
                        </button>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div>
                    <img src={require("../images/"+this.state.image_name)} style={{width: 110, height: 120, marginLeft:145}} alt = "Not Uploaded Yet"/>
                    <div className="flex-sb-m w-full p-t-3 p-b-24">
                
                        <button className="txt1" style={{width: 200, height: 120, marginLeft:95}} onClick={this.handleImageUpdation}>
                            Update Profile Image
                        </button>
                    </div>
                </div>
            )
        }
		
	}
}

export default ProfileImage; 