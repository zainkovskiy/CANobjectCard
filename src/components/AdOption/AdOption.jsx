import React from 'react';
import moment from 'moment';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const wrapperOption = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

export function AdOption(props) {
  const { option, setOption, balance, selectOption } = props;
  return (
    <div style={wrapperOption}>
      {
        option.type === 'check' &&
        <FormControlLabel
          sx={{
            margin: 0,
            color: `${option.status ? 'green' : ''}`
          }}
          label={option.status ? `${option.name} Включена` : `${option.name}`}
          labelPlacement='end'
          control={<Switch
            disabled={balance - option.cost <= 0 || (selectOption && selectOption?.name !== option.name)}
            checked={option.status}
            onChange={() => setOption(option)}
          />}
        />
      }
      {
        option.type === 'select' &&
        <FormControlLabel
          sx={{
            margin: 0,
            width: '100%',
            color: `${option.status ? 'green' : ''}`
          }}
          label={option.status ? `${option.name} Включена` : `${option.name}`}
          labelPlacement='top'
          control={
            <Select
              fullWidth
              disabled={selectOption && selectOption?.name !== option.name}
              value={JSON.stringify(option.selected)}
              size='small'
              onChange={(event) => setOption(option, event.target.value)}
            >
              <MenuItem
                value={JSON.stringify('nothing')}
              >Выбрать</MenuItem>
              {
                option?.list.length > 0 &&
                option.list.map(item =>
                  <MenuItem
                    key={item.UID}
                    value={JSON.stringify(item)}
                    disabled={balance - item.price <= 0}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
                  >
                    {item.description} {item.price}&#8381;
                    {
                      (balance - item.price <= 0) &&
                      <span
                        className='ad__text ad__text_small ad__text_error'
                      >
                        Не достаточно средств
                      </span>
                    }
                  </MenuItem>
                )
              }
            </Select>
          } />
      }
      {
        (option?.description && option.type === 'check') &&
        <span
          style={{ textAlign: 'center' }}
          className='ad__text'
        >
          {option.description} за {option.cost} &#8381;
        </span>
      }
      {
        (option?.status && option?.expiration) &&
        <span className='ad__text ad__text_small'>до {moment(option.expiration).locale('ru').format('DD MMMM YYYY')}</span>
      }
      {
        (option.type === 'check' && !option.status && balance - option.cost <= 0) &&
        <span
          style={{ textAlign: 'center' }}
          className='ad__text ad__text_small ad__text_error'
        >
          Не достаточно средств
        </span>
      }
    </div>
  )
}