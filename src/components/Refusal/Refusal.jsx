import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogActions, DialogContentText } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';

export const Refusal = ({ onClose, reqNumber }) => {
  const handleClick = () => {
    sendRefusal();
    onClose();
  };
  const sendRefusal = async () => {
    await axios.post(
      'https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Object/Controller.php',
      {
        action: 'refuse',
        userId: userId,
        reqNumber: reqNumber,
      }
    );
  };
  return (
    <>
      <DialogTitle>Отказ от объекта</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Вы можете отказаться от Объекта. В этом случае сделка будет проиграна,
          а объект перейдет в пул свободных.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick}>отказаться</Button>
        <Button
          onClick={onClose}
          color='error'
        >
          отмена
        </Button>
      </DialogActions>
    </>
  );
};
