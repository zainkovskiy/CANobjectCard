import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { motion, AnimatePresence } from 'framer-motion';
import { EditPrice } from "components/EditPrice";

import './Title.scss';

export function Title(props) {
  const { params, editBtnShow, setNewPrice, reqNumber } = props;

  const [editPrice, setEditPrice] = useState(false)

  const variants = {
    visible: {
      x: 0,
      opacity: 1
    },
    hidden: {
      x: "-1000",
      opacity: 0
    },
    exit: {
      scale: 0,
      opacity: 0
    }
  }

  return (<div className='title'>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <span className="title__top">
        {params?.reqCity ? params.reqCity : ''} {params?.reqCity && '\u00A0'}
        {params?.reqStreet ? `ул.${params?.reqStreet} \u00A0` : ''}
        {params?.reqHouseNumber ? `д.${params?.reqHouseNumber} \u00A0` : ''}
      </span>
      <span className="title__bottom">
        {params?.reqTypeofRealty === 'Квартира' || params?.reqTypeofRealty === 'Комната' ?
          params?.reqRoomCount ? `${params.reqRoomCount}к. \u00A0` : '' : ''}
        {params?.reqTypeofRealty ? params.reqTypeofRealty : ''} {params?.reqTypeofRealty && '\u00A0'}
        {params?.reqArea ? `${params.reqArea} район` : ''}
      </span>
    </div>
    {
      params?.reqPrice &&
      <p className="about__top-text">Цена
        {
          editBtnShow &&
          <span
            className="about__top_edit"
          >
            <EditIcon
              style={{
                height: 20,
                width: 20,
                fill: '#fff'
              }}
              onClick={() => setEditPrice(true)}
            />
          </span>
        }
        <span>{params.reqPrice} т. руб.</span>
      </p>
    }
    {
      params?.hasComission === '1' &&
      <span className="title__commision">
        Готов делиться комиссией {params.sizeComission} {params.typeComission}
      </span>
    }
    <AnimatePresence initial={false}>
      {
        editPrice &&
        <motion.div
          className="price-wrapper"
          initial={'hidden'}
          animate={'visible'}
          exit={'exit'}
          variants={variants}
          transition={{
            duration: 0.5
          }}
        >
          <EditPrice
            closePrice={setEditPrice}
            price={params.reqPrice}
            overState={params.reqOverstate}
            overStatePrice={params.reqOverstatePrice}
            setNewPrice={setNewPrice}
            reqNumber={reqNumber}
          />
        </motion.div>
      }
    </AnimatePresence>
  </div>)
}