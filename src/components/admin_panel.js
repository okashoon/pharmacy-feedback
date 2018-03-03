import React from "react";
import { StyleSheet, TextInput, View, Text, AsyncStorage, FlatList, Button  } from "react-native";
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
      <View>
        <Text>Admin panel</Text>
        <Text>السؤال ---------- صح ------------ خطأ</Text>
        {this.state.fields_report.map((field)=>{
            return (
                <Text>{field.desc} --------------- {field.yes} ----------------- {field.no}</Text>
            )
        })

        }
      </View>
    );
  }
}
