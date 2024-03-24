import React from 'react'

const TimeLine = () => {

  const currentTime = new Date();
  // Array to hold 24 hours
  const hours = Array.from({ length: 24 }, (_, i) => i + 1);


  return (
    <>
      <div className="card card_timeline">
        <div className="time_scal_div">
          {hours.map(hour => (
            <div key={hour} className="hour">
              {hour}:00
            </div>
          ))}
        </div>
        <p className='timeLine_tag'>timeline</p>
      </div>
    </>
  )
}

export default TimeLine
