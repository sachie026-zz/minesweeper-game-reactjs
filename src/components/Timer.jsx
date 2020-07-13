import React from "react";

const Timer = (props) => {
  return (
      <div className="timer-label">
        Time: {props.time}
      </div>
  );
};

export default Timer
