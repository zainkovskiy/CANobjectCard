import React, { useState } from 'react';

import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import LoadingButton from '@mui/lab/LoadingButton';

import './PhotoMaker.scss';
import axios from 'axios';

export function PhotoMaker(props) {
  const { onClose, reqNumber } = props;
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const sendComment = async () => {
    setLoading(true);
    try {
      const res = await axios.post('https://crm.centralnoe.ru/dealincom/factory/notifyMaker.php', {
        action: 'makePhotoCall',
        id: reqNumber,
        user: userLogin,
        comment: comment.replace(/\n/g, ' '),
      })
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      onClose(false);
    }
  }

  return (
    <>
      <DialogTitle id="scroll-dialog-title">
        Заказ фотографа
      </DialogTitle>
      <DialogContent>
        <span
          className='photo-text'
        >
          С помощью данной формы Вы можете заказать фотографа для фотосъёмки объекта клиента. Для заказа фотографа напишите комментарий для фотографа, с указанием желательной даты посещения, и любой другой уточняющей информации и нажмите кнопку "ЗАКАЗАТЬ"
        </span>
        <textarea
          class="photo-comment"
          cols="30"
          rows="10"
          value={comment}
          onChange={event => setComment(event.target.value)}
          placeholder='Введите комментарий'
        >
        </textarea>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
        >
          отменить
        </Button>
        <LoadingButton
          disabled={comment.length === 0}
          onClick={() => sendComment()}
          loading={loading}
        >
          заказать
        </LoadingButton>
      </DialogActions>
    </>
  )
}