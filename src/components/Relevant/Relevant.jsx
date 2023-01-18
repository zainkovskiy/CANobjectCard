import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import './Relevant.scss'

export function Relevant(props) {
  const { clientUID, phone, directRequest, onClose } = props;
  const [client, setClient] = useState(null);
  const [pending, setPending] = useState(false);
  const [pendingDate, setPendingDate] = useState('');

  useEffect(() => {
    if (Boolean(phone)) {
      return
    }
    getPhone();
  }, [])

  const getPhone = async () => {
    try {
      const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Object/Controller.php', {
        UID: clientUID,
        action: 'getPhone',
        reqNumber: reqNumber,
      })
      res?.data && setClient(res.data)
    } catch (err) {
      console.log(err);
    }
  }

  const sendActionClick = async (action) => {
    onClose();
    try {
      const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Object/Controller.php', {
        "action": action,
        "reqNumber": reqNumber,
        "userId": userId,
        "source": source,
        "pendingDate": pendingDate
      })
    } catch (err) {
      console.log(err);
    }
  }

  const handlePending = () => {
    setPending(!pending);
    setPendingDate('');
  }
  const handlePendingDate = () => {
    setPendingDate(event.target.value);
  }

  return (
    <>
      <DialogTitle>
        {pending ? 'Отложен до' : 'Актуализация'}
      </DialogTitle>
      <DialogContent>
        {
          pending ?
            <>
              <TextField
                id="date"
                type="date"
                value={pendingDate}
                size='small'
                fullWidth
                onChange={handlePendingDate}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '1rem',
                  margin: '1rem 0 0 0',
                }}
              >
                <Button
                  variant="outlined"
                  size='small'
                  color='error'
                  onClick={handlePending}
                >
                  назад
                </Button>
                <Button
                  variant="contained"
                  size='small'
                  disabled={!pendingDate}
                  onClick={() => { sendActionClick('isPending') }}
                >
                  сохранить
                </Button>
              </div>
            </> :
            <>
              {
                <p className='relevant__text relevant__title'>
                  ФИО клиента:
                  <span>
                    {client?.name && client?.name !== 'Неуказано Нино Не указано' ? ` ${client?.name}` : ' ФИО отсутствует'}
                  </span>
                </p>
              }
              <p className='relevant__text relevant__title'>
                Номер клиента:
                <span>
                  {phone || client?.phone ? ` ${phone || client?.phone}` : ' номер отсутствует'}
                </span>
              </p>
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
                <Button
                  variant="contained"
                  size='small'
                  fullWidth
                  onClick={handlePending}
                >
                  отложена
                  {directRequest.isPending > 0 ? ` (${directRequest.isPending})` : ''}
                </Button>
                <Button
                  variant="contained"
                  size='small'
                  fullWidth
                  onClick={() => { sendActionClick('dontPickUp') }}
                >
                  не взял трубку
                  {directRequest.dontPickUp > 0 ? ` (${directRequest.dontPickUp})` : ''}
                </Button>
              </div>
            </>
        }
      </DialogContent>
    </>
  )
}