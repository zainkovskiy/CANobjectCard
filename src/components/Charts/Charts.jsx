import React from 'react';
import moment from 'moment';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

import './Charts.scss';

moment.locale('ru');

export function Charts(props) {
  const { data } = props;

  const getDate = (el) => {
    return (
      moment(moment().day('Monday').week(el.weekGen)).format("DD MMMM")
    )
  }

  const getIntroOfPage = (item) => {
    return (
      <div>
        {
          item.payload.countView &&
          <p className='tooltip__intro'>Просмотров: {item.payload.countView}</p>
        }
        {
          item.payload.countCall &&
          <p className='tooltip__intro'>Звонков: {item.payload.countCall}</p>
        }
      </div>
    )
  }

  const CustomToolTip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="tooltip">
          <p className="tooltip__label">{label}</p>
          {getIntroOfPage(payload[0])}
        </div>
      );
    }

    return null;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart width={300} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={(el) => getDate(el)}
          style={{ fontFamily: 'sans-serif', fontSize: 12 }}
        />
        <YAxis
          style={{ fontFamily: 'sans-serif', fontSize: 12  }}
        />
        <Tooltip
          content={<CustomToolTip />}
        />
        <Legend
          wrapperStyle={{ fontFamily: 'sans-serif', fontSize: 12  }}
         />
        <Line name='Просмотры' type="monotone" dataKey="countView" stroke="#8884d8" strokeWidth={4} activeDot={{ r: 8 }} />
        <Line name='Звонки' type="monotone" dataKey="countCall" stroke="#82ca9d" strokeWidth={4} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
} 