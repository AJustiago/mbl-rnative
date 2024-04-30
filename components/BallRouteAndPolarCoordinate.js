import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Circle, Path, Svg } from 'react-native-svg';

const BallRouteAndPolarCoordinate = ({ isPolar, speed }) => {
    const initialRadiusMultiplier = 30;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const start = -4.5;

    const [points, setPoints] = useState([]);
    const [radiusMultiplier, setRadiusMultiplier] = useState(initialRadiusMultiplier);
    const [ballPosition, setBallPosition] = useState({ x: screenWidth / 2, y: screenHeight / 2 }); 
    const [isMoving, setIsMoving] = useState(false);
    const [pathPoints, setPathPoints] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [colorIndex, setColorIndex] = useState(0);
    const [linePos, setLinePos] = useState(90);
    const rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];

    useEffect(() => {
        const initialRadius = radiusMultiplier * start - linePos;
        const initialX = screenWidth / 2 + initialRadius * Math.cos(start);
        const initialY = screenHeight / 2 + initialRadius * Math.sin(start);
        setBallPosition({ x: initialX, y: initialY });
    }, [radiusMultiplier, screenWidth, screenHeight]);

    const getPathLength = (points) => {
        let totalLength = 0;
        for (let i = 1; i < points.length; i++) {
            const dx = points[i].x - points[i - 1].x;
            const dy = points[i].y - points[i - 1].y;
            totalLength += Math.sqrt(dx * dx + dy * dy);
        }
        return totalLength;
    };

    const pathData = `M${points.join('L')}`;

    useEffect(() => {
        const generatePathPoints = () => {
            const newPoints = [];
            for (let theta = start; theta > -1000; theta -= 0.01) {
                const radius = radiusMultiplier * theta - linePos;
                const x = screenWidth / 2 + radius * Math.cos(theta);
                const y = screenHeight / 2 + radius * Math.sin(theta);
                newPoints.push({ x, y });
            }
            setPathPoints(newPoints);
        };

        generatePathPoints();
    }, [screenWidth, screenHeight, radiusMultiplier, linePos]);

    useEffect(() => {
        const generatePoints = () => {
            const newPoints = [];
            for (let theta = 0; theta > -1000; theta -= 0.01) {
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
        const colorIntervalId = setInterval(() => {
            setColorIndex((prevIndex) => (prevIndex + 1) % rainbowColors.length);
        }, 3000);

        return () => {
            clearInterval(colorIntervalId);
        };
    }, []);

    const startMoving = () => {
        setStartTime(performance.now());
        setIsMoving(true);
    };

    useEffect(() => {
        if (isMoving) {
            const moveBall = () => {
                const currentTime = performance.now();
                const elapsedTime = currentTime - startTime;
                const totalPathLength = getPathLength(pathPoints);
                const distanceTraveled = elapsedTime * 8;
                const currentPointIndex = Math.floor((distanceTraveled / totalPathLength) * pathPoints.length);
                if (currentPointIndex < pathPoints.length) {
                    setBallPosition(pathPoints[currentPointIndex]);
                    setLinePos(prevPos => {
                        const newPos = prevPos - 20;
                        return newPos < 10 ? 90 : newPos;
                    });
                    console.log(linePos)
                    requestAnimationFrame(moveBall);
                } else {
                    setIsMoving(false);
                }
            };
            requestAnimationFrame(moveBall);
        }
    }, [isMoving, pathPoints, startTime, linePos]);

    return (
        <View style={{ flex: 1 }}>
            <Svg height={screenHeight} width={screenWidth} onClick={startMoving}>
                {isPolar ? (
                    <Path d={pathData} fill="none" stroke={rainbowColors[colorIndex]} strokeWidth={3} />
                ) : (
                    <>
                        <Circle
                            cx={ballPosition.x}
                            cy={ballPosition.y}
                            r={10}
                            fill="white"
                            style={{ cursor: 'pointer' }}
                        />
                        <Path
                            d={`M${pathPoints.map(point => `${point.x},${point.y}`).join('L')}`}
                            fill="none"
                            stroke=""
                        />
                    </>
                )}
            </Svg>
        </View>
    );
};

export default BallRouteAndPolarCoordinate;
