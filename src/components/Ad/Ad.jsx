import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

import './Ad.scss'

import { Charts } from 'components/Charts'

export function Ad(props) {
  const { adPanel, adStats, reqNumber } = props;

  const [charts, setCharts] = useState([]);
  const [open, setOpen] = useState(false);
  const [empty, setEmpty] = useState(false);

  const chartRef = useRef(null);

  const getCharts = async () => {
    if (charts.length === 0 && !empty) {
      try {
        const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Object/Controller.php', {
          "action": "stats",
          "reqNumber": reqNumber
        })
        if (res.statusText === 'OK' && res.data.length > 0) {
          setCharts(res.data);
          !open && setTimeout(() => {
            chartRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 1000);
          setOpen(true);
        } else {
          setEmpty(true)
        }
      } catch (err) {
        console.log(err);
      }
    } else if (charts.length > 0) {
      setOpen(!open);
    }
  }
  return (
    <div className='ad'>
      <div className='ad__top'>
        {
          (adStats && !empty) ?
            <Button
              variant="text"
              size='small'
              onClick={() => getCharts()}
            >
              {
                open ?
                  'Закрыть статистику' :
                  'Показать статистику'
              }
            </Button> :
            <Button
              variant="text"
              size='small'
              disabled={true}
            >
              пока нет данных
            </Button>
        }
        <div className='ad__top-left'>
          {
            adPanel.length > 0 &&
            adPanel.map((ad, idx) =>
              <Tooltip title='Нажмите чтобы перейти по ссылке' arrow
                TransitionComponent={Zoom}
              >
                <a
                  key={idx}
                  className='ad__link'
                  href={ad.URL}
                  style={{ backgroundImage: `url(${ad.logo})` }}
                  target={'_blank'}
                />
              </Tooltip>
            )
          }
        </div>
      </div>
      <AnimatePresence initial={false}>
        {
          (open && charts.length > 0) &&
          <motion.div ref={chartRef}
            initial={{ height: 0, opacity: 0, margin: '0 0 0 0' }}
            animate={{ height: 'auto', opacity: 1, margin: '0.5rem 0 0 0' }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
            transition={{ duration: 1 }}
          >
            <Charts data={charts} />
          </motion.div>
        }
      </AnimatePresence>
      {/* // } */}
    </div>
  )
}

// const outRight = styled.div`animation: 2s ${keyframes`${fadeOutRightBig}`}`; 
