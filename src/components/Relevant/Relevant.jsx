import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import './Relevant.scss'

export function Relevant(props) {
  const { clientUID, phone, directRequest, onClose } = props;
  const [ clientPhone, setClientPhone ] = useState(phone || '');

  useEffect(() => {
    if (Boolean(phone)) {
      return
    }
    getPhone();
  }, [])

  const getPhone = async () => {
    setClientPhone('Загрузка номера...');
    try {
      const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Object/Controller.php', {
        UID: clientUID,
        action: 'getPhone',
      })
      res?.data?.phone ? setClientPhone(res.data.phone) : setClientPhone('Нет номера')
    } catch (err) {
      console.log(err);
      setClientPhone('Ошибка')
    }
  }

  const sendActionClick = async (action) => {
    onClose();
    try {
      const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Object/Controller.php', {
        "action": action,
        "reqNumber": reqNumber,
        "userId": userId,
        "source": source
      })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <DialogTitle>
        Актуализация
      </DialogTitle>
      <DialogContent>
        <span className='relevant__text'>Номер клиента: {clientPhone}</span>
        <p className="relevant__text">
          Пожалуйста, после звонка укажите статус объявления
        </p>
        <div className='relevant__buttons'>
          <Button
            variant="contained"
            size='small'
            fullWidth
            onClick={() => { sendActionClick('isRelevant') }}
          >
            Актуально
            {directRequest.isRelevant > 0 ? ` (${directRequest.isRelevant})` : ''}
          </Button>
          <Button
            variant="contained"
            size='small'
            fullWidth
            onClick={() => { sendActionClick('isNotForSale') }}
          >
            нет в продаже
            {directRequest.isNotForSale > 0 ? ` (${directRequest.isNotForSale})` : ''}
          </Button>
          <Button
            variant="contained"
            size='small'
            fullWidth
            onClick={() => { sendActionClick('isSold') }}
          >
            продано
            {directRequest.isSold > 0 ? ` (${directRequest.isSold})` : ''}
          </Button>
          <Button
            variant="contained"
            size='small'
            fullWidth
            onClick={() => { sendActionClick('phoneIncorrect') }}
          >
            номер не корректный
            {directRequest.phoneIncorrect > 0 ? ` (${directRequest.phoneIncorrect})` : ''}
          </Button>
        </div>
      </DialogContent>
    </>
  )
}