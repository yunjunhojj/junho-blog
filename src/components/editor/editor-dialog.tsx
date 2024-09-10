import styles from "./editor-dialog.module.css";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Editor from "./md-editor";

type EditorDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  content: React.ReactNode;
};

const EditorDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
}: EditorDialogProps) => {
  return (
    <Dialog open={open} onClose={() => onClose()} className={styles.dialog}>
      <div className={styles.dialogContent}>
        <DialogPanel className={styles.dialogPanel}>
          <DialogTitle className={styles.dialogTitle}>{title}</DialogTitle>
          <Description className={styles.description}>
            <p>{content}</p>
          </Description>
          <Editor value={title} height="200px" onChange={() => {}} />
          <div className={styles.buttonGroup}>
            <button
              onClick={() => onConfirm()}
              className={styles.confirmButton}
            >
              Confirm
            </button>
            <button onClick={() => onClose()} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default EditorDialog;
