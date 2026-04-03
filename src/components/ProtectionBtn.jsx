import React from 'react';

const ProtectionBtn = ({ text = "Start My Protection", onClick, children }) => {
  return (
    <>
      <div className="action-button-wrapper" onClick={(e) => { e.preventDefault(); onClick && onClick(); }}>
        <div className="button">
          <button className="anchor flex items-center justify-center">
            <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {text}
                {children}
            </span>
          </button>
        </div>
      </div>
      <style jsx>{`
        .action-button-wrapper {
          display: inline-block;
        }

        .anchor {
          text-decoration: none;
          color: #fff;
          display: inline-block;
          font-family: 'Sora', sans-serif;
          font-weight: 700;
          font-size: 1.25rem;
          border-radius: 50px;
          border: 2px solid #430BB8;
          padding: 18px 48px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          background: transparent;
          outline: none;
        }

        .anchor:hover {
          color: #fff;
        }

        .button button::before {
          position: absolute;
          content: "";
          z-index: 0;
          background-color: #430BB8;
          left: -5px;
          right: -5px;
          bottom: -5px;
          height: 111%;
          transition: all .3s ease;
        }

        .button button:hover::before {
          height: 11%;
        }

        .button span {
          position: relative;
          z-index: 2;
          transition: all .3s ease;
        }
      `}</style>
    </>
  );
};

export default ProtectionBtn;
