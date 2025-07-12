import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Btn } from '../btn';
export const ConfirmModal = ({ isOpen, message, onConfirm, closeModal }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={closeModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{message}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Btn onClick={closeModal}>Cancel</Btn>
          <Btn
            className={'bg-red-600 hover:bg-red-600/60'}
            onClick={onConfirm}
          >
            Confirm
          </Btn>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmModal;
