import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import axios from 'axios'
import api from '../api/index'

export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: "",
      errors:[]
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    AsyncStorage.getItem("@emp_feedback:user", (err, data) => {
      user = JSON.parse(data);
      if (user && user.password && user.email){
        console.log(user.email)
        this.setState({email: user.email, password:user.password})
      }
    })
  }
  handleSubmit(event) {
    axios({
      method: 'POST',
      url: `${api.BASE_URL}/users/sign_in`,
      dataType: 'json',
      data: {email: this.state.email,
             password: this.state.password},
      
      headers: {  Accept: 'application/json',
          'Content-Type': 'application/json'},
    }).then((response)=>{
      
      var token = response.headers;
      var user = response.data.user;
      user.password = this.state.password;
      var roles = response.data.roles;
      
      try {
        AsyncStorage.setItem("@emp_feedback:token", JSON.stringify(token), ()=>{
          AsyncStorage.setItem("@emp_feedback:user", JSON.stringify(user))
        });
      } catch (error) {
        this.setState({errors:['AsyncStorage error: ' + error.message]});
      }
      if (roles.filter((role)=>role.id==1).length>0){
        this.props.navigation.navigate("Admin_panel",{user_id:user.id})  
      } else {
        this.props.navigation.navigate("Feedback",{user_id:user.id})
      }
      
    }).catch((error)=>{
      console.log(error)
      this.setState({errors:error.response.data.errors})
    })
    
  }

    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TextInput 
              style={{
                    height: 40,
                    width: '70%',
                    backgroundColor: 'rgba(225,225,225,0.4)',
                    marginBottom: 10,
                    padding: 10,
                    color: '#fff'
                }} 
              placeholder="User name"
              value = {this.state.email}
              onChangeText={(email)=>this.setState({email:email})}
              />
            <TextInput 
                style={{
                  height: 40,
                  width: '70%',
                  backgroundColor: 'rgba(225,225,225,0.4)',
                  marginBottom: 10,
                  padding: 10,
                  color: '#fff'
                }} 
                placeholder="Password"
                value = {this.state.password}
                onChangeText={(password)=>this.setState({password:password})}
                secureTextEntry
                />
            <Button
            onPress={this.handleSubmit}
            title="دخول"
            color="#841584" />

            {
              this.state.errors ?
                this.state.errors.map((error)=><Text>{error}</Text>) : <Text></Text>
                // <Text>{this.state.errors}</Text> : <Text></Text>
            }
            
              
        </View>
      );
    }
  }