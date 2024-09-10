import useVibrate from "@/hooks/useVibrate";
import React, { useRef, useEffect } from "react";

const Confetti: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = React.useState(true); // 상태를 true로 설정
  const { vibrate } = useVibrate();

  useEffect(() => {
    vibrate([200, 100, 400]);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const mp = 150; // max particles
    const particles: any[] = [];
    let angle = 0;
    let tiltAngle = 0;
    let animationComplete = false; // 초기값을 false로 설정
    let animationHandler: number;

    const particleColors = {
      colorOptions: [
        "DodgerBlue",
        "OliveDrab",
        "Gold",
        "pink",
        "SlateBlue",
        "lightblue",
        "Violet",
        "PaleGreen",
        "SteelBlue",
        "SandyBrown",
        "Chocolate",
        "Crimson",
      ],
      colorIndex: 0,
      colorIncrementer: 0,
      colorThreshold: 10,
      getColor() {
        if (this.colorIncrementer >= 10) {
          this.colorIncrementer = 0;
          this.colorIndex++;
          if (this.colorIndex >= this.colorOptions.length) {
            this.colorIndex = 0;
          }
        }
        this.colorIncrementer++;
        return this.colorOptions[this.colorIndex];
      },
    };

    class ConfettiParticle {
      x: number;
      y: number;
      r: number;
      d: number;
      color: string;
      tilt: number;
      tiltAngleIncremental: number;
      tiltAngle: number;

      constructor(color: string) {
        this.x = Math.random() * W;
        this.y = Math.random() * H - H;
        this.r = Math.floor(Math.random() * 15) + 10;
        this.d = Math.random() * mp + 10;
        this.color = color;
        this.tilt = Math.floor(Math.random() * 10) - 10;
        this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
        this.tiltAngle = 0;
      }

      draw() {
        if (ctx) {
          ctx.beginPath();
          ctx.lineWidth = this.r / 2;
          ctx.strokeStyle = this.color;
          ctx.moveTo(this.x + this.tilt + this.r / 4, this.y);
          ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 4);
          ctx.stroke();
        }
      }
    }

    function draw() {
      if (ctx) {
        ctx.clearRect(0, 0, W, H);
        particles.forEach((particle) => particle.draw());
        update();
      }
    }

    function update() {
      let remainingFlakes = 0;
      angle += 0.01;
      tiltAngle += 0.1;

      particles.forEach((particle: any, i: number) => {
        if (animationComplete) return;

        if (!isActive && particle.y < -15) {
          particle.y = H + 100;
          return;
        }

        stepParticle(particle, i);

        if (particle.y <= H) {
          remainingFlakes++;
        }
        checkForReposition(particle, i);
      });

      if (remainingFlakes === 0) {
        stopConfetti();
      }
    }

    function stepParticle(particle: any, particleIndex: number) {
      particle.tiltAngle += particle.tiltAngleIncremental;
      particle.y += (Math.cos(angle + particle.d) + 3 + particle.r / 2) / 3;
      particle.x += Math.sin(angle);
      particle.tilt = Math.sin(particle.tiltAngle - particleIndex / 3) * 15;
    }

    function checkForReposition(particle: any, index: number) {
      if (
        (particle.x > W + 20 || particle.x < -20 || particle.y > H) &&
        isActive
      ) {
        if (index % 5 > 0 || index % 2 === 0) {
          repositionParticle(
            particle,
            Math.random() * W,
            -10,
            Math.floor(Math.random() * 10) - 20
          );
        } else {
          if (Math.sin(angle) > 0) {
            repositionParticle(
              particle,
              -20,
              Math.random() * H,
              Math.floor(Math.random() * 10) - 20
            );
          } else {
            repositionParticle(
              particle,
              W + 20,
              Math.random() * H,
              Math.floor(Math.random() * 10) - 20
            );
          }
        }
      }
    }

    function repositionParticle(
      particle: any,
      xCoordinate: number,
      yCoordinate: number,
      tilt: number
    ) {
      particle.x = xCoordinate;
      particle.y = yCoordinate;
      particle.tilt = tilt;
    }

    function startConfetti() {
      W = window.innerWidth;
      H = window.innerHeight;
      if (canvas) {
        canvas.width = W;
        canvas.height = H;
      }
      (function animloop() {
        if (animationComplete) return;
        animationHandler = requestAnimationFrame(animloop);
        draw();
      })();
    }

    function stopConfetti() {
      animationComplete = true;
      if (ctx === undefined) return;
      if (ctx) {
        ctx.clearRect(0, 0, W, H);
      }
    }

    function restartConfetti() {
      stopConfetti();
      setTimeout(() => {
        particles.length = 0;
        animationComplete = false;
        for (let i = 0; i < mp; i++) {
          const particleColor = particleColors.getColor();
          particles.push(new ConfettiParticle(particleColor));
        }
        startConfetti();
      }, 100);
    }

    if (isActive) {
      restartConfetti();
    }

    return () => {
      stopConfetti();
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1000,
      }}
    />
  );
};

export default Confetti;
