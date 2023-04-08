import React from "react";

const HeaderLeft = () => {
  return (
    <div className="header__left">
      <button className="header__apps-btn">
        <img src="./assets/icons/9-dots.svg" alt="" />
      </button>

      <div className="header__left--todo">
        <a href="localhost:3000">
          <span>To Do</span>
        </a>
      </div>
    </div>
  );
};

export default HeaderLeft;
