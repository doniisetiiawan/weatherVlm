import React, { Component } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Forecast from './forecast';
import OpenWeatherMap from './open_weather_map';
import flowers from './flowers.png';
import LocationButton from './LocationButton';

const baseFontSize = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: { flex: 1, flexDirection: 'column' },
  overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    padding: 24,
  },
  zipContainer: {
    height: baseFontSize + 10,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3,
  },
  zipCode: {
    flex: 1,
    flexBasis: 1,
    width: 50,
    height: baseFontSize,
  },
  mainText: { fontSize: baseFontSize, color: '#FFFFFF' },
});

class WeatherProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forecast: null,
    };
  }

  _handleTextChange = (event) => {
    const zip = event.nativeEvent.text;
    OpenWeatherMap.fetchZipForecast(zip).then(
      (forecast) => {
        console.log(forecast);
        this.setState({ forecast });
      },
    );
  };

  _getForecastForCoords = (lat, lon) => {
    OpenWeatherMap.fetchLatLonForecast(lat, lon).then(
      (forecast) => {
        this.setState({ forecast });
      },
    );
  };

  render() {
    let content = null;
    if (this.state.forecast !== null) {
      content = (
        <Forecast
          main={this.state.forecast.main}
          description={this.state.forecast.description}
          temp={this.state.forecast.temp}
        />
      );
    }

    return (
      <View style={styles.container}>
        <ImageBackground
          source={flowers}
          resizeMode="cover"
          style={styles.backdrop}
        >
          <View style={styles.overlay}>
            <View style={styles.row}>
              <Text style={styles.mainText}>
                Current weather for
              </Text>
              <View style={styles.zipContainer}>
                <TextInput
                  style={[styles.zipCode, styles.mainText]}
                  onSubmitEditing={this._handleTextChange}
                  underlineColorAndroid="transparent"
                />
              </View>
            </View>

            <View style={styles.row}>
              <LocationButton
                onGetCoords={this._getForecastForCoords}
              />
            </View>

            {content}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default WeatherProject;
