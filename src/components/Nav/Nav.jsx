import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog from '@mui/material/Dialog';

import { AdItem } from 'components/AdItem';
import { Refusal } from 'components/Refusal';

import './Nav.scss';

import avito from 'image/avito.svg';

export function Nav(props) {
  const {
    buttons,
    openDialogPhotoMaker,
    reqNumber,
    source,
    openDialogReservation,
    avitoExposure,
  } = props;
  const [openAvito, setOpenAvito] = useState(false);
  const [openRefusal, setOpenRefusal] = useState(false);

  const [sliderWidth, setSliderWidth] = useState('');

  useEffect(() => {
    setSliderWidth(document.getElementById('root').clientWidth);
  }, []);

  const handlerOpen = () => {
    setOpenAvito(!openAvito);
  };
  const handlerOpenRefusal = () => {
    setOpenRefusal(!openRefusal);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <ButtonGroup
          variant='text'
          aria-label='text button group'
        >
          {buttons.edit && (
            <Button
              onClick={() =>
                BX.SidePanel.Instance.open(
                  `https://crm.centralnoe.ru/CDB/object/card/add/?login=yes&action=old&id=${reqNumber}&curdeal=${dealId}`,
                  { animationDuration: 300, width: sliderWidth }
                )
              }
              size='small'
            >
              редактировать
            </Button>
          )}
          {buttons.clientReport && (
            <Button
              onClick={() =>
                window.open(
                  `https://crm.centralnoe.ru/CDB/catalog/report/index.php?offerid=${reqNumber}`,
                  '_blank'
                )
              }
              size='small'
            >
              Отчет продавцу
            </Button>
          )}
          {buttons.photoMaker && (
            <Button
              onClick={openDialogPhotoMaker}
              size='small'
            >
              заказ фотографа
            </Button>
          )}
          {buttons.reservation && (
            <Button
              onClick={openDialogReservation}
              size='small'
            >
              Зарезервировать
            </Button>
          )}
          {buttons.newReservation && (
            <Button
              size='small'
              onClick={() =>
                BX.SidePanel.Instance.open(
                  `https://crm.centralnoe.ru/booking/index.php?dealId=${dealId}&reqNumber=${reqNumber}`,
                  { animationDuration: 300, width: sliderWidth }
                )
              }
            >
              уведомление/бронь
            </Button>
          )}
          {buttons.toCatalog && (
            <Button
              size='small'
              onClick={() =>
                BX.SidePanel.Instance.open(
                  `https://crm.centralnoe.ru/CDB/object/card/infoAboutClients/?id=${reqNumber}&deal=${dealId}`,
                  { animationDuration: 300, width: sliderWidth }
                )
              }
            >
              забрать объект
            </Button>
          )}
          {buttons.refuse && (
            <Button
              size='small'
              color='success'
              onClick={handlerOpenRefusal}
            >
              отказаться
            </Button>
          )}
          {buttons.errorReport && (
            <Button
              onClick={() =>
                BX.SidePanel.Instance.open(
                  `https://crm.centralnoe.ru/attention/?reqNumber=${reqNumber}&deal=${dealId}&source=${source}`,
                  { animationDuration: 300, width: sliderWidth }
                )
              }
              size='small'
              color='error'
            >
              Сообщить о проблеме
            </Button>
          )}
        </ButtonGroup>
        {buttons.avito && (
          <div className='avito__wrap'>
            {avitoExposure && (
              <span className='avito__before'>
                до {moment(avitoExposure).format('DD.MM')}
              </span>
            )}
            <img
              className='avito'
              src={avito}
              alt='avito'
              onClick={() => handlerOpen()}
            />
          </div>
        )}
      </Box>
      <Dialog
        open={openAvito}
        onClose={handlerOpen}
        maxWidth={'md'}
        fullWidth={true}
      >
        <AdItem
          reqNumber={reqNumber}
          onClose={handlerOpen}
        />
      </Dialog>
      <Dialog
        open={openRefusal}
        onClose={handlerOpenRefusal}
        maxWidth={'md'}
        fullWidth={true}
      >
        <Refusal
          onClose={handlerOpenRefusal}
          reqNumber={reqNumber}
        />
      </Dialog>
    </>
  );
}
