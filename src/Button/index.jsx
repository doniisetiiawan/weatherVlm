import PropTypes from 'prop-types';
import React from 'react';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import styles from './style';

function Button(props) {
  return (
    <TouchableHighlight onPress={props.onPress}>
      <View style={[styles.button, props.style]}>
        <Text>{props.label}</Text>
      </View>
    </TouchableHighlight>
  );
}

export default Button;

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.objectOf(PropTypes.any),
};

Button.defaultProps = {
  style: {},
};
