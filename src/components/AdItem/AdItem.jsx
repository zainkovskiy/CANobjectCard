import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogActions } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import { AdOption } from 'components/AdOption';

import './AdItem.scss';

export function AdItem(props) {
  const { reqNumber, onClose } = props;
  const [ad, setAD] = useState(null);
  const [start, setStart] = useState(true);
  const [selectOption, setSelectOption] = useState(null);
  const [selectOptionItem, setSelectOptionItem] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    getAD();
  }, [])

  const getAD = async () => {
    try {
      const res = await axios.post("https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Creator/Advertisement.php", {
        action: 'getAvito',
        userId: userId,
        reqNumber: reqNumber
      })
      if (res?.data) {
        setAD(res.data);
      }
    } catch (err) {
      console.log(err)
      setError(true);
    }
  }
  const sendAD = async () => {
    try {
      const res = await axios.post("https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Creator/Advertisement.php", {
        action: 'setAvito',
        userId: userId,
        reqNumber: reqNumber,
        data: ad
      })
    } catch (err) {
      console.log(err)
      setError(true);
    }
  }

  const handlerPlace = (name) => {
    if (!ad[name]) {
      setAD(prevState => ({
        ...prevState,
        balance: ad.balance - ad.price
      }))
    } else {
      !start &&
        setAD(prevState => ({
          ...prevState,
          balance: ad.balance + ad.price
        }))
      setStart(false)
    }
    setAD(prevState => ({
      ...prevState,
      [name]: !ad[name]
    }))
  }

  const setOption = (option, select) => {
    if (option.type === 'check') {
      setCheck(option);
    }
    if (option.type === 'select') {
      setSelect(option, select);
    }
  }
  const setCheck = (option) => {
    setSelectOption(option.status ? null : option)
    const list = ad.option;
    const find = list.find(item => item.UID === option.UID);
    find.status = !option.status;
    list.splice(list.indexOf(find), 1, find);
    setAD(prevState => ({
      ...prevState,
      option: list
    }))
    setAD(prevState => ({
      ...prevState,
      balance: option.status ? ad.balance - option.cost : ad.balance + option.cost
    }))
  }

  const setSelect = (option, select) => {
    const parseSelect = JSON.parse(select);
    if (parseSelect !== 'nothing') {
      setAD(prevState => ({
        ...prevState,
        balance: selectOptionItem?.price ? ad.balance - parseSelect.price + selectOptionItem.price : ad.balance - parseSelect.price
      }))
    } else {
      setAD(prevState => ({
        ...prevState,
        balance: ad.balance + selectOptionItem.price
      }))
    }
    setSelectOption(parseSelect === 'nothing' ? null : option)
    setSelectOptionItem(parseSelect === 'nothing' ? null : parseSelect)
    const list = ad.option;
    const find = list.find(item => item.UID === option.UID);
    find.selected = parseSelect;
    list.splice(list.indexOf(find), 1, find);
    setAD(prevState => ({
      ...prevState,
      option: list
    }))
  }

  return (
    <>
      {
        error ?
          <span className="ad__text" style={{ padding: '1rem' }}>Что то пошло не так...</span> :
          <>
            <DialogTitle>
              <div className='ad-modal__wrap'>
                {
                  ad?.type ?
                    <span style={{ fontWeight: 700, fontFamily: 'Montserrat' }}>{ad.type}</span> :
                    <Skeleton variant="text" width={150} />
                }
                {
                  (!ad?.isOnline && ad?.balance - ad?.price <= 0) &&
                  <span className='ad__text ad__text_small ad__text_error'>
                    Не достаточно средств
                  </span>
                }
                {
                  ad?.balance ?
                    <span style={{ fontFamily: 'Montserrat', fontSize: 12 }} >Баланс {ad.balance && ad.balance}&#8381;</span> :
                    <Skeleton variant="text" width={100} />
                }
              </div>
            </DialogTitle>
            <DialogContent>
              {
                ad ?
                  <div className='ad-modal'>
                    <div className='ad-modal__wrap' style={{ alignItems: 'start' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className='ad__text'>Реклама на площадке {ad.price}&#8381;</span>
                        {
                          (ad?.expiration && ad?.isOnline) &&
                          <span className='ad__text ad__text_small'>Срок размещения до {moment().locale('ru').format('DD MMMM YYYY')}</span>
                        }
                      </div>
                      <Button
                        variant="outlined"
                        color={ad.isOnline ? 'error' : 'success'}
                        size='small'
                        name='isOnline'
                        onClick={(event) => { handlerPlace(event.target.name) }}
                        disabled={!ad.isOnline && ad.balance - ad.price <= 0}
                      >
                        {ad.isOnline ? 'Выключить' : 'Включить'}
                      </Button>
                    </div>
                    <div className={`ad-modal__options ${ad?.hasOption || !ad?.isOnline ? 'ad-modal_disabled' : ''}`}>
                      {
                        ad?.option.length > 0 &&
                        ad.option.map(option =>
                          <AdOption
                            option={option}
                            key={option.UID}
                            setOption={setOption}
                            balance={ad.balance}
                            selectOption={selectOption}
                          />
                        )
                      }
                    </div>
                  </div> :
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                  </Box>
              }
            </DialogContent>
            <DialogActions sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: 12 }}>
              <span className='ad__text'>Одновременно можно применить только одну опцию</span>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Button
                  variant="contained"
                  size='small'
                  disabled={!ad}
                  onClick={() => { sendAD() }}
                >
                  Сохранить
                </Button>
                <Button
                  variant="contained"
                  size='small'
                  color="error"
                  onClick={() => onClose()}
                  disabled={!ad}
                >
                  Отменить
                </Button>
              </div>
            </DialogActions>
          </>
      }
    </>
  )
}