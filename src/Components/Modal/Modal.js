import React from "react";
import classes from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../hoc/Auxiliary";

const Modal = ({ title, value, cancel, save, inputChange }) => {
  return (
    <Aux>
      <Backdrop show clicked={cancel} />
      <div className={classes.Modal}>
        <div className={classes.title}> {title}</div>
        <textarea
          rows={8}
          type="text"
          value={value}
          onChange={event => inputChange(event)}
        />
        <div className={classes.Buttons}>
          <button onClick={cancel}>Отмена</button>
          <button onClick={save}>Сохранить</button>
        </div>
      </div>
    </Aux>
  );
};

export default Modal;
