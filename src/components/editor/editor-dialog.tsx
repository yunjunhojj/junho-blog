import styles from "./index.module.css";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

type EditorDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  content: React.ReactNode;
};

const EditorDialog = (props: EditorDialogProps) => {
  const { open, onClose, onConfirm, title, content } = props;

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={styles.dialog}
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
          <DialogTitle className="font-bold">Deactivate account</DialogTitle>
          <Description>
            This will permanently deactivate your account
          </Description>
          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed.
          </p>
          <div className="flex gap-4">
            <button onClick={() => setIsOpen(false)}>Cancel</button>
            <button onClick={() => setIsOpen(false)}>Deactivate</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default EditorDialog;
