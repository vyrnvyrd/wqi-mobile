import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { LandingNavigator } from "./landing.navigator";
import { AppNavigator } from "./app.navigator"
import { useSelector, useDispatch } from 'react-redux';
import { Client } from 'react-native-paho-mqtt';

export const Navigation = () => {
  const dispatch = useDispatch();
  const continueData = useSelector((store) => store.continueData.continueData);

  const myStorage = {
    setItem: (key, item) => {
      myStorage[key] = item;
    },
    getItem: (key) => myStorage[key],
    removeItem: (key) => {
      delete myStorage[key];
    },
  };

  const client = new Client({ uri: 'ws://test.mosquitto.org:8080/', clientId: '', storage: myStorage });

  // set event handlers
  client.on('connectionLost', (responseObject) => {
    if (responseObject.errorCode !== 0) {
      console.log('connectionLost: ', responseObject.errorMessage);
    }
  });
  client.on('messageReceived', (message) => {
    console.log('messageReceived: ', message.payloadString);
    dispatch({ type: "UPDATE_DATA_WATER_QUALITY", payload: message.payloadString })
  });

  // connect the client
  client.connect()
    .then(() => {
      console.log('onConnect');
      return client.subscribe('water-quality/data');
    })
    .then((data) => {
      console.log('then: ', data)
      if (data?.id) {
        console.log('masuk dispatch')
        dispatch({ type: "UPDATE_DATA_WATER_QUALITY", payload: data })
      }
    })
    .catch((responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log('onConnectionLost:' + responseObject.errorMessage);
      }
    });

  return (
    <NavigationContainer>
      {continueData ? <AppNavigator /> : <LandingNavigator />}
    </NavigationContainer>
  );
};
