import React from "react";

const Header = (props) => {
  return (
    <div className="header-container">
      <div className="input-label">
        Width  
      </div>
      <input className="input-box" type="Text" value={props.m} onChange={props.updateM}/>
      <div className="input-label">
        Height  
      </div>
      <input className="input-box" type="Text" value={props.n} onChange={props.updateN} />
      <div className="input-label">
        Total Mines  
      </div>
      <input className="input-box" type="Text" value={props.mines} onChange={props.updateMinesCount}/>
      <button className="update-grid-button margin-top-0 margin-left-20" onClick={props.reloadTheGame}>
          Update
      </button>
    </div>
  );
};

export default Header
