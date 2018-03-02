import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: "",
      errors:""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    console.log("submitted")
    fetch('http://192.168.1.5:3000/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    }).then((response)=>response.json())
    .then((data)=>{
      if (data.status == 422){
        this.setState({errors:data})
        // this.setState({errors:JSON.stringify(this.props.navigation.navigate)})
      } else {
        this.setState({errors:data._bodyText})
        
        // this.props.navigation.navigate('Feedback')
      }
    }).catch((response)=>{
      this.setState({errors:response.body})
    });
  }

    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TextInput 
              style={{
                    height: 40,
                    backgroundColor: 'rgba(225,225,225,0.4)',
                    marginBottom: 10,
                    padding: 10,
                    color: '#fff'
                }} 
              placeholder="User name"
              onChangeText={(email)=>this.setState({email:email})}
              />
            <TextInput 
                style={{
                  height: 40,
                  backgroundColor: 'rgba(225,225,225,0.4)',
                  marginBottom: 10,
                  padding: 10,
                  color: '#fff'
                }} 
                placeholder="Password"
                onChangeText={(password)=>this.setState({password:password})}
                />
            <Button
            onPress={this.handleSubmit}
            title="Login"
            color="#841584" />

            {
              this.state.errors ?
                // this.state.errors.map((error)=><Text>{error}</Text>) : <Text></Text>
                <Text>{this.state.errors}</Text> : <Text></Text>
            }
            
              
        </View>
      );
    }
  }