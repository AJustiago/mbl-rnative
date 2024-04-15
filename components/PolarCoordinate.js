import React, { useRef, useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const PolarCoordinate = ({ speed }) => {
  const radiusMultiplier = 30;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [points, setPoints] = useState([]);

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
  }, [speed, screenWidth, screenHeight]);

  const pathData = `M${points.join('L')}`;

  return (
    <View style={{ flex: 1 }}>
      <Svg height={screenHeight} width={screenWidth}>
        <Path d={pathData} fill="none" stroke="black" strokeWidth={3} />
      </Svg>
    </View>
  );
};

export default PolarCoordinate;
