import React, { useState } from 'react';

import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

import './Reservation.scss';

import axios from 'axios';

export function Reservation(props) {
  const { onClose, reqNumber, source } = props;
  const [loading, setLoading] = useState(false);

  const doReservation = async () => {
    setLoading(true)
    // try {
    //   const res = await axios.post('https://crm.centralnoe.ru/dealincom/factory/objectViewer.php', {
    //     action: 'makeReservation',
    //     id: reqNumber,
    //     user: source,
    //   })
    // } catch (err) {
    //   console.log(err);
    // } finally {
    //   onClose(false);
    // }
  }

  return (
    <>
      <DialogTitle id="scroll-dialog-title">
        Зарезирвировать
      </DialogTitle>
      {
        loading ?
          <DialogContent>
            <LinearProgress />
          </DialogContent> :
          <>
            <DialogContent>
              <span
                className='reservation__text'
              >При резервировании заявки на Себя, у Вас будет 3 дня, на то что перевести её в статус Рекламного договора или СК</span>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={onClose}
              >
                отменить
              </Button>
              <Button
                onClick={() => doReservation()}
              >
                далее
              </Button>
            </DialogActions>
          </>
      }
    </>
  )
}