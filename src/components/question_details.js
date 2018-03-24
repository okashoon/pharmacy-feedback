import React from "react";
import { StyleSheet, TextInput, View, Text, AsyncStorage, FlatList, Button  } from "react-native";
import { Container, Header, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import axios from "axios";
import FieldItem from './field_item';
import api from '../api/index'


var token = {};
export default class QuestionDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      answer_report: [],
    };
  }
  componentDidMount() {
    
    AsyncStorage.getItem("@emp_feedback:token", (err, data) => {
      token = JSON.parse(data);

      axios({
        method: "get",
        url: `${api.BASE_URL}/fields/${this.props.navigation.state.params.field_id}`,
        headers: {
            'client': token['client'],
            'access-token': token['access-token'],
            'uid': token['uid']
        }
      }).then(
        resp => {
          this.setState({field:resp.data})
          
        },
        err => {
          console.log(err);
        }
      );

      axios({
        method: "get",
        url: `${api.BASE_URL}/fields/${this.props.navigation.state.params.field_id}/report_per_field`,
        headers: {
            'client': token['client'],
            'access-token': token['access-token'],
            'uid': token['uid']
        }
      }).then(
        resp => {
          this.setState({answer_report:resp.data.report})
          
        },
        err => {
          console.log(err);
        }
      );

    });
  }


  render() {
    return (
      <Container>
        <Header />
        <Content>
            <Text style={{fontSize: 20, fontWeight: 'bold',}}>{this.state.field? this.state.field.desc:""}</Text>
          <Grid>
            {this.state.answer_report.map((email,index)=>{
              return (
                <Row  
                      key={index}  
                      style={{
                      borderBottomColor: 'grey',
                      borderBottomWidth: 1}}
                >
                  <Col size={8} style={{ paddingTop: 5,paddingBottom: 5, backgroundColor: '#3498db', height: "100%" }}><Text>{email}</Text></Col>
                </Row>
              )
            })
          }
          </Grid>
        </Content>
      </Container>
    );
  }
}
