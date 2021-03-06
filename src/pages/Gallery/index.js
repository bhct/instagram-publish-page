import React, { Component } from "react";
import { View, TouchableWithoutFeedback, ScrollView } from "react-native";
import Video from "react-native-video";
import Icon from "react-native-vector-icons/FontAwesome";
import ImageEditor from "@react-native-community/image-editor";

import ViewZoom from "../../components/ViewZoom";
import CameraRollList from "../../components/CameraRollList";
import CameraRollHeader from "../../components/CameraRollHeader";

import styles from "./styles";

export default class App extends Component {
  state = {
    current: {},
    groupTypes: "SavedPhotos",
    paused: false
  };

  mediaContainer = () => {
    const {
      current: { width, height, uri, type },
      paused
    } = this.state;

    if (type == "video/mp4")
      return (
        <TouchableWithoutFeedback
          onPress={() => this.setState({ paused: !paused })}
        >
          <Video
            source={{ uri }}
            resizeMode="cover"
            repeat={true}
            paused={paused}
            style={styles.video}
          />
        </TouchableWithoutFeedback>
      );

    return (
      <ViewZoom
        width={width}
        height={height}
        uri={uri}
        ref={viewZoom => (this.viewZoom = viewZoom)}
      />
    );
  };

  handleMedia = image => {
    this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: true });
    this.setState({ current: image });
  };

  handleCrop = async () => {
    const { current } = this.state;
    const offset = this.refs.viewZoom.getOffset();
    const cropData = {
      offset,
      size: { width: current.width, height: current.height }
    };
    const response = await ImageEditor.cropImage(current.uri, cropData);

    console.log(response);
  };

  render() {
    const { paused } = this.state;

    return (
      <ScrollView style={styles.container} ref="_scrollView">
        <CameraRollHeader />
        <View style={styles.imagePreviewContainer}>
          {paused ? (
            <TouchableWithoutFeedback
              onPress={() => this.setState({ paused: !paused })}
            >
              <Icon name="play" style={styles.playIcon} />
            </TouchableWithoutFeedback>
          ) : null}
          <this.mediaContainer />
        </View>
        <CameraRollList handleMedia={this.handleMedia.bind(this)} />
      </ScrollView>
    );
  }
}
