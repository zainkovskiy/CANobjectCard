import React from "react";
import { Nav } from 'components/Nav'
import { Title } from 'components/Title';
import { Photo } from 'components/Photo';
import { StatusBar } from 'components/StatusBar';
import { Status } from 'components/Status';
import { Ad } from 'components/Ad';
import { About } from 'components/About';
import { Description } from "components/Description";
import { CatalogShow } from "components/CatalogShow";
import { Realtor } from "components/Realtor";
import { Reserved } from "components/Reserved";


import './Content.scss';
import { Button } from "@mui/material";

export function Content(props) {
  const { object, responsibleOpen, setNewPrice, openDialogPhotoMaker, openDialogReservation, isShowChat, isShowMap } = props;
  return (
    <>
      {
        object.reqType === '1c' &&
        <StatusBar
          status={object?.objectStatus}
        />
      }
      <Title
        params={object.params}
        editBtnShow={object?.blocks?.buttons?.edit || false}
        setNewPrice={setNewPrice}
        reqNumber={object.reqNumber}
      />
      {
        object?.blocks?.buttons &&
        <Nav
          buttons={object.blocks.buttons}
          openDialogPhotoMaker={openDialogPhotoMaker}
          openDialogReservation={openDialogReservation}
          reqNumber={object.reqNumber}
          source={object.reqType}
          avitoExposure={object.avitoExposure}
        />
      }
      <div className="wrapper">
        <div className="main">
          <Photo images={object?.images?.length > 0 ? object.images : [{ url: 'https://crm.centralnoe.ru/dealincom/assets/img/placeholder.png' }]} />
          {
            object.blocks.adPanel.isShow &&
            <Ad
              adPanel={object.blocks.adPanel.data}
              adStats={object.blocks.adStats.isShow}
              reqNumber={object.reqNumber}
              source={object.reqType}
            />
          }
          <About
            about={object.params}
            source={object.reqType}
            domClick={object?.dmclickDiscount || null}
          />
          <Description
            comment={object?.params?.reqComment || ''}
          />
        </div>
        <div className="right-panel">
          {
            object.reqType === '1c' && 
            <Realtor
              realtorInfo={object?.blocks?.header?.realtor}
              responsibleOpen={responsibleOpen}
            />
          }
          {
            object?.blocks?.header?.isShow &&
            <Status
              status={object.blocks.header}
              // responsibleOpen={responsibleOpen}
              source={object.reqType}
              phone={object?.params && object?.params?.reqPhone ? object.params.reqPhone : ''}
              directRequest={object.direct_request}
              currentStatus={object?.params?.reqStatus}
            />
          }
          {
            (object.reqType === '1c' && object?.blocks?.header?.client?.isShow) &&
            <CatalogShow
              isChecked={object?.params?.isPrivateVar || false}
              reqNumber={object.reqNumber}
            />
          }
          {/* <Cords
            cords={(object.blocks.map.lat && object.blocks.map.lng) ? [object.blocks.map.lat, object.blocks.map.lng] : []}
          /> */}
          {
            object?.blocks?.header?.realtor?.name === 'Свободный объект' &&
            <Reserved/>
          }
          <Button
            size="small"
            fullWidth
            variant="outlined"
            onClick={isShowMap}
          >
            Показать на карте
          </Button>
          {
            object.reqType === '1c' &&
            <Button
              size="small"
              fullWidth
              variant="contained"
              onClick={isShowChat}
            >
              Чат
              {
                (object?.unreadMessages > 0) &&
                <>
                  ({object.unreadMessages})
                </>
              }
            </Button>
          }
        </div>
      </div>
    </>
  )
}