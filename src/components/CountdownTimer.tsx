
import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 193,
    hours: 7,
    minutes: 0,
    seconds: 10
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { days, hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center space-x-4 md:space-x-12 mb-8">
      <div className="text-center">
        <div className="text-3xl md:text-6xl font-light text-white mb-2">{timeLeft.days}</div>
        <div className="text-xs md:text-sm text-gray-300 tracking-widest">DIAS</div>
      </div>
      <div className="text-center">
        <div className="text-3xl md:text-6xl font-light text-white mb-2">{timeLeft.hours}</div>
        <div className="text-xs md:text-sm text-gray-300 tracking-widest">HORAS</div>
      </div>
      <div className="text-center">
        <div className="text-3xl md:text-6xl font-light text-white mb-2">{timeLeft.minutes}</div>
        <div className="text-xs md:text-sm text-gray-300 tracking-widest">MINUTOS</div>
      </div>
      <div className="text-center">
        <div className="text-3xl md:text-6xl font-light text-white mb-2">{timeLeft.seconds}</div>
        <div className="text-xs md:text-sm text-gray-300 tracking-widest">SEGUNDOS</div>
      </div>
    </div>
  );
};

export default CountdownTimer;
