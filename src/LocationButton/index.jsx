import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from '../Button';

const style = { backgroundColor: '#DDDDDD' };

class LocationButton extends Component {
  _onPress = () => {
    // eslint-disable-next-line no-undef
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => {
        this.props.onGetCoords(
          initialPosition.coords.latitude,
          initialPosition.coords.longitude,
        );
      },
      (error) => {
        console.log(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  };

  render() {
    return (
      <Button
        label="Use Current Location"
        style={style}
        onPress={this._onPress}
      />
    );
  }
}

export default LocationButton;

LocationButton.propTypes = {
  onGetCoords: PropTypes.func.isRequired,
};
