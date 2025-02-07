import { useImperativeHandle } from "react";

export default function useDialogHandle(ref, dialogRef) {
  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialogRef.current.showModal();
      },
      close: () => {
        dialogRef.current.close();
      },
    };
  });
}
