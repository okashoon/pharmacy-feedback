import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './src/components/login'
import FeedbackMain from './src/components/feedback_main';
import AdminPanel from './src/components/admin_panel';
import QuestionDetails from './src/components/question_details';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StackNavigator({
  Home: {
    screen: Login,
  },
  Feedback: {
    screen: FeedbackMain
  },
  Admin_panel: {
    screen: AdminPanel
  },
  Question_details: {
    screen: QuestionDetails
  }
});
