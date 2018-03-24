import React from "react";
import { StyleSheet, TextInput, View, Text, AsyncStorage, FlatList, Button  } from "react-native";
import { Container, Header, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import axios from "axios";
import FieldItem from './field_item';
import api from '../api/index'


var token = {};
export default class AdminPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      fields_report: [],
    };
  }
  componentDidMount() {
    
    AsyncStorage.getItem("@emp_feedback:token", (err, data) => {
      token = JSON.parse(data);

      axios({
        method: "get",
        url: `${api.BASE_URL}/fields/fields_report`,
        headers: {
            'client': token['client'],
            'access-token': token['access-token'],
            'uid': token['uid']
        }
      }).then(
        resp => {
          this.setState({fields_report:resp.data.report})
          
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
          <Grid>
            <Row  
              style={{
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
            }}>
                  <Col size={8} style={{ paddingTop: 5,paddingBottom: 5, backgroundColor: '#3498db', height: "100%" }}><Text>السؤال</Text></Col>
                  <Col size={1} style={{ paddingTop: 5,paddingBottom: 5, backgroundColor: '#00CE9F', height: "100%" }}><Text>نعم</Text></Col>
                  <Col size={1} style={{ paddingTop: 5,paddingBottom: 5, backgroundColor: '#00CE9F', height: "100%" }}><Text>لا</Text></Col>
            </Row>
            {this.state.fields_report.map((field,index)=>{
              return (
                <Row  
                      key={index}  
                      style={{
                      borderBottomColor: 'grey',
                      borderBottomWidth: 1}}
                      onPress={()=>{this.props.navigation.navigate("Question_details",{field_id:field.field_id}) }}>
                  <Col size={8} style={{ paddingTop: 5,paddingBottom: 5, backgroundColor: '#3498db', height: "100%" }}><Text>{field.desc}</Text></Col>
                  <Col size={1} style={{ paddingTop: 5,paddingBottom: 5, backgroundColor: '#00CE9F', height: "100%" }}><Text>{field.yes}</Text></Col>
                  <Col size={1} style={{ paddingTop: 5,paddingBottom: 5, backgroundColor: '#00CE9F', height: "100%" }}><Text>{field.no}</Text></Col>
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
