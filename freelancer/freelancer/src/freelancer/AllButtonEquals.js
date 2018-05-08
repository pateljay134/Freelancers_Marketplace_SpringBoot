import React, {Component} from 'react';
import './calc.css';
class AllButtonEquals extends React.Component{
	handleClick(value){
		this.props.handledClick(value);
	}
	render(){
		return(
			<button className = 'functionKeys' onClick={this.handleClick.bind(this, this.props.value)}  >{this.props.value}</button>
		)
	}
}
export default AllButtonEquals;