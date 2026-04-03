import React from 'react';

const AuthButton = ({ text = "Log In", onClick, colorHex = "#2e8eff", colorRgb = "46, 142, 255" }) => {
  return (
    <>
      <div 
        aria-label={`${text} Button`} 
        tabIndex={0} 
        role="button" 
        className="auth-btn-profile" 
        onClick={onClick}
        style={{
          '--btn-hex': colorHex,
          '--btn-rgb': colorRgb
        }}
      >
        <div className="auth-btn-inner">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g data-name="Layer 2" id="Layer_2">
              <path d="m15.626 11.769a6 6 0 1 0 -7.252 0 9.008 9.008 0 0 0 -5.374 8.231 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 9.008 9.008 0 0 0 -5.374-8.231zm-7.626-4.769a4 4 0 1 1 4 4 4 4 0 0 1 -4-4zm10 14h-12a1 1 0 0 1 -1-1 7 7 0 0 1 14 0 1 1 0 0 1 -1 1z" />
            </g>
          </svg>
          <p>{text}</p>
        </div>
      </div>
      <style jsx>{`
        .auth-btn-profile {
          width: 131px;
          height: 51px;
          border-radius: 15px;
          cursor: pointer;
          transition: 0.3s ease;
          background: linear-gradient(
            to bottom right,
            var(--btn-hex) 0%,
            rgba(var(--btn-rgb), 0) 30%
          );
          background-color: rgba(var(--btn-rgb), 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .auth-btn-profile:hover,
        .auth-btn-profile:focus {
          background-color: rgba(var(--btn-rgb), 0.7);
          box-shadow: 0 0 10px rgba(var(--btn-rgb), 0.5);
          outline: none;
        }

        .auth-btn-inner {
          width: 127px;
          height: 47px;
          border-radius: 13px;
          background-color: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          color: #fff;
          font-weight: 600;
          font-size: 14px;
        }

        .auth-btn-inner svg {
          width: 27px;
          height: 27px;
          fill: #fff;
        }

        p {
          margin: 0;
          font-family: inherit;
        }
      `}</style>
    </>
  );
}

export default AuthButton;
