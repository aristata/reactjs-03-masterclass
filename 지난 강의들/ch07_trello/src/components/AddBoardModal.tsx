import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { modalState } from "../atoms/modal";
import { boardState } from "../atoms/boardAtom";

interface FormData {
  boardName: string;
}

const AddBoardModal = () => {
  const [{ isOpen }, setModalState] = useRecoilState(modalState);
  const setBoardState = useSetRecoilState(boardState);

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      boardName: ""
    }
  });

  const handleClose = () => {
    setModalState({ isOpen: false });
  };

  const onValid = (formData: FormData) => {
    setBoardState((prev) => {
      const newBoard = {
        id: Date.now(),
        boardName: formData.boardName,
        toDos: []
      };
      return [...prev, newBoard];
    });
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Board</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onValid)}>
          <TextField
            autoFocus
            margin="dense"
            id="boardName"
            label="boardName"
            type="text"
            fullWidth
            {...register("boardName", { required: true })}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBoardModal;
