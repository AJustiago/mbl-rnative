import React, { useRef, useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const PolarCoordinate = ({ speed }) => {
  const initialRadiusMultiplier = 30;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [points, setPoints] = useState([]);
  const [radiusMultiplier, setRadiusMultiplier] = useState(initialRadiusMultiplier);
  const [colorIndex, setColorIndex] = useState(0);
  const rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];

  useEffect(() => {
    const generatePoints = () => {
      const newPoints = [];
      for (let theta = 0; theta < 1000; theta += 0.01) {
        const radius = radiusMultiplier * theta;
        const x = screenWidth / 2 + radius * Math.cos(theta);
        const y = screenHeight / 2 + radius * Math.sin(theta);
        newPoints.push(`${x},${y}`);
      }
      setPoints(newPoints);
    };

    const intervalId = setInterval(generatePoints, speed);

    return () => clearInterval(intervalId);
  }, [speed, radiusMultiplier, screenWidth, screenHeight]);

  useEffect(() => {
    const zoomOutIntervalId = setInterval(() => {
      // Gradually increase the radius multiplier for zoom-out effect
      setRadiusMultiplier((prevMultiplier) => prevMultiplier - 0.1);
    }, 1000); // Increase radius multiplier every 1 second for a slow zoom out effect

    const colorIntervalId = setInterval(() => {
      // Change color every 3 seconds
      setColorIndex((prevIndex) => (prevIndex + 1) % rainbowColors.length);
    }, 3000);

    return () => {
      clearInterval(zoomOutIntervalId);
      clearInterval(colorIntervalId);
    };
  }, []);

  const pathData = `M${points.join('L')}`;

  return (
    <View style={{ flex: 1 }}>
      <Svg height={screenHeight} width={screenWidth}>
        <Path d={pathData} fill="none" stroke={rainbowColors[colorIndex]} strokeWidth={3} />
      </Svg>
    </View>
  );
};

export default PolarCoordinate;
