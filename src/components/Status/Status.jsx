import React, { useState, useEffect } from "react";
import moment from "moment";
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import Dialog from '@mui/material/Dialog';
import { Relevant } from 'components/Relevant';

import './Status.scss';

export function Status(props) {
  const { status, responsibleOpen, source, phone, directRequest } = props;

  const [showClientPhone, setShowClientPhone] = useState(false);
  // const [sliderWidth, setSliderWidth] = useState('');

  // useEffect(() => {
  //   setSliderWidth(document.getElementById('root').clientWidth)
  // }, [])

  const handlerOpenClientPhone = () => {
    setShowClientPhone(!showClientPhone)
  }

  // const openRealtor = (realtor) => {
  //   if (status.realtor && status.realtor.isShow) {
  //     let readyString = `https://crm.centralnoe.ru/company/personal/user/${realtor}/`;
  //     BX.SidePanel.Instance.open(readyString, { animationDuration: 300, width: sliderWidth, });
  //   }
  // }
  const openDeal = () => {
    const sliderWidth = document.getElementById('root').clientWidth;
    if (status?.realtor && status?.realtor?.isShow) {
      let readyString = `https://crm.centralnoe.ru/company/personal/user/${status.deal || 1}/`;
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
        (source === '1c' && status?.deal) &&
        <p
          className="status__row"
          onClick={openDeal}
        >Сделка<span className="status__link">{status.deal ? status.deal : dealId}</span>
        </p>
      }
      {
        status?.client?.isShow &&
        <p className="status__row">Клиент
          <span
            className="status__link"
            onClick={handlerOpenClientPhone}
          >
            Показать номер
          </span>
        </p>
      }
      {
        status.created &&
        <p className="status__row">Актуализировано<span>{moment(status.created).format('DD.MM.YYYY')}</span></p>
      }
      {
        status.reqStatus &&
        <p className="status__row">Статус<span>{status.reqStatus}</span></p>
      }
      {/* {
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
      } */}
      <Dialog
        open={showClientPhone}
        onClose={handlerOpenClientPhone}
        maxWidth={'md'}
        fullWidth={true}
      >
        <Relevant
          clientUID={status.client.UID}
          phone={phone}
          directRequest={directRequest}
          onClose={handlerOpenClientPhone}
        />
      </Dialog>
    </div>
  )
}