import React, { useEffect, useState } from "react";

const DIRECTIONS = {
  LEFT: "left",
  RIGHT: "right",
};
const AIM_WIDTH = 1;
const DEFAULT_TARGET_SIZE = 30;
type STATUS = "Miss" | "Hit";

const DEFAULT_AIM_SPEED = 0.5;

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default function useGame() {
  const [speed, setSpeed] = useState(DEFAULT_AIM_SPEED);
  const [aimPosition, setAimPosition] = useState(50 - AIM_WIDTH / 2);
  const [aimDirection, setAimDirection] = useState(DIRECTIONS.LEFT);
  const [targetPosition, setTargetPosition] = useState(0);
  const [targetSize, setTargetSize] = useState(DEFAULT_TARGET_SIZE);
  const [level, setLevel] = useState(1);
  const [frame, setFrame] = useState(0);
  const [status, setStatus] = useState<STATUS | null>(null);
  const [disable, setDisable] = useState<Boolean>(false);
  const generateTarget = () => {
    const newSize = targetSize > 8 ? DEFAULT_TARGET_SIZE - level : targetSize;
    const halfSize = newSize / 2;
    setTargetPosition(randomIntFromInterval(0 + halfSize, 100 - halfSize));
    setTargetSize(newSize);
  };

  const moveAim = () => {
    let newPosition = aimPosition;
    let newDirection = aimDirection;
    if (aimDirection === DIRECTIONS.LEFT) {
      newPosition -= speed;
    } else {
      newPosition += speed;
    }

    if (aimPosition < 0) {
      newPosition = 0;
      newDirection = DIRECTIONS.RIGHT;
    } else if (aimPosition > 100) {
      newPosition = 100;
      newDirection = DIRECTIONS.LEFT;
    }

    setAimPosition(newPosition);
    setAimDirection(newDirection);
  };

  const onTargetClick = () => {
    if (disable) return;
    const insideLeft = aimPosition > targetPosition - targetSize / 2;
    const insideRight = aimPosition < targetPosition + targetSize / 2;
    if (insideLeft && insideRight) {
      generateTarget();
      setLevel(level + 1);
      setStatus("Hit");
      setSpeed(speed * 1.3);
    } else {
      generateTarget();
      setLevel(1);
      setTargetSize(DEFAULT_TARGET_SIZE);
      setStatus("Miss");
      setSpeed(DEFAULT_AIM_SPEED);
    }
    setDisable(true);
    setTimeout(() => {
      setStatus(null);
      setDisable(false);
    }, 3000);
  };
  useEffect(() => {
    moveAim();

    setTimeout(() => {
      if (frame >= 60) {
        setFrame(0);
      } else {
        setFrame((frame) => frame + 1);
      }
    }, 10);
  }, [frame]);

  useEffect(() => {
    generateTarget();
  }, []);

  // useEffect(() => {
  //   if (status) {
  //     setTimeout(() => {
  //       setStatus(null);
  //     }, 3000);
  //   }
  // }, [status]);
  return {
    onTargetClick,
    status,
    targetPosition,
    targetSize,
    aimPosition,
    AIM_WIDTH,
    disable,
  };
}
