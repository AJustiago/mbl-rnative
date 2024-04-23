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
    const [ballPosition, setBallPosition] = useState({ x: screenWidth / 2, y: screenHeight / 2 }); 
    const [isMoving, setIsMoving] = useState(false);
    const [isReady, setIsReady] = useState(false); 

    useEffect(() => {
        const generatePoints = () => {
            const newPoints = [];
            for (let theta = start; theta > -1000; theta -= 0.01) {
                const radius = radiusMultiplier * theta - 90;
                const x = screenWidth / 2 + radius * Math.cos(theta);
                const y = screenHeight / 2 + radius * Math.sin(theta);
                newPoints.push({ x, y });
            }
            setPoints(newPoints);
            if (!isReady) {
                setBallPosition(newPoints[0]);
                setIsReady(true);
            }
        };

        const intervalId = setInterval(generatePoints, speed);

        return () => clearInterval(intervalId);
    }, [speed, radiusMultiplier, screenWidth, screenHeight, isReady]);

    const moveBall = () => {
        setIsMoving(true);
        let index = 0;
        const moveAnimation = () => {
            if (index < points.length) {
                setBallPosition(points[index]);
                index++;
                requestAnimationFrame(moveAnimation);
            } else {
                setIsMoving(false);
            }
        };
        requestAnimationFrame(moveAnimation);
    };

    const pathData = `M${points.map(point => `${point.x},${point.y}`).join('L')}`;

    return (
        <div style={{ width: screenWidth, height: screenHeight }}>
            <Svg height={screenHeight} width={screenWidth}>
                {isReady && (
                    <Circle
                        cx={ballPosition.x}
                        cy={ballPosition.y}
                        r={10}
                        fill="white"
                        onClick={moveBall}
                        style={{ cursor: 'pointer' }}
                    />
                )}
                <Path d={pathData} fill="none" stroke="" strokeWidth={3} />
            </Svg>
        </div>
    );
};

export default BallRoute;
