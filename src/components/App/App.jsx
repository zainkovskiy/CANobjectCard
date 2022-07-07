import React, { Component } from "react";
import Dialog from '@mui/material/Dialog';
import axios from 'axios';

import './App.scss';

import { Header } from 'components/Header';
import { Linear } from "components/Linear";
import { Content } from "components/Content";
import { Responsible } from "components/Responsible";
import { PhotoMaker } from "components/PhotoMaker";
import { Reservation } from 'components/Reservation';

export class App extends Component {
  state = {
    loader: true,
    requestError: false,
    object: '',
    responsibleOpen: false,
    photoMaker: false,
    reservation: false,
  }
  openSelectResponsible = () => {
    this.setState({ responsibleOpen: !this.state.responsibleOpen })
  }
  openDialogPhotoMaker = () => {
    this.setState({ photoMaker: !this.state.photoMaker })
  }
  openDialogReservation = () => {
    this.setState({ reservation: !this.state.reservation })
  }

  setNewPrice = (price, owerState, owerPrice) => {
    const copyState = Object.assign({}, this.state.object)
    copyState.params.reqPrice = price;
    copyState.params.reqOverstate = owerState;
    copyState.params.reqOverstatePrice = owerPrice;
    this.setState({ object: copyState })
  }

  setNewResponsible = async (user) => {
    const copyState = Object.assign({}, this.state.object)
    copyState.blocks.header.realtor.UID = user.ID;
    copyState.blocks.header.realtor.name = `${user.LAST_NAME} ${user.NAME}`;
    this.setState({ object: copyState })
    try {
      const res = await axios.post('https://crm.centralnoe.ru/dealincom/factory/objectViewer.php', {
        action: 'newResponsible',
        reqNumber: this.state.object.reqNumber,
        responsible: user.LOGIN,
        author: userLogin,
        dealId: dealId
      })
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
  }
  getData = async () => {
    // try {
    //   const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Object/Controller.php', {
    //     "action": "get",
    //     "reqNumber": reqNumber,
    //     "userId": userId,
    //     "userLogin": userLogin,
    //     "source": source
    //   })
    //   console.log(res);
    //   if (res.statusText === "OK") {
    //     this.setState({ object: res.data })
    //   } else {
    //     this.setState({ requestError: true })
    //   }
    // } catch (err) {
    //   console.log(err.message);
    //   this.setState({ requestError: true })
    // } finally {
    //   this.setState({ loader: false });
    // }
    this.setState({
      object: {
        "reqNumber": 56059000179,
        "status": "Ex",
        "reqType": "1c",
        "params": {
          "createtime": "2021-09-22 12:42:44.118791",
          "reqTypeofRealty": "Дом",
          "reqRoomCount": "2",
          "reqRegion": "Новосибирская область",
          "reqCity": "Нива",
          "reqStreet": "некоммерческое садоводческое товарищество Нива",
          "reqHouseNumber": "А-29",
          "reqArea": null,
          "reqFlatTotalArea": "30",
          "reqFlatLivingArea": "12",
          "reqFloor": null,
          "reqMaterial": "Дерево",
          "reqFloorCount": "2",
          "reqPrice": "420",
          "reqTypeofLayout": "смежные",
          "reqGalleryAvailability": "1 балкон",
          "reqBathroomType": "Нетданных",
          "reqResponsibleRealtor": "fedorischevaa",
          "reqHouseBuildDate": "2003",
          "reqRoomsForSale": null,
          "reqHouseRoof": "Шифер",
          "reqHouseHeating": "Печное",
          "reqLandArea": "3",
          "reqWaterPipes": "Нов",
          "reqHouseType": "дача",
          "reqGas": "0",
          "reqBath": "1",
          "reqResidentialComplex": null,
          "reqKitchenArea": "5",
          "reqContractor": "100238946",
          "lat": "54.84135574332851",
          "lng": "83.14442948313445",
          "reserved": null,
          "reservedExp": "1970-01-01 07:00:00.000000",
          "nearMetro": null,
          "metroDistance": null,
          "reqMunicipality": null,
          "reqStatus": "Активная",
          "reqRepairStatus": null,
          "preEx": "1",
          "validatedEx": "1",
          "approvedEx": "1",
          "preAd": "0",
          "validatedAd": "0",
          "approvedAd": "0",
          "reqComment": "Продам дачный участок с летним домиком, беседкой, железным хоз.блоком и срубом из бруса 100*150 и размером 4х5 метра из 3-х отделений (готова сливная яма) . На участке имеется теплица. Участок правильной геометрической формы 10х30 метров. 2-е подъезных путей. Возможность зимнего подъезда. Есть место для парковки 2-х автомобилей.  Электричество круглый год. 10 минут езды от Академгородка. Есть точка доступа WI-FI. Приглашаем Вас на просмотр в любое время.",
          "platformURI": [
            [
              "Yandex",
              "https://realty.yandex.ru/offer/6017442083040661978"
            ],
            [
              "Avito",
              "https://www.avito.ru/2426501266"
            ],
            [
              "Site",
              "https://centralnoe.ru/view/56059000179/"
            ]
          ],
          "reqOverstate": false,
          "reqOverstatePrice": "0"
        },
        "direct_request": {
          "phoneIncorrect": 0,
          "isSold": 0,
          "isPending": 0,
          "isNotForSale": 0
        },
        "avitoExposure": null,
        "images": [
          {
            "url": "https://centromir-sc.ru/imagebase/56059000179/Resize/56059000179_927e1d80-b8ea-40f0-957a-8142041dc75b_r.jpg"
          },
          {
            "url": "https://centromir-sc.ru/imagebase/56059000179/Resize/56059000179_f6e69cbe-6efb-4898-82a9-e96e9fc39dbd_r.jpg"
          },
          {
            "url": "https://centromir-sc.ru/imagebase/56059000179/Resize/56059000179_6ba87af5-1808-44b2-b227-29c89b837b4f_r.jpg"
          },
          {
            "url": "https://centromir-sc.ru/imagebase/56059000179/Resize/56059000179_aeeb89ec-f14d-43df-8403-f3c792533d19_r.jpg"
          },
          {
            "url": "https://centromir-sc.ru/imagebase/56059000179/Resize/56059000179_ce9c3efc-5895-45d6-be20-1b26de6811e4_r.jpg"
          },
          {
            "url": "https://centromir-sc.ru/imagebase/56059000179/Resize/56059000179_32a7f594-924f-4450-b135-ea5bed382e87_r.jpg"
          },
          {
            "url": "https://centromir-sc.ru/imagebase/56059000179/Resize/56059000179_0e74a5c6-3ded-451e-a2d3-f7624a84132f_r.jpg"
          },
          {
            "url": "https://centromir-sc.ru/imagebase/56059000179/Resize/56059000179_a00dcd57-e1f9-40d2-8f24-8d0d48b594cd_r.jpg"
          },
          {
            "url": "https://centromir-sc.ru/imagebase/56059000179/Resize/56059000179_61a984f3-fbb9-4356-9015-22a7f99695b2_r.jpg"
          },
          {
            "url": "https://centromir-sc.ru/imagebase/56059000179/Resize/56059000179_195089aa-3234-4327-b3fd-318be55e8498_r.jpg"
          },
          {
            "url": "https://centromir-sc.ru/imagebase/56059000179/Resize/56059000179_5c51fc01-7fc8-4af2-858f-1c2ee1c8da85_r.jpg"
          },
          {
            "url": "https://centromir-sc.ru/imagebase/56059000179/Resize/56059000179_a9c44545-e754-4414-844d-7e3644310021_r.jpg"
          },
          {
            "url": "https://centromir-sc.ru/imagebase/56059000179/Resize/56059000179_dda13268-e5ca-48fb-8ea8-6fc7669cd36e_r.jpg"
          },
          {
            "url": "https://centromir-sc.ru/imagebase/56059000179/Resize/56059000179_07ed4f8a-9648-45fd-a9e9-b33a4052f7b9_r.jpg"
          },
          {
            "url": "https://centromir-sc.ru/imagebase/56059000179/Resize/56059000179_9e787105-0660-4ecc-b3de-9e072b6a088c_r.jpg"
          },
          {
            "url": "https://centromir-sc.ru/imagebase/56059000179/Resize/56059000179_ba56992d-2035-4d4f-ab7d-89e3dd0dd8c3_r.jpg"
          },
          {
            "url": "https://centromir-sc.ru/imagebase/56059000179/Resize/56059000179_36254f46-f272-43d0-95f2-857593ece491_r.jpg"
          }
        ],
        "reservedLogin": null,
        "reservedExp": null,
        "blocks": {
          "adStats": {
            "isShow": true
          },
          "adPanel": {
            "isShow": true,
            "data": [
              {
                "URL": "https://www.avito.ru/2426501266",
                "type": "Avito",
                "logo": "https://crm.centralnoe.ru/dealincom/assets/img/avito_logo.png"
              },
              {
                "URL": "https://centralnoe.ru/view/56059000179/",
                "type": "Site",
                "logo": "https://crm.centralnoe.ru/dealincom/assets/img/centr-small.png"
              },
              {
                "logo": "https://crm.centralnoe.ru/dealincom/assets/img/cian_logo.png",
                "type": "Cian",
                "URL": "https://www.cian.ru/sale/suburban/270687373",
                "internal_id": "270687373"
              },
              {
                "URL": "https://novosibirsk.n1.ru/cian-offers/270687373",
                "type": "N1",
                "logo": "https://crm.centralnoe.ru/dealincom/assets/img/n1_logo.png"
              },
              {
                "logo": "https://crm.centralnoe.ru/dealincom/assets/img/y_logo.png",
                "type": "Yandex",
                "URL": "https://realty.yandex.ru/offer/6017442083040661978",
                "internal_id": "56059000179"
              }
            ]
          },
          "map": {
            "isShow": true,
            "lat": "54.84135574332851",
            "lng": "83.14442948313445"
          },
          "header": {
            "isShow": true,
            "reqNumber": 56059000179,
            "deal": null,
            "created": "2021-09-22 12:42:44.118791",
            "reqStatus": "Эксклюзив",
            "realtor": {
              "isShow": true,
              "isShowChange": true,
              "name": "Федорищев Антон",
              "phone": "+79137701040",
              "UID": "1530"
            },
            "client": {
              "isShow": true,
              "UID": "100238946"
            }
          },
          "buttons": {
            "edit": true,
            "clientReport": true,
            "photoMaker": true,
            "errorReport": true,
            "reservation": false,
            "toCatalog": false,
            "newReservation": false,
            "avito": true
          }
        },
        "realtor": "fedorischevaa",
        "headId": "1576",
        "headLogin": "dubrovinai"
      }
    }, () => {
      this.setState({ loader: false });
    })
  }
  render() {
    return (
      <>
        {
          this.state.loader ?
            <Linear /> :
            <>
              {
                this.state.requestError ?
                  <span className="error">Ошибка, попробуйте перезагрузить страницу</span> :
                  <>
                    <Content
                      object={this.state.object}
                      responsibleOpen={this.openSelectResponsible}
                      setNewPrice={this.setNewPrice}
                      openDialogPhotoMaker={this.openDialogPhotoMaker}
                      openDialogReservation={this.openDialogReservation}
                    />
                    {
                      this.state.responsibleOpen &&
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
                    }
                    {
                      this.state.photoMaker &&
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
                    }
                    {
                      this.state.reservation &&
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
                    }
                  </>
              }
            </>
        }
      </>
    )
  }

  componentDidMount() {
    this.getData();
  }

}