import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { toggleIsPrivateVar } from '../../Api';

export const CatalogShow = ({ isChecked, reqNumber }) => {
  const handleChange = (event) => {
    toggleIsPrivateVar({
      reqNumber: reqNumber,
      isPrivateVar: event.target.checked
    })
  }
  return (
    <FormControlLabel
      control={
        <Checkbox
          size='small'
          defaultChecked={isChecked}
          onChange={handleChange}
        />
      }
      label={<span style={styleLabel}>Не публиковать в каталоге</span>}
    />
  );
};

const styleLabel = {
  color: '#737373',
  fontSize: 12,
  fontFamily: 'Montserrat, sans-serif'
}
