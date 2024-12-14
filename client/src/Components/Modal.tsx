import ReactDOM from 'react-dom';
import { type ReactNode } from "react";

const Modal = ({ children }: {children: ReactNode}) => {
    return ReactDOM.createPortal(
      <div className="modal">
        {children}
      </div>,
      document.getElementById('modal-root')! // The DOM node to render the portal into
    );
  };

  export default Modal