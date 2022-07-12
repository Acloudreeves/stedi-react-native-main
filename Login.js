import {useState} from "react";
import {TouchableOpacity, SafeAreaView, StyleSheet, TextInput, Text} from "react-native";
const sendText = async (phoneNumber) => {
  // using fetch do a POST to https://dev.stedi.me/twofactorlogin/602-540-0236
  console.log("PhoneNumber: ",phoneNumber);
  const loginResponse = await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber,{
    method: 'POST',
    headers:{
      'content-type':'application/text'
    }
  });
  const loginResponseText = await loginResponse.text(); //converts the promise to a string by using await
  console.log('Login Response',loginResponseText);   //print the response
}

const getToken = async({phoneNumber, oneTimePassword, setUserLoggedIn, setUserToken}) =>{
  const loginResponse=await fetch('https://dev.stedi.me/twofactorlogin',{
    method: 'POST',
    body:JSON.stringify({oneTimePassword, phoneNumber}),
    headers:{
      'content-type':'application/text'
    }
  });
  const token = await loginResponse.text();
  console.log(token);
  const responseCode = loginResponse.status;//200 means logged in successfully
  console.log("Response Code", responseCode)
    if(responseCode==200){
      setUserLoggedIn(true)
      setUserToken(token)
    }
}

const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  console.log("setUserLoggedIn", props.setUserLoggedIn)
  const [oneTimePassword, setOneTimePassword] = useState(null);
  

  return (
    <SafeAreaView style={styles.margin}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="801-555-1212"
      />
      <TouchableOpacity
      style={styles.button}
      onPress={()=>(sendText(phoneNumber))}
      >
        <Text>Send Text</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={setOneTimePassword}
        value={oneTimePassword}
        placeholder="1234"
        keyboardType="numeric"
      />
      <TouchableOpacity
      style={styles.button}
      onPress={()=>{
        getToken({phoneNumber, oneTimePassword, setUserLoggedIn:props.setUserLoggedIn, setUserToken:props.setUserToken});
      }}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    marginTop: 12,
    borderWidth: 1,
    padding: 10,
  },
    margin:{
      marginTop: 100
  },
  button: {
    alignItems: "center",
    backgroundcolor: "#DDDDDD",
    padding: 10
  }
});

export default Login;