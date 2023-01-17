import React from "react";
import './About.scss';

export function About(props) {
  const { about, source } = props;

  return (
    <div className="about">
      <div className="about__top">
        {/* <p className="about__top-text">Цена
          {
            editBtnShow &&
            <span
              className="about__top_edit"
            >
              <EditIcon
                style={{
                  height: 20,
                  width: 20,
                  fill: '#0c54a0'
                }}
                onClick={() => setEditPrice(true)}
              />
            </span>
          }
          <span>{about.reqPrice && about.reqPrice} т. руб.</span></p> */}
        {
          about?.reqTypeofRealty === 'Земельный участок' || about?.reqTypeofRealty === 'Участок' ?
            <p className="about__top-text">Площадь участка<span>{about?.reqLandArea && about.reqLandArea} соток</span></p> :
            <p className="about__top-text">Общая площадь<span>{about?.reqFlatTotalArea && about.reqFlatTotalArea}м2</span></p>
        }
        {
          about?.reqFlatLivingArea &&
          <p className="about__top-text">Жилая площадь<span>{about?.reqFlatLivingArea}м2</span></p>
        }
        {
          about?.reqKitchenArea &&
          <p className="about__top-text">Площадь кухни<span>{about?.reqKitchenArea}м2</span></p>
        }
        {
          (about?.reqTypeofRealty === 'Дом, коттедж, дача' || about?.reqTypeofRealty === 'Гараж' || about?.reqTypeofRealty === 'Дом') ?
            <p className="about__top-text">Этажность<span>{about?.reqFloorCount && about.reqFloorCount}</span></p> :
            <p className="about__top-text">Этаж<span>{about?.reqFloor && about.reqFloor}{about?.reqFloorCount && `/${about.reqFloorCount}`}</span></p>
        }
      </div>
      <div className="about__bottom">
        {
          about?.reqTypeofFlat &&
          <p className="about__bottom-text">Тип квартиры<span>{about?.reqTypeofFlat}</span></p>
        }
        {
          about?.reqTypeofLayout &&
          <p className="about__bottom-text">Планировка<span>{about?.reqTypeofLayout}</span></p>
        }
        {
          about?.reqMaterial &&
          <p className="about__bottom-text">Материал<span>{about?.reqMaterial}</span></p>
        }
        {
          about?.reqBathroomType &&
          <p className="about__bottom-text">Санузел<span>{about?.reqBathroomType}</span></p>
        }
        {
          about?.reqHouseBuildDate &&
          <p className="about__bottom-text">Год сдачи<span>{about?.reqHouseBuildDate}</span></p>
        }
        {
          about?.reqGalleryAvailability &&
          <p className="about__bottom-text">Балкон<span>{about?.reqGalleryAvailability}</span></p>
        }
        {
          about?.nearMetro &&
          <p className="about__bottom-text">{about?.nearMetro}<span>{about?.metroDistance && (+about.metroDistance).toFixed(3) * 1000} метров</span></p>
        }
        {
          (about?.reqTypeofRealty !== 'Земельный участок' && about?.reqTypeofRealty !== 'Участок' && about?.reqPrice && about?.reqFlatTotalArea) &&
          <p className="about__bottom-text">Стоимость кв.м.<span>{((+about.reqPrice / +about.reqFlatTotalArea) * 1000).toFixed(0)} руб.</span></p>
        }
        {
          (source === 'mlsn' && about?.blockBuilderName) &&
          <p className="about__bottom-text">Застройщик<span>{about.blockBuilderName}</span></p>
        }
        {
          (source === 'mlsn' && about?.devPhone) &&
          <p className="about__bottom-text">
            Телефон застройщика
            <a className="link" href={`tel:${about?.devPhone}`}>{about?.devPhone}</a>
          </p>
        }
        {
          (source === 'mlsn' && about?.comission) &&
          <p className="about__bottom-text">
            Комиссия агента
            <span>{about.comission} &#8381;</span>
          </p>
        }
        {
          (source === 'mlsn' && about?.reqResidentialComplex) &&
          <p className="about__bottom-text">
            ЖК
            {
              about?.urlComplex ?
                <a className="link" target='_blank' href={about?.urlComplex}>{about?.reqResidentialComplex}</a> :
                <span>{about?.reqResidentialComplex}</span>
            }
          </p>
        }
        {
          (source === 'mlsn' && about?.reqHeight) &&
          <p className="about__bottom-text">Высота потолков<span>{about.reqHeight}</span></p>
        }
        {
          (source === 'mlsn' && about?.areaBalconiesTotal) &&
          <p className="about__bottom-text">Площадь балкона<span>{about.areaBalconiesTotal}м2</span></p>
        }
        {
          (source === 'mlsn' && about?.Otdelka) &&
          <p className="about__bottom-text">Отделка<span>{about.Otdelka}</span></p>
        }
        {
          (source === 'mlsn' && about?.wcCount) &&
          <p className="about__bottom-text">Сан. узел<span>{about.wcCount}</span></p>
        }
        {
          (source === 'mlsn' && about?.reqRoomCountEx) &&
          <p className="about__bottom-text">Тип квартиры<span>{about.reqRoomCountEx}</span></p>
        }
        {
          (source === 'mlsn') &&
          <p className="about__bottom-text">Ипотека<span>{about?.buildingMortgage ? 'да' : 'нет'}</span></p>
        }
        {
          (source === 'mlsn') &&
          <p className="about__bottom-text">Военная ипотека<span>{about?.buildingVoenMortgage ? 'да' : 'нет'}</span></p>
        }
        {
          (source === 'mlsn') &&
          <p className="about__bottom-text">Рассрочка<span>{about?.buildingInstallment ? 'да' : 'нет'}</span></p>
        }
        {
          (source === 'ads' && about?.garageType === 'Гараж') &&
          <>
            {
              about?.garageSubType &&
              <p className="about__bottom-text">Рассрочка<span>{about.garageSubType}</span></p>
            }
          </>
        }
        {
          (source === 'ads' && about?.garageType === 'Гараж') &&
          <>
            {
              (about?.reqPolice && about?.reqPolice === '1') &&
              <p className="about__bottom-text">Охрана<span>Есть</span></p>
            }
          </>
        }
        {
          (source === 'ads' && about?.reqTypeofRealty === 'Участок') &&
          <>
            {
              about?.reqLandType &&
              <p className="about__bottom-text">Назначение земли<span>{about.reqLandType}</span></p>
            }
          </>
        }
        {
          (source === 'ads' && about?.reqTypeofRealty === 'Дом') &&
          <>
            {
              about.typeOfHouse &&
              <p className="about__bottom-text">Тип дома<span>{about.typeOfHouse}</span></p>
            }
          </>
        }
        {
          about?.hasComission === '1' && 
          <>
            {
              <p className="about__bottom-text">Готов делиться комиссией<span>{about.sizeComission} {about.typeComission}</span></p>
            }
          </>
        }
      </div>
    </div>
  )
}