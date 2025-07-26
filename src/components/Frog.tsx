import { useEffect, useState } from 'react';

interface FrogProps {
  isHopping: boolean;
  onHopComplete: () => void;
}

const Frog = ({ isHopping, onHopComplete }: FrogProps) => {
  const [position, setPosition] = useState({ x: -100, y: 0 });
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (isHopping) {
      setPosition({ x: -100, y: window.innerHeight * 0.8 });
      
      const randomScale = 0.8 + Math.random() * 0.4;
      setScale(randomScale);

      const screenWidth = window.innerWidth + 200;
      const hopDistance = 150;
      const numHops = Math.ceil(screenWidth / hopDistance);
      const hopDuration = 300;
      const pauseDuration = 100;
      const totalDuration = numHops * (hopDuration + pauseDuration);
      
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / totalDuration, 1);
        
        if (progress >= 1) {
          setPosition({ x: -100, y: window.innerHeight * 0.8 });
          onHopComplete();
          return;
        }
        
        // Calculate which hop we're in
        const hopIndex = Math.floor(progress * numHops);
        const hopProgress = (progress * numHops) % 1;
        
        const startX = -100 + hopIndex * hopDistance;
        const currentX = startX + hopDistance * hopProgress;
        
        const hopHeight = 40;
        const yOffset = hopHeight * Math.sin(hopProgress * Math.PI);
        const currentY = window.innerHeight * 0.8 - yOffset;
        
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
