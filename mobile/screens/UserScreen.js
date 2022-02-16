/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TextInput,
  View,
  TouchableHighlight,
  Keyboard,
} from 'react-native';
import MapView, {Polyline, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import PolyLine from '@mapbox/polyline';
import io from 'socket.io-client';

export default class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      latitude: 16.4181198,
      longitude: 120.6232758,
      destination: '',
      predictions: [],
      pointCoords: [],
    };
  }
  componentDidMount() {
    // const socket = io('http://192.168.100.171:3000');
    this.getRouteDirections();
  }

  async getRouteDirections(placeId, destinationName) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.latitude},${this.state.longitude}&destination=place_id:${placeId}&key=AIzaSyBY1SPgvsBhLh_TWc5lE3UdWSt4sGW5_tk`,
      );
      const json = await response.json();
      const points = PolyLine.decode(json.routes[0].overview_polyline.points);
      const pointCoords = points.map(point => {
        return {latitude: point[0], longitude: point[1]};
      });
      this.setState({
        pointCoords,
        predictions: [],
        destination: destinationName,
      });
      Keyboard.dismiss();
      this.map.fitToCoordinates(pointCoords);
      this.map.fitToElements(true);
    } catch (error) {}
  }

  async onChangeDestination(destination) {
    this.setState({destination});
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyBY1SPgvsBhLh_TWc5lE3UdWSt4sGW5_tk&input=${destination}&location=${this.state.latitude}, ${this.state.longitude}&radius=2000`;
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      this.setState({predictions: json.predictions});
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let marker = null;
    if (this.state.pointCoords.length > 1) {
      marker = (
        <Marker
          coordinate={this.state.pointCoords[this.state.pointCoords.length - 1]}
        />
      );
    }
    const predictions = this.state.predictions.map(prediction => (
      <TouchableHighlight
        key={prediction.id}
        onPress={() =>
          this.getRouteDirections(
            prediction.place_id,
            prediction.structured_formatting.main_text,
          )
        }>
        <View>
          <Text style={styles.suggestion}>{prediction.description}</Text>
        </View>
      </TouchableHighlight>
    ));
    return (
      <View style={styles.container}>
        <MapView
          ref={map => {
            this.map = map;
          }}
          style={styles.mapStyle}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          showsUserLocation={true}>
          <Polyline
            coordinates={this.state.pointCoords}
            strokeWidth={2}
            strokeColor="red"
          />
          {marker}
        </MapView>

        <TextInput
          placeholder="Enter destination..."
          style={styles.destinationInput}
          value={this.state.destination}
          onChangeText={destination => this.onChangeDestination(destination)}
        />
        {predictions}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
  destinationInput: {
    height: 40,
    borderWidth: 1,
    marginTop: 50,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: 'white',
    padding: 5,
  },
  suggestion: {
    backgroundColor: 'white',
    padding: 5,
    fontSize: 18,
    borderWidth: 0.5,
    marginLeft: 5,
    marginRight: 5,
  },
});
