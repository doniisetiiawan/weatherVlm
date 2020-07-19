import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  AsyncStorage,
} from 'react-native';
import Forecast from './Forecast/forecast';
import OpenWeatherMap from './open_weather_map';
import LocationButton from './LocationButton';
import PhotoBackdrop from './PhotoBackdrop';
import textStyles from './styles/typography';

const STORAGE_KEY = '@SmarterWeather:zip';
const baseFontSize = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    width: 77,
    height: baseFontSize,
  },
});

class WeatherProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forecast: null,
    };
  }

  componentDidMount = () => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => {
        if (value !== null) {
          this._getForecastForZip(value);
        }
      })
      .catch((error) => console.error(
        `AsyncStorage error: ${error.message}`,
      ))
      .done();
  };

  _getForecastForZip = (zip) => {
    AsyncStorage.setItem(STORAGE_KEY, zip)
      .then(() => console.log(`Saved selection to disk: ${zip}`))
      .catch((error) => console.error(
        `AsyncStorage error: ${error.message}`,
      ))
      .done();

    OpenWeatherMap.fetchZipForecast(zip).then(
      (forecast) => {
        this.setState({ forecast });
      },
    );
  };

  _handleTextChange = (event) => {
    const zip = event.nativeEvent.text;
    this._getForecastForZip(zip);
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
        <PhotoBackdrop>
          <View style={styles.overlay}>
            <View style={styles.row}>
              <Text style={textStyles.mainText}>
                Current weather for
              </Text>
              <View style={styles.zipContainer}>
                <TextInput
                  style={[styles.zipCode, textStyles.mainText]}
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
        </PhotoBackdrop>
      </View>
    );
  }
}

export default WeatherProject;
