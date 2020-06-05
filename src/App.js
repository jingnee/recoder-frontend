import React, { useState, useEffect } from 'react';
import ToolbarBefore from './modules/toolbarBefore';
import ToolbarAfter from './modules/toolbarAfter';
import FootBar from './modules/footbar';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Main from './components/main'
import SignIn from './components/signIn'
import SignUp from './components/signUp'
import Mentor from './components/Mentor';
import MentorLogin from './components/MentorLogin';
import MenteeLogin from './components/MenteeLogin';
import MentorRoomList from './components/MentorRoomList';
import Mentee from './components/Mentee';
import RoomList from './components/Room_list';
import Profile from './components/Profile';
import Review from './codeReview/index';
import NotFound from './components/NotFound';
import './index.css';

class App extends React.Component {
  data;
  constructor(props){
    super(props);

    this.state={
      login_flag: false,
      rooms:[],
      selectedRoom: null,
      // test:'',
      user:{
        id:'',
        token:''
      },
    }
  }
  
  render(){
    this.data = JSON.parse(localStorage.getItem('user'))
    //if(localStorage.getItem('user'))this.setState({user:this.data})

  return (
    <React.Fragment>
      <Router>
    {/* <ToolbarAfter/> */}
    {this.data ? <ToolbarAfter/> : <ToolbarBefore/>}
    <div className='main'>
      <Route exact path="/" component={Main}/>
      <Route path="/signin" component={SignIn}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/mentordashboard" component={Mentor}/>
      <Route path="/user/mentor" component={MentorLogin}/>
      <Route path="/user/mentee" component={MenteeLogin}/>
      <Route path="/mentor/roomlist" component={MentorRoomList}/>
      <Route path="/mentee" component={Mentee}/>
      <Route path="/roomlist" component={RoomList}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/review" component={Review}/>
      {/* <Route component={NotFound}/> */}
    </div>
    <FootBar/>
    </Router>
    </React.Fragment>

  );
}
}

export default App;
