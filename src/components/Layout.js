import React, { Component } from 'react';
import io from 'socket.io-client';
import {USER_CONNECTED, LOGOUT} from '../Events';
import LoginForm from './LoginForm';
import ChatContainer from './Chat/ChatContainer';

const socketUrl = "http://localhost:3001"

export default class Layout extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
              socket:null, 
              user: null
		};
    }

    
    componentDidMount() {
        this.initSocket()
    }
    
    
    initSocket = () => {
        const socket = io(socketUrl)
        socket.on("connect", () => {
            console.log("connected biatch")
        })
        this.setState({socket})
    }

    setUser = (user) => {
        const {socket} = this.state
        socket.emit(USER_CONNECTED, user);
        this.setState({user})
        console.log(user.name)
    }

    logout = ()=> {
        const {socket} = this.state
        socket.emit(LOGOUT)
        this.setState({user:null})
    }

    render() {
    const { title } = this.props
    const { socket } = this.state
    const { user } = this.state
		return (
			<div className="container">

            { !user ?
                <LoginForm socket={socket} setUser={this.setUser}/>
                
                :
                <ChatContainer socket={socket} user={user} logout={this.logout} />
            }
            
                </div>
		);
	}
}