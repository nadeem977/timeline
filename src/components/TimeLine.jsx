import React from 'react';

const TimeLine = () => {
  const today = new Date();
  const days = Array.from({ length: 30 }, (_, dayIndex) => {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + dayIndex);
    const dateStr = currentDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });

    const hours = Array.from({ length: 24 }, (_, hourIndex) => {
      const hour = (hourIndex + 1) % 12 === 0 ? 12 : (hourIndex + 1) % 12;
      const period = hourIndex < 12 ? 'AM' : 'PM';
      const displayHour = hour < 10 ? '0' + hour : hour;
      const displayTime = displayHour + ":00 " + period;

      // Show date only for the first hour of each day
      const showDate = hourIndex === 0 && period === 'AM';

      return (
        <div className='flex flex-col'  key={hourIndex}>
          {showDate && <p className='days'>{dateStr}</p>}
          <div className="hour">
            {displayTime}
          </div>
        </div>
      );
    });

    return (
      <div key={dayIndex} className="day min-w-[120px]">
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
