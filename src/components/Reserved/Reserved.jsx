import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import { Button } from "@mui/material";
import { AnimatePresence, motion } from 'framer-motion';
import { setReserved } from '../../Api';

export const Reserved = () => {
  const [alert, setAlert] = useState(false);
  const handleClick = () => {
    setAlert(!alert)
  }
  return (
    <>
      <AnimatePresence initial={false}>
        {
          alert ?
            <AlertReserved handleClick={handleClick} /> :
            <ButtonReserve handleClick={handleClick} />
        }
      </AnimatePresence>
    </>
  );
};
const variants = {
  open: { scale: 1 },
  closed: { scale: 0 }
}
const ButtonReserve = ({ handleClick }) => {
  return (
    <motion.div
      initial='closed'
      animate='open'
      exit='closed'
      variants={variants}
    >
      <Button
        size="small"
        fullWidth
        variant="outlined"
        onClick={handleClick}
      >
        Забрать
      </Button>
    </motion.div>
  )
}
const AlertReserved = ({ handleClick }) => {
  const [color, setColor] = useState('warning');
  const handleReserved = () => {
    setReserved({
      action: 'MyOwn',
      id: userId,
      reqNumber: reqNumber
    }).then(() => {
      setColor('success');
    }).catch(() => {
      setColor('error');
    })
  }
  return (
    <motion.div
      initial='closed'
      animate='open'
      exit='closed'
      variants={variants}
    >
      <Alert severity={color}
        action={
          color === 'warning' &&
          <>
            <Button
              size="small"
              fullWidth
              color="inherit"
              onClick={handleReserved}
            >
              да
            </Button>
            <Button
              size="small"
              fullWidth
              color="inherit"
              onClick={handleClick}
            >
              нет
            </Button>
          </>
        }
      >
        {
          color === 'warning' &&
          'Вы уверены?'
        }
        {
          color === 'success' &&
          'Успешно'
        }
        {
          color === 'error' &&
          'Ошибка'
        }
      </Alert>
    </motion.div>
  )
}