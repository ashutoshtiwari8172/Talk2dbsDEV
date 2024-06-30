import React, { useEffect, useState } from 'react';

const Countdown = () => {
  const calculateTimeLeft = () => {
    const difference = new Date(`2024-07-29`) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown text-black text-4xl">
      <span>{timeLeft.days.toString().padStart(2, '0') || '00'}</span> :{' '}
      <span>{timeLeft.hours.toString().padStart(2, '0') || '00'}</span> :{' '}
      <span>{timeLeft.minutes.toString().padStart(2, '0') || '00'}</span> :{' '}
      <span>{timeLeft.seconds.toString().padStart(2, '0') || '00'}</span>
    </div>
  );
};

export default Countdown;
