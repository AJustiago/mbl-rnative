import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { Circle, Path, Svg } from 'react-native-svg';

const BallRoute = () => {
    const initialRadiusMultiplier = 30;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const start = -4.5;
    const [radiusMultiplier, setRadiusMultiplier] = useState(initialRadiusMultiplier);
    const [ballPosition, setBallPosition] = useState({ x: screenWidth / 2, y: screenHeight / 2 }); 
    const [isMoving, setIsMoving] = useState(false);
    const [pathPoints, setPathPoints] = useState([]);
    const [startTime, setStartTime] = useState(null);

    useEffect(() => {
        const initialRadius = radiusMultiplier * start - 90;
        const initialX = screenWidth / 2 + initialRadius * Math.cos(start);
        const initialY = screenHeight / 2 + initialRadius * Math.sin(start);
        setBallPosition({ x: initialX, y: initialY });
    }, [radiusMultiplier, screenWidth, screenHeight]);

    useEffect(() => {
        const generatePathPoints = () => {
            const newPoints = [];
            for (let theta = start; theta > -1000; theta -= 0.01) {
                const radius = radiusMultiplier * theta - 90;
                const x = screenWidth / 2 + radius * Math.cos(theta);
                const y = screenHeight / 2 + radius * Math.sin(theta);
                newPoints.push({ x, y });
            }
            setPathPoints(newPoints);
        };

        generatePathPoints();
    }, [screenWidth, screenHeight, radiusMultiplier]);

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
                const distanceTraveled = (elapsedTime) * 8;
                const currentPointIndex = Math.floor((distanceTraveled / totalPathLength) * pathPoints.length);
                if (currentPointIndex < pathPoints.length) {
                    setBallPosition(pathPoints[currentPointIndex]);
                    requestAnimationFrame(moveBall);
                } else {
                    setIsMoving(false);
                }
            };

            requestAnimationFrame(moveBall);
        }
    }, [isMoving, pathPoints, startTime]);

    const getPathLength = (points) => {
        let totalLength = 0;
        for (let i = 1; i < points.length; i++) {
            const dx = points[i].x - points[i - 1].x;
            const dy = points[i].y - points[i - 1].y;
            totalLength += Math.sqrt(dx * dx + dy * dy);
        }
        return totalLength;
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Svg height="100%" width="100%" onClick={startMoving}>
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
                    strokeWidth={3}
                />
            </Svg>
        </div>
    );
};

export default BallRoute;
