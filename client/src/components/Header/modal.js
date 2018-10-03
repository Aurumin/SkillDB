import React from 'react';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
      <div id="div-close-button">
        <button id="close-popup" onClick={handleClose}><span id="close-profile-overview">X</span></button>
      </div>
        {children}
      </section>
    </div>
  );
};

export default Modal;
