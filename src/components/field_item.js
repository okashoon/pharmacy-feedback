import React from "react";
import { StyleSheet, TextInput, View, Text, AsyncStorage, TouchableOpacity, Switch } from "react-native";
import axios from "axios";

export default class FieldItem extends React.Component {
    constructor(props){
        super(props)
        this._onPress = this._onPress.bind(this)
    }

    _onPress() {
      this.props.onPressItem(this.props.id);
    };
  
    render() {
      var textColor = this.props.state ? "red" : "black";
      return (
        <TouchableOpacity onPress={this._onPress}>
          <View style={{flexDirection:'row'}}>
            <Switch 
              value={this.props.state == 0? false : true}
              onValueChange={this._onPress}
            />
            <Text style={{ color: textColor }}>
              {this.props.state? "hello" : "aaaaa"}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }