import React, { useState } from "react";
import { motion } from "framer-motion";

import { Nav } from 'components/Nav'
import { Title } from 'components/Title';
import { Photo } from 'components/Photo';
import { Cords } from 'components/Cords';
import { Status } from 'components/Status';
import { Ad } from 'components/Ad';
import { About } from 'components/About';
import { Description } from "components/Description";

import './Content.scss';

export function Content(props) {
  const { object, responsibleOpen, setNewPrice, openDialogPhotoMaker, openDialogReservation } = props;
  return (
    <>
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
      {
        object?.blocks?.header?.isShow &&
        <div>
          <Status
            status={object.blocks.header}
            responsibleOpen={responsibleOpen}
            source={object.reqType}
            phone={object?.params && object?.params?.reqPhone ? object.params.reqPhone : ''}
            directRequest={object.direct_request}
          />
        </div>
      }
      <motion.div
        className="content__grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div>
          <Cords
            cords={(object.blocks.map.lat && object.blocks.map.lng) ? [object.blocks.map.lat, object.blocks.map.lng] : []}
          />
        </div>
        <div>
          <Photo images={object?.images?.length > 0 ? object.images : [{ url: 'https://crm.centralnoe.ru/dealincom/assets/img/placeholder.png' }]} />
        </div>
      </motion.div>
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
      />
      <Description
        comment={object?.params?.reqComment || ''}
      />
    </>
  )
}