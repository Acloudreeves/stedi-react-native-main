import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";
const sendText = async (phoneNumber) => {
  console.log("PhoneNumber: ",phoneNumber);
  const tokenResponse = await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber,{
    method: 'POST',
    headers:{
      'content-type':'application/text'
    }
  });
const tokenResponseText = await tokenResponse.text();
  console.log('Login Response',tokenResponse.text());//print the response
};
const getToken = async({phoneNumber, oneTimePassword, setUserLoggedIn}) =>{
  const tokenResponse = await fetch('https://dev.stedi.me/twofactorlogin',{
    method: 'POST',
    body:JSON.stringify({oneTimePassword, phoneNumber}),
    headers: {
      'content-type':'application/json'
    }
  });
const responseCode = tokenResponse.status;//200 means logged in successfully
console.log("Response Status Code", responseCode);
if(responseCode==200){
  setUserLoggedIn(true);
}
const tokenResponseString = await tokenResponse.text;
}
const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);
  return (
    <SafeAreaView style={styles.mainView}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="8015551212"
      />
        <TouchableOpacity
        style={styles.button}
        onPress={()=>{sendText(phoneNumber)}}
        >
        <Text>Send Text</Text>
        </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={setOneTimePassword}
        value={oneTimePassword}
        placeholder="1234"
        keyboardType="numeric"
        secureTextEntry= {true}
      />
        <TouchableOpacity
        style={styles.button2}
        onPress={()=>{
          getToken({phoneNumber, oneTimePassword, setUserLoggedIn:props.setUserLoggedIn});
        }}
        >
        <Text>Log In</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  mainView:{
marginTop: 100
  },
  button: {
    alignItems: "center",
    backgroundColor: "#C0FFC3",
    padding: 10
},
button2: {
  alignItems: "center",
  backgroundColor: "#03DFFC",
  padding: 10
},
});
export default Login;