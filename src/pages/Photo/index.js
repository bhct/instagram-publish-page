import React from "react";

import Icon from 'react-native-vector-icons/MaterialIcons';

import CameraInterface from "../../components/CameraInterface";

const Photo = ({ navigation }) => <CameraInterface navigation={navigation} only="photo" />;

export default Photo;

Photo.navigationOptions = {
  tabBarIcon: ({ tintColor }) => <Icon name="camera" size={20} color={tintColor} />
}