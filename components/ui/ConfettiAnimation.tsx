import React, { useEffect, useRef } from "react";

const ConfettiAnimation = ({ play }: { play: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!play) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const confettiCount = 100;
    const confetti = Array.from({ length: confettiCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 4 + 1,
      d: Math.random() * confettiCount,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    }));

    const drawConfetti = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confetti.forEach((piece) => {
        ctx.beginPath();
        ctx.arc(piece.x, piece.y, piece.r, 0, Math.PI * 2, false);
        ctx.fillStyle = piece.color;
        ctx.fill();
      });
    };

    const updateConfetti = () => {
      confetti.forEach((piece) => {
        piece.y += Math.cos(piece.d) + 1 + piece.r / 2;
        piece.x += Math.sin(piece.d);

        if (piece.y > canvas.height) {
          piece.y = 0;
          piece.x = Math.random() * canvas.width;
        }
      });
    };

    const animate = () => {
      drawConfetti();
      updateConfetti();
      requestAnimationFrame(animate);
    };

    animate();
  }, [play]);

  return <canvas ref={canvasRef} width={500} height={500} />;
};

export default ConfettiAnimation;