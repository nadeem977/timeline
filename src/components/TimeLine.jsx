import React from 'react';

const TimeLine = () => {
  const days = Array.from({ length: 30 }, (_, dayIndex) => {
    const hours = Array.from({ length: 24 }, (_, hourIndex) => {
      const hour = hourIndex % 12 === 0 ? 12 : hourIndex % 12;
      const period = hourIndex < 12 ? 'AM' : 'PM';
      return (
        <div key={hourIndex} className="hour">
          {hour === 12 ? '12' : hour}:00 <span className="am_pm">{period}</span>
        </div>
      );
    });
    return (
      <div key={dayIndex} className="day">
        <p className='text-sm flex items-center'><span>Day</span> {dayIndex + 1}</p>
        <div className="hours">{hours}</div>
      </div>
    );
  });

  return ( 
    <>
      <div className="card card_timeline">
        <div className="time_scal_div">{days}</div>
        <p className="timeLine_tag">timeline</p>
      </div>
    </>
  );
};

export default TimeLine;
