import React, { Component } from 'react';
import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';


import './App.scss';

import { Linear } from 'components/Linear';
import { Content } from 'components/Content';
import { Responsible } from 'components/Responsible';
import { PhotoMaker } from 'components/PhotoMaker';
import { Reservation } from 'components/Reservation';
import { Chat } from 'components/Chat';
import { Cords } from 'components/Cords';

export class App extends Component {
  state = {
    loader: true,
    requestError: false,
    object: '',
    responsibleOpen: false,
    photoMaker: false,
    reservation: false,
    openChat: false,
    openMap: false,
  };
  openSelectResponsible = () => {
    this.setState({ responsibleOpen: !this.state.responsibleOpen });
  };
  openDialogPhotoMaker = () => {
    this.setState({ photoMaker: !this.state.photoMaker });
  };
  openDialogReservation = () => {
    this.setState({ reservation: !this.state.reservation });
  };
  isShowChat = () => {
    this.setState({ openChat: !this.state.openChat });
  };
  isShowMap = () => {
    this.setState({ openMap: !this.state.openMap });
  };

  setNewPrice = (price, owerState, owerPrice) => {
    const copyState = Object.assign({}, this.state.object);
    copyState.params.reqPrice = price;
    copyState.params.reqOverstate = owerState;
    copyState.params.reqOverstatePrice = owerPrice;
    this.setState({ object: copyState });
  };

  setNewResponsible = async (user) => {
    const copyState = Object.assign({}, this.state.object);
    copyState.blocks.header.realtor.UID = user.ID;
    copyState.blocks.header.realtor.name = `${user.LAST_NAME} ${user.NAME}`;
    this.setState({ object: copyState });
    try {
      const res = await axios.post(
        'https://crm.centralnoe.ru/dealincom/factory/objectViewer.php',
        {
          action: 'newResponsible',
          reqNumber: this.state.object.reqNumber,
          responsible: user.LOGIN,
          author: userLogin,
          dealId: dealId,
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
  };
  getData = async () => {
    try {
      const res = await axios.post(
        'https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Object/Controller.php',
        {
          action: 'get',
          // reqNumber: 51148000273,
          // userId: 2921,
          // userLogin: 'zainkovskiyaa',
          // source: '1c',
          reqNumber: reqNumber,
          userId: userId,
          userLogin: userLogin,
          source: source,
        }
      );
      console.log(res);
      if (res.statusText === 'OK') {
        this.setState({ object: res.data });
      } else {
        this.setState({ requestError: true });
      }
    } catch (err) {
      console.log(err.message);
      this.setState({ requestError: true });
    } finally {
      this.setState({ loader: false });
    }
  };
  render() {
    return (
      <>
        {this.state.loader ? (
          <Linear />
        ) : (
          <>
            {this.state.requestError ? (
              <span className='error'>
                Ошибка, попробуйте перезагрузить страницу
              </span>
            ) : (
              <>
                <Content
                  object={this.state.object}
                  responsibleOpen={this.openSelectResponsible}
                  setNewPrice={this.setNewPrice}
                  openDialogPhotoMaker={this.openDialogPhotoMaker}
                  openDialogReservation={this.openDialogReservation}
                  isShowChat={this.isShowChat}
                  isShowMap={this.isShowMap}
                />
                <AnimatePresence>
                  {
                    this.state.openChat &&
                    <Chat
                      isShowChat={this.isShowChat}
                    />
                  }
                </AnimatePresence>
                {this.state.responsibleOpen && (
                  <Dialog
                    open={this.state.responsibleOpen}
                    onClose={this.openSelectResponsible}
                    maxWidth={'lg'}
                    fullWidth={true}
                  >
                    <Responsible
                      onClose={this.openSelectResponsible}
                      setNewResponsible={this.setNewResponsible}
                    />
                  </Dialog>
                )}
                {this.state.openMap && (
                  <Dialog
                    open={this.state.openMap}
                    onClose={this.isShowMap}
                    maxWidth={'lg'}
                    fullWidth={true}
                  >
                    <Cords
                      onClose={this.isShowMap}
                      cords={(this.state.object.blocks.map.lat && this.state.object.blocks.map.lng) ? [this.state.object.blocks.map.lat, this.state.object.blocks.map.lng] : []}
                    />
                  </Dialog>
                )}
                {this.state.photoMaker && (
                  <Dialog
                    open={this.state.photoMaker}
                    onClose={this.openDialogPhotoMaker}
                    maxWidth={'md'}
                    fullWidth={true}
                  >
                    <PhotoMaker
                      onClose={this.openDialogPhotoMaker}
                      reqNumber={this.state.object.reqNumber}
                    />
                  </Dialog>
                )}
                {this.state.reservation && (
                  <Dialog
                    open={this.state.reservation}
                    onClose={this.openDialogReservation}
                    maxWidth={'md'}
                    fullWidth={true}
                  >
                    <Reservation
                      onClose={this.openDialogReservation}
                      reqNumber={this.state.object.reqNumber}
                    />
                  </Dialog>
                )}
              </>
            )}
          </>
        )}
      </>
    );
  }

  componentDidMount() {
    this.getData();
  }
}
