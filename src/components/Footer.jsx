import React from "react";

const Footer = props => {
  return (
    <div>
      <button className="reload-button margin-right-20" onClick={props.reloadTheGame}>
        Reload Game
      </button>
      <button className="start-button" onClick={props.startTheGame}>
        Start Game
      </button>
    </div>
  );
};

export default Footer;
