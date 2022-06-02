import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Zoom from '@mui/material/Zoom';
import Button from '@mui/material/Button';

import axios from 'axios';

import './EditPrice.scss';

export function EditPrice(props) {
  const { closePrice, price, overState, overStatePrice, setNewPrice, reqNumber } = props;

  const [error, setError] = useState(false);
  const [priceNew, setPriceNew] = useState(price);
  const [overStatePriceNew, setOverStatePriceNew] = useState(overStatePrice || price);
  const [disabledOverPrice, setDisabledOverPrice] = useState(overState ? overState : false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleError(overStatePriceNew)
  }, [])

  const sendNewPrice = async () => {
    if (price !== priceNew || overStatePrice !== overStatePriceNew || (overState !== disabledOverPrice && !disabledOverPrice)) {
      setLoading(true)
      try {
        await axios.post('https://crm.centralnoe.ru/dealincom/factory/objectViewer.php', {
          action: 'setPrice',
          reqPrice: priceNew,
          id: reqNumber,
        })
        if (disabledOverPrice !== props.overState || overStatePriceNew !== props.overStatePrice) {
          await axios.post('https://crm.centralnoe.ru/dealincom/factory/objectViewer.php', {
            action: 'setOverstate',
            reqOverstate: disabledOverPrice,
            reqOverstatePrice: overStatePriceNew,
            id: reqNumber,
          })
        }
        setNewPrice(priceNew, disabledOverPrice, overStatePriceNew)
      } catch (err) {
        console.log(err)
      } finally {
        closePrice(false)
      }
    }
  }

  const handleError = (value, toggle) => {
    if (toggle && (!value || +value <= 0)){
      setError(true)
      return
    }

    if (disabledOverPrice && (!value || +value <= 0)){
      setError(true)
    } else {
      setError(false)
    }
  }

  return (
    <div className="edit-price">
      <TextField
        id="outlined-basic"
        label="Цена"
        variant="outlined"
        size="small"
        value={priceNew}
        onChange={event => setPriceNew(event.target.value)}
        type='number'
        disabled={disabledOverPrice}
      />
      <TextField
        id="outlined-basic"
        label="Цена с завышением"
        variant="outlined"
        value={overStatePriceNew}
        disabled={!disabledOverPrice}
        size="small"
        onChange={event => {setOverStatePriceNew(event.target.value), handleError(event.target.value)}}
        type='number'
        error={error}
      />
      <div className="edit-price__over">
        <Switch
          checked={disabledOverPrice}
          onClick={(event) => {setDisabledOverPrice(event.target.checked), event.target.checked ? handleError(overStatePriceNew, event.target.checked) : setError(false)}}
        />
        Завышение
        <Tooltip title='Стирает историю изменения цены для рекламных площадок. Объект выходит в реламу под новым номером и новой ценой. Обращаем ваше внимание, что в графе "Цена с завышением" указывается ПОЛНАЯ стоимость объекта, а не разница в цене' arrow
          TransitionComponent={Zoom}
        >
          <HelpOutlineOutlinedIcon
            fontSize="small"
            fill='#737373'
          />
        </Tooltip>
      </div>
      <div></div>
      <Button
        variant="outlined"
        color="error"
        size="small"
        disabled={loading}
        onClick={() => closePrice(false)}
      >
        Отменить
      </Button>
      <Button
        variant="outlined"
        onClick={() => sendNewPrice()}
        size="small"
        disabled={loading || error}
      >
        Применить
      </Button>
    </div>
  )
}