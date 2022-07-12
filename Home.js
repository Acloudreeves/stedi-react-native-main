
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Icons from './Icons.js';
import Bar  from './Bar.js';

const Home = (props) => {
  const [userEmail, setUserEmail] = useState("No Email")

  const getEmail = async (props) => {
    const emailResponse = await fetch('https://dev.stedi.me/validate/'+ props.userToken)
    const emailResponseText = await emailResponse.text()
    setUserEmail(emailResponseText)
  }

  getEmail(props)

  return (
    <View>
      <Bar loggedInUser = {userEmail} />
      <Icons />
    </View>
  );
};
export default Home;
