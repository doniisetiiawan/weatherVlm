import PropTypes from 'prop-types';
import React from 'react';
import { ImageBackground } from 'react-native';
import flowers from './flowers.png';
import styles from './style';

function PhotoBackdrop(props) {
  return (
    <ImageBackground
      source={flowers}
      resizeMode="cover"
      style={styles.backdrop}
    >
      {props.children}
    </ImageBackground>
  );
}

export default PhotoBackdrop;

PhotoBackdrop.propTypes = {
  children: PropTypes.element.isRequired,
};
