import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from 'axios';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';

import './Status.scss';

export function Status(props) {
  const { status, responsibleOpen, source, phone } = props;

  const [clientPhone, setClientPhone] = useState('');

  const [sliderWidth, setSliderWidth] = useState('');

  useEffect(() => {
    setSliderWidth(document.getElementById('root').clientWidth)
  }, [])

  const getPhone = async () => {
    setClientPhone('Загрузка номера...');
    if (source === '1c') {
      try {
        const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Object/Controller.php', {
          UID: status.client.UID,
          action: 'getPhone',
        })
        console.log(res);
        res?.data?.phone ? setClientPhone(res.data.phone) : setClientPhone('нет номера')
      } catch (err) {
        console.log(err);
        setClientPhone('Ошибка')
      }
    } else {
      setClientPhone(phone)
    }
  }

  const openRealtor = (realtor) => {
    if (status.realtor && status.realtor.isShow) {
      let readyString = `https://crm.centralnoe.ru/company/personal/user/${realtor}/`;
      BX.SidePanel.Instance.open(readyString, { animationDuration: 300, width: sliderWidth, });
    }
  }

  return (
    <div className="status">
      {
        status.reqNumber &&
        <p className="status__row">Заявка<span>{status.reqNumber}</span></p>
      }
      {
        source === '1c' &&
        <p
          className="status__row"
          onClick={() => BX.SidePanel.Instance.open(`https://crm.centralnoe.ru/crm/deal/details/${status.deal ? status.deal : dealId}/`, { animationDuration: 300, width: sliderWidth, })}
        >Сделка<span className="status__link">{status.deal ? status.deal : dealId}</span>
        </p>
      }
      <p className="status__row">Клиент
        {
          clientPhone ?
            <span>{clientPhone}</span> :
            <span
              className="status__link"
              onClick={() => getPhone()}
            >
              {(status.client && status.client.isShow) && 'Показать номер'}
            </span>
        }
      </p>
      {
        status.created &&
        <p className="status__row">От<span>{moment(status.created).format('DD.MM.YYYY')}</span></p>
      }
      {
        status.reqStatus &&
        <p className="status__row">Статус<span>{status.reqStatus}</span></p>
      }
      {
        source === '1c' &&
        <p className="status__row">Риелтор
          <span>
            <span
              onClick={() => openRealtor(status.realtor.UID)}
              className="status__link"
            >{(status.realtor && status.realtor.isShow) && status.realtor.name}
            </span>
            {
              (status.realtor && status.realtor.isShowChange) &&
              <span
                className="status__change"
                onClick={responsibleOpen}
              >
                <ChangeCircleOutlinedIcon />
              </span>
            }
          </span>
        </p>
      }
    </div>
  )
}