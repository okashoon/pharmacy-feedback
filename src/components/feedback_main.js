import React from "react";
import { StyleSheet, TextInput, View, Text, AsyncStorage, FlatList, Button  } from "react-native";
import axios from "axios";
import FieldItem from './field_item'

var token = {};
export default class FeedbackMain extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: [],
      
    };
    this._toggleSelection = this._toggleSelection.bind(this);
    this.submit = this.submit.bind(this);
  }
  componentDidMount() {
    
    AsyncStorage.getItem("@emp_feedback:token", (err, data) => {
      token = JSON.parse(data);
      console.log(token);
      axios({
        method: "get",
        url: "http://192.168.1.5:3000/fields",
        headers: {
            'client': token['client'],
            'access-token': token['access-token'],
            'uid': token['uid']
        }
      }).then(
        resp => {
          console.log(resp.data);
          this.setState({fields:resp.data})
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  _toggleSelection(id){
      var newFields = this.state.fields.slice(0)
      var field = newFields.find((field)=>field.id==id)
      field.state = field.state? 0 : 1
    this.setState({fields:newFields})
  }

  submit(){
    axios({
      method: "POST",
      url: "http://192.168.1.5:3000/fields/submit_fields",
      headers: {
          'client': token['client'],
          'access-token': token['access-token'],
          'uid': token['uid'],
          'Content-Type': 'application/json'
      },
      data: {
        fields: this.state.fields,
        user_id: this.props.navigation.state.params.user_id
      }
    })
  }

  render() {
    return (
      <View>
        <Text>Main View</Text>
        {this.state.fields.map((item)=>{
            return (
                <FieldItem 
                key={item.id}
                id={item.id}
                title={item.desc}
                onPressItem={this._toggleSelection}
                state={item.state}
              />
            )
        })}
        <Button 
          title="Submit"
          onPress={this.submit}
        />
      </View>
    );
  }
}
