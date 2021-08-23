import styles from "./modal.module.css";
import React from "react";

interface ModalProps {
    onCloseEventHandler: () => void,
        children: React.ReactNode;
}

export const Modal = ({onCloseEventHandler, children}: ModalProps) => {
  return (
      <div className={styles.overlay}>
        <article className={styles.modalContainer}>
      <button onClick={() => onCloseEventHandler()}>Cerrar</button>
      {children}
    </article>  
      </div>
  );
};
