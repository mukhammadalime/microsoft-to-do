import React, { useState } from "react";

const MyAccount = React.forwardRef<HTMLDivElement, { clicked: boolean }>(
  ({ clicked }, ref) => {
    const [fullNameHovered, setFullNameHovered] = useState(() => false);
    const onMouseEnter = () => setTimeout(() => setFullNameHovered(true), 300);
    const onMouseLeave = () => setFullNameHovered(false);

    return (
      <div
        className={`my-account${clicked ? " my-account__clicked" : ""}`}
        ref={ref}
      >
        <div className="my-account__top">
          <div className="my-account__logo">
            <img src="./assets/icons/microsoft.svg" alt="" />
            Microsoft
          </div>
          <h6 className="my-account__logout">Sign out</h6>
        </div>

        <div className="my-account__main">
          <div className="my-account__avatar">
            <img src="./assets/images/default.jpg" alt="" />
          </div>

          <div className="my-account__details">
            <div>
              {fullNameHovered && (
                <div
                  className="fullname"
                  children=" Mukhammadali Kurbonaliev"
                />
              )}

              <h2 onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                Mukhammadali Kurbonaliev
              </h2>
            </div>
            <h3>mukhammadalime@gmail.com</h3>
            <a href="/">My Microsoft account</a>
            <a href="/">My profile</a>
          </div>
        </div>
      </div>
    );
  }
);

export default MyAccount;
