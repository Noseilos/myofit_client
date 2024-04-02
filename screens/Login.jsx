import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  formStyles as styles,
} from "../styles/styles";
import { LinearGradient } from "expo-linear-gradient";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Button, TextInput } from "react-native-paper";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { login, verifyToken } from "../redux/actions/userActions";
import Toast from "react-native-toast-message";

import { useMessageAndErrorUser } from "../utils/hooks";
import { CLIENT_ID_WEB, CLIENT_ID_ANDROID, CLIENT_ID_IOS } from "@env";
const Login = ({ navigation }) => {
  const [error, setError] = useState();

  const { newUser, user } = useSelector((state) => state.user);
  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId: CLIENT_ID_WEB,
      androidClientId: CLIENT_ID_ANDROID,
      iosClientId: CLIENT_ID_IOS,
    });
  };
  const navigateToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "home" }],
    });
  };

  useEffect(() => {
    if (user && user.googleId) {
      console.log("User with Google ID found");
      navigateToHome();
    } else if (user && user.signInMethod === "local") {
      // User logged in via email and password
      console.log("User with email found");
      navigateToHome();
    } else if (newUser) {
      console.log("verified yung token at di pa existing");
      navigation.navigate("signup");
      // showToast("success", "Kindly complete your profile before continue");
    }
  }, [newUser, user, navigation]);

  useEffect(() => {
    configureGoogleSignIn();
    GoogleSignin.signOut();
  });

  const showToast = (type, text) => {
    Toast.show({
      type: type,
      text1: text,
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading2, setLoading2] = useState(false);
  const dispatch = useDispatch();
  const loading = useMessageAndErrorUser(navigation, dispatch, "profile");

  const submitHandler = () => {
    dispatch(login(email, password));
  };

  const signIn = async () => {
    try {
      setLoading2(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      dispatch(verifyToken(userInfo.idToken));
      setError();
    } catch (e) {
      setError(e);
    } finally {
      setLoading2(false);
    }

  };

  return (
    <>

      <View style={defaultStyle}>



        <ImageBackground
          source={{ uri: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
          style={{
            flex: 1,
            justifyContent: "center",
            padding: 20,
            borderRadius: 10,
            backgroundColor: colors.color3,
          }}>
          <View style={style.overlay} />
          {/* Heading */}
          <View style={{ marginBottom: 20 }}>

            <Text style={{
              ...formHeading,
              color: colors.color2,
              fontSize: 30,
              textShadowColor: '#000',
              textShadowOffset: { width: -1, height: 1 },
              textShadowRadius: 10,
            }}>Login</Text>

          </View>
          <Text style={styles.or}>Continue with</Text>
          <GoogleSigninButton
            style={{ margin: 20, width: "auto" }}
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
            disabled={loading2}
          />

          <Text style={styles.or}>OR</Text>
          <TextInput
            {...inputOptions}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            {...inputOptions}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("forgetpassword")}
          >
            <Text style={styles.forget}>Forget Password?</Text>
          </TouchableOpacity>

          <Button
            loading={loading}
            textColor={colors.color2}
            disabled={email === "" || password === ""}
            style={styles.btn}
            onPress={submitHandler}
          >
            Log In
          </Button>

          <Text style={styles.or}>OR</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("signup")}
          >
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>

        </ImageBackground>

      </View>



      <Footer activeRoute="profile" />
    </>
  );
};
const style = StyleSheet.create({

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
  },

});
export default Login;
