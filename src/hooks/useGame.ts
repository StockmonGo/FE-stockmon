import React, { useEffect, useState } from "react";

const DIRECTIONS = {
  LEFT: "left",
  RIGHT: "right",
};
const AIM_WIDTH = 1;
const DEFAULT_TARGET_SIZE = 30;
type STATUS = "Miss" | "Good" | "Perfect";
const MAX_GAGE = 70;
const DEFAULT_AIM_SPEED = 0.5;
const START_AIM_POSITION = 2;
const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default function useGame() {
  const [gage, setGage] = useState(MAX_GAGE);
  const [speed, setSpeed] = useState(DEFAULT_AIM_SPEED);
  const [aimPosition, setAimPosition] = useState(START_AIM_POSITION);
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

    if (aimPosition < 2) {
      newPosition = 2;
      newDirection = DIRECTIONS.RIGHT;
    } else if (aimPosition > 99) {
      newPosition = 98;
      newDirection = DIRECTIONS.LEFT;
    }

    setAimPosition(newPosition);
    setAimDirection(newDirection);
  };

  const onTargetClick = () => {
    if (disable) return;
    const insideLeft = aimPosition > targetPosition - targetSize / 2;
    const insideRight = aimPosition < targetPosition + targetSize / 2;
    const insidePerfectLeft = aimPosition > targetPosition - targetSize / 6;
    const insidePerfectRight = aimPosition < targetPosition + targetSize / 6;
    let curGage = gage;
    if (insidePerfectLeft && insidePerfectRight) {
      setLevel(level + 1);
      setStatus("Perfect");
      curGage = gage - 70 >= 0 ? gage - 70 : 0;
    } else if (insideLeft && insideRight) {
      setLevel(level + 1);
      setStatus("Good");
      curGage = gage - 25 >= 0 ? gage - 25 : 0;
      setSpeed(speed * 1.3);
    } else {
      setLevel(1);
      setTargetSize(DEFAULT_TARGET_SIZE);
      setStatus("Miss");
      setSpeed(DEFAULT_AIM_SPEED);
    }

    setDisable(true);
    setGage(curGage);
    setTimeout(() => {
      if (curGage > 0) {
        setStatus(null);
        setDisable(false);
        generateTarget();
        setAimPosition(START_AIM_POSITION);
      }
    }, 3000);
  };

  useEffect(() => {
    if (!disable) {
      moveAim();
    }

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
    gage,
  };
}
