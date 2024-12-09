import React, {useEffect, useState} from 'react';
import CompassHeading from 'react-native-compass-heading';
import {View, Text, Animated} from 'react-native';
import {styles} from './styles';

const Compass = () => {
  const [heading, setHeading] = useState(0);
  const rotateValue = new Animated.Value(0);

  useEffect(() => {
    const degreeUpdateRate = 3;

    CompassHeading.start(degreeUpdateRate, ({heading, accuracy}) => {
      console.log('CompassHeading => ', heading, accuracy);
      setHeading(heading);

      // Rotate the compass image
      Animated.timing(rotateValue, {
        toValue: heading,
        duration: 100,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      CompassHeading.stop();
    };
  }, []);

  const rotateStyle = {
    transform: [{rotate: `${-heading}deg`}],
  };

  const getCardinalDirection = () => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(heading / 45) % 8;
    return directions[index];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Compass App</Text>
      <View style={styles.compassContainer}>
        <Animated.Image
          source={require('../images/compass.png')}
          style={[styles.compassImage, rotateStyle]}
        />
      </View>
      <Text style={styles.headingValue}>{`Heading: ${heading.toFixed(
        2,
      )}°`}</Text>
      <Text
        style={
          styles.cardinalDirection
        }>{`Direction: ${getCardinalDirection()}`}</Text>
    </View>
  );
};

export default Compass;
