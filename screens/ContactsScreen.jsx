import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  defaultStyle,
  formHeading,
} from "../styles/styles";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactRequest } from "../redux/actions/chatActions";
import ContactRequest from "../components/ContactRequest";

const ContactsScreen = () => {

  const [contactRequest, setContactRequests] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactRequest());
  }, [dispatch]);

  const { contactRequests } = useSelector(state => state.chat);

  useEffect(() => {
    if (contactRequests) {
      setContactRequests(contactRequests);
    }
  }, [contactRequests]);

  return (
    <>
      <View style={defaultStyle}>
        <View style={{ marginBottom: 20 }}>
          <Text style={formHeading}>Requests</Text>
        </View>
        {contactRequest.map((item, index) => (
          <ContactRequest
            key={index}
            item={item}
            contactRequest={contactRequest}
            setContactRequests={setContactRequests}
          />
        ))}
      </View>
      <Footer activeRoute="contactscreen" />
    </>
  );
};

export default ContactsScreen;
