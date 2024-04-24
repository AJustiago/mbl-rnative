import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { Circle, Path, Svg } from 'react-native-svg';

const BallRoute = ({ gravity }) => {
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

        const intervalId = setInterval(generatePoints, 16); // Update every 16ms (approximately 60 FPS)

        return () => clearInterval(intervalId);
    }, [radiusMultiplier, screenWidth, screenHeight, isReady]);

    const applyGravity = () => {
        const gravityVector = { x: screenWidth / 2 - ballPosition.x, y: screenHeight / 2 - ballPosition.y };
        const gravityMagnitude = Math.sqrt(gravityVector.x ** 2 + gravityVector.y ** 2);
        const normalizedGravity = { x: gravityVector.x / gravityMagnitude, y: gravityVector.y / gravityMagnitude };
        const gravityForce = { x: gravity * normalizedGravity.x, y: gravity * normalizedGravity.y };
        setBallPosition(prevPosition => ({
            x: prevPosition.x + gravityForce.x,
            y: prevPosition.y + gravityForce.y
        }));
    };

    const handleClick = () => {
        if (!isMoving) {
            setIsMoving(true);
            const flapForce = -10; // Adjust the force of the flap
            setBallPosition(prevPosition => ({ ...prevPosition, y: prevPosition.y + flapForce }));
            setTimeout(() => setIsMoving(false), 100); // Reset moving state after a short delay
        }
    };

    useEffect(() => {
        const gravityInterval = setInterval(applyGravity, 16); // Apply gravity every 16ms (approximately 60 FPS)
        return () => clearInterval(gravityInterval);
    }, [gravity]);

    const pathData = `M${points.map(point => `${point.x},${point.y}`).join('L')}`;

    return (
        <div style={{ width: screenWidth, height: screenHeight }} onClick={handleClick}>
            <Svg height={screenHeight} width={screenWidth}>
                {isReady && (
                    <Circle
                        cx={ballPosition.x}
                        cy={ballPosition.y}
                        r={10}
                        fill="white"
                        style={{ cursor: 'pointer' }}
                    />
                )}
                <Path d={pathData} fill="none" stroke="#ffff" strokeWidth={3} />
            </Svg>
        </div>
    );
};

export default BallRoute;
