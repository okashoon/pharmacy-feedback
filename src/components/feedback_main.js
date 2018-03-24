import React from "react";
import { StyleSheet, TextInput, View, Text, AsyncStorage, FlatList, Button  } from "react-native";
import { Container, Header, Content } from 'native-base';
import axios from "axios";
import FieldItem from './field_item';
import api from '../api/index'


var token = {};
export default class FeedbackMain extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: [],
      submitted: false
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
        url: `${api.BASE_URL}/fields/check_if_submitted`,
        headers: {
            'client': token['client'],
            'access-token': token['access-token'],
            'uid': token['uid']
        }
      }).then(
        resp => {
          console.log(resp)
          this.setState({submitted:resp.data.submitted})
          
        },
        err => {
          console.log(err);
        }
      );

      axios({
        method: "get",
        url: `${api.BASE_URL}/fields`,
        headers: {
            'client': token['client'],
            'access-token': token['access-token'],
            'uid': token['uid']
        }
      }).then(
        resp => {
          console.log(resp.data);
          var fields = resp.data;
          for (var field of fields){
            field.state = 0;
          }
          this.setState({fields:fields})
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
      url: `${api.BASE_URL}/fields/submit_fields`,
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
    }).then((response)=>{
      this.setState({submitted:true})
    })
  }

  render() {
    return (
      <Container>
        <Content>
          <Text>الصفحة الرئيسية</Text>
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
            title={this.state.submitted?"تم الادخال":"ادخال"}
            onPress={this.submit}
            disabled={this.state.submitted}
          />
      </Content>
      </Container>
    );
  }
}
