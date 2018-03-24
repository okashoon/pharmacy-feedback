import React from "react";
import { StyleSheet, TextInput, View, Text, AsyncStorage, TouchableOpacity, Switch } from "react-native";
import { Container, Header, Content, ListItem, CheckBox } from 'native-base';
import axios from "axios";

export default class FieldItem extends React.Component {
    constructor(props){
        super(props)
        this._onPress = this._onPress.bind(this)
    }

    _onPress() {
      console.log(this.props)
      this.props.onPressItem(this.props.id);
    };
  
    render() {
      var textColor = this.props.state ? "red" : "black";
      return (
        <TouchableOpacity onPress={this._onPress}>
          <View style={{flexDirection:'row',marginBottom:5}}>
            <CheckBox
              style={{marginRight:10}}
              checked={this.props.state == 0? false : true}
              onPress={this._onPress}
            />
            <Text style={{ color: textColor }}>
              {this.props.title}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }