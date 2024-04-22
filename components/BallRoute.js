import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Circle, Path, Svg } from 'react-native-svg';

    const BallRoute = ({ speed }) => {
    const initialRadiusMultiplier = 30;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const start = -4.5;
    const [points, setPoints] = useState([]);
    const [radiusMultiplier, setRadiusMultiplier] = useState(initialRadiusMultiplier);

    useEffect(() => {
        const generatePoints = () => {
        const newPoints = [];
        for (let theta = start; theta > -1000; theta -= 0.01) {
            const radius = radiusMultiplier * theta - 90;
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

    }, []);

    const pathData = `M${points.join('L')}`;
    // Get the coordinates of the starting point
    const startingPoint = points[0] ? points[0].split(',') : [screenWidth / 2, screenHeight / 2];

    return (
        <View style={{ flex: 1 }}>
        <Svg height={screenHeight} width={screenWidth}>
            <Circle cx={parseFloat(startingPoint[0])} cy={parseFloat(startingPoint[1])} r={10} fill="white" />
            <Path d={pathData} fill="none" stroke="#fff" strokeWidth={3} />
        </Svg>
        </View>
    );
    };

    export default BallRoute;
