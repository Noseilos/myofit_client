import { ScrollView, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import People from "../components/People";
import { useIsFocused } from "@react-navigation/native";
import { getAllUsers } from "../redux/actions/chatActions"
import Footer from "../components/Footer";
import {
  defaultStyle,
  formHeading,
} from "../styles/styles";

const PeopleScreen = () => {
  const { users } = useSelector((state) => state.chat)

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    
    const timeOutId = setTimeout(() => {
      dispatch(getAllUsers());
    }, 200)
    return () => {
      clearTimeout(timeOutId)
    }

  }, [dispatch, isFocused]);
  
  return (
    <>
      <View style={defaultStyle}> 
        <View style={{ marginBottom: 20 }}>
            <Text style={formHeading}>People</Text>
        </View>

        <ScrollView showVerticalScrollIndicator={false} style={{ marginBottom: 60 }}>
          {users.map((item, index) => (
            <People key={index} item={item}/>
          ))}
        </ScrollView>
        
      </View>
      <Footer activeRoute="peoplescreen"/>
    </>
  );
};

export default PeopleScreen;
