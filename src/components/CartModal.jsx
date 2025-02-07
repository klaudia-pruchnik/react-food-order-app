import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import useDialogHandle from "../hooks/useDialogHandle";
import Cart from "./Cart";

const CartModal = forwardRef(function Modal({ title, actions }, ref) {
  const dialog = useRef();

  useDialogHandle(ref, dialog);

  return createPortal(
    <dialog className="modal cart" ref={dialog}>
      <h2>{title}</h2>
      <Cart />
      <p className="modal-actions">{actions}</p>
    </dialog>,
    document.getElementById("modal")
  );
});

export default CartModal;
