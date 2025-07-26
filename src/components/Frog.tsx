import { useEffect, useState } from 'react';

interface FrogProps {
  isHopping: boolean;
  onHopComplete: () => void;
}

const Frog = ({ isHopping, onHopComplete }: FrogProps) => {
  const [position, setPosition] = useState({ x: -100, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (isHopping) {
      // Start from left side of screen
      setPosition({ x: -100, y: window.innerHeight / 2 });
      
      // Random scale for variety
      const randomScale = 0.8 + Math.random() * 0.4; // Between 0.8 and 1.2
      setScale(randomScale);

      // Create distinct hops across the screen
      const screenWidth = window.innerWidth + 200; // Extra space for off-screen
      const hopDistance = 150; // Distance of each hop
      const numHops = Math.ceil(screenWidth / hopDistance);
      const hopDuration = 300; // Duration of each hop in ms
      const pauseDuration = 100; // Pause between hops in ms
      const totalDuration = numHops * (hopDuration + pauseDuration);
      
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / totalDuration, 1);
        
        if (progress >= 1) {
          // Reset position and notify completion
          setPosition({ x: -100, y: window.innerHeight / 2 });
          onHopComplete();
          return;
        }
        
        // Calculate which hop we're in
        const hopIndex = Math.floor(progress * numHops);
        const hopProgress = (progress * numHops) % 1;
        
        // Calculate x position
        const startX = -100 + hopIndex * hopDistance;
        const endX = startX + hopDistance;
        const currentX = startX + hopDistance * hopProgress;
        
        // Calculate y position with parabolic arc for each hop
        const hopHeight = 80; // Maximum height of each hop
        const yOffset = hopHeight * Math.sin(hopProgress * Math.PI);
        const currentY = window.innerHeight / 2 - yOffset;
        
        setPosition({ x: currentX, y: currentY });
        
        requestAnimationFrame(animate);
      };
      
      requestAnimationFrame(animate);
    }
  }, [isHopping, onHopComplete]);

  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-75"
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
    >
      <img
        src="/frog.svg"
        alt="Hopping frog"
        className="w-20 h-20"
        style={{
          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
        }}
      />
    </div>
  );
};

export default Frog; 