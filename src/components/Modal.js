import React, { useState, useRef, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom';
import '../css/modal.css';

const overLays = [];
const Modal = ({ onClose, children, locked, title }) => {
  const [active, setActive] = useState(false);
  const [modalEl, setModalEl] = useState(null);
  const ref = useRef(null);
  const clickHandler = useCallback((e) => {
    if (e.target === ref.current) {
      !locked && onClose && onClose();
    }
  }, [onClose, locked]);
  const keyHandler = useCallback((mEl, e) => {
    if (mEl === overLays[overLays.length - 1]) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    const el = document.createElement("div");
    el.id = new Date().getTime();
    setModalEl(el);
    document.body.appendChild(el);
    overLays.push(el);
    const previousOverlay = overLays[overLays.length - 1];
    if (previousOverlay) {
      previousOverlay.setAttribute("inert", "true");
    }
    setActive(true);
    const rootEl = document.getElementById("root");
    rootEl.setAttribute("inert", true);
    document.activeElement.blur();
    document.addEventListener("click", clickHandler);
    document.addEventListener("keydown", keyHandler.bind(this, el));
    return () => {
      document.body.removeChild(el);
      document.removeEventListener("click", clickHandler);
      document.removeEventListener("keydown", keyHandler);
      rootEl.removeAttribute("inert");
      overLays.pop();
      const previousOverlay = overLays[overLays.length - 1];
      if (previousOverlay) {
        previousOverlay.removeAttribute("inert");
      }
    }
  }, [clickHandler, keyHandler]);
  return <>
    {active && ReactDOM.createPortal(<div ref={ref} className="modal-container">
      <div className="modal-content">
        <header className="header">
          <h3 className="title">
            {title || "Modal Title"}
          </h3>
          <span tabIndex="0" className="closeIcon" onClick={onClose}>X</span>
        </header>
        <div className="body">
          {children}
        </div>
      </div>
    </div>, modalEl)}
  </>
}

export default Modal;