import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { VERIFY_USER } from '../Events'

export default class LoginForm extends Component {
	
	constructor(props) {
	    super(props);
	    this.state = { 
			isMounted: false,
			nickname: "", 
			error:"" };

	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.setUser = this.setUser.bind(this);
	}

	componentDidMount(){
		this.setState({isMounted: true})
		this.focus()
	}

	componentWillUnmount(){
		this.setState({isMounted: false})
	}


	setUser = ({user, isUser}) => {
		console.log(user, isUser);
		if(isUser){
			this.setError("Username taken")
		} else {
			this.setError()
			this.props.setUser(user)
		}
	}

	

	setError(error){
		if (this.state.isMounted) {
		this.setState({error});
		}
	}

	//updates form inputs
	handleChange(event){
		if (this.state.isMounted) {
		this.setState({ nickname:event.target.value })
		}
	}

	//Sends emit to socket for verification 
	handleSubmit(event){
		event.preventDefault()
		const { socket } = this.props
		const { nickname } = this.state
		socket.emit(VERIFY_USER, nickname, this.setUser)
		
	}
	
	//focus on input
	focus(){
		this.textInput.focus()
	}

	render() {
		const { nickname, error } = this.state 
		return (
			// .login>form.login-form>((label[for=nickname]>h1{Got a nickname?})+input[value][onChange][placeholder=Leon])
			<div className="login">
				<form onSubmit={this.handleSubmit} className="login-form">

			          <label 
			          		htmlFor="nickname">
			          		<h1 style={{textAlign:"center"}}>
			          			Got a nickname?
			          		</h1>
			          </label>
			          
			          <input 
			          		ref={(input)=>{ this.textInput = input }}
			          		id="nickname" 
			          		type="text"
			          		value={nickname}
			          		onChange={this.handleChange}
			          		placeholder="Enter Username" 
			          		/>
			          	<div className="error">{error ? error : ""}</div>
				</form>
			</div>
		);
	}
	
}

LoginForm.propTypes = {
	socket: PropTypes.object,
	// verified:PropTypes.func.isRequired
}