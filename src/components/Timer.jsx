import React from "react";

const Timer = (props) => {
  function timeInFormat(time){
    const mod = time % 60 
    const rem = time / 60
    return `${Math.round(rem)}:${mod} mins` 
  }
  return (
      <div className="timer-label">
        Time: {timeInFormat(props.time)}
      </div>
  );
};

export default Timer
