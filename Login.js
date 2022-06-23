import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";

const sendText = async (phoneNumber) => {
  // using fetch do a POST to https://dev.stedi.me/twofactorlogin/360-601-5440
  const loginResponse = await fetch("https://dev.stedi.me/twofactorlogin/"+phoneNumber,{
    method: "POST",
    headers: {
      "Content-Type": "applications/text"
    }

  });
  const loginResponseText = await loginResponse.text();//converts the promise to a string by using await
  console.log("Login Response", loginResponse.text())
  console.log("PhoneNumber: " ,phoneNumber);
};


const getToken = async({phoneNumber,oneTimePassword}) =>{ 
  console.log("PhoneNumber",phoneNumber);
  const loginResponse = await fetch("https://dev.stedi.me/twofactorlogin/",{
    method: "POST",
    headers: {
      "Content-Type": "applications/json"
    },
    body:(
      phoneNumber,
      oneTimePassword
   )
  });
  const token = await loginResponse.text();
  console.log(token);
}



const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);

  return (
    <SafeAreaView style={styles.margin}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholderTextColor="4251f5"
        placeholder="801-555-1212"
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
        placeholderTextColor="4251f5"
        keyboardType="numeric"
        secureTextEntry={true}

      />
    <TouchableOpacity
      style={styles.button}
      onPress={()=>{sendText(phoneNumber)}}
      >
        <Text>Login</Text>
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
  margin:{
    marginTop:100
  },
  button: {
    alignItems: "center",
    backgroundColor: "#7CC6FE",
    padding: 10
  }
});

export default Login;