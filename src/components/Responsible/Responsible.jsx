import React, { useState } from 'react';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import './Responsible.scss';

export function Responsible(props) {
  const { onClose, setNewResponsible } = props;
  const [secondName, setSecondName] = useState('');
  const [branch, setBranch] = useState('');
  const [responsible, setResponsible] = useState('');
  const [responsibleList, setResponsibleList] = useState([]);
  const [loading, setLoading] = useState(false);

  const setList = async () => {
    if (secondName.length > 0 || branch.length > 0) {
      setLoading(true);
      try {
        const res = await axios.post('https://crm.centralnoe.ru/dealincom/connector/findUsers.php', {
          name: secondName,
          department: branch
        })
        setResponsibleList(res.data)
      } catch (err) {
        setResponsibleList([]);
        setSecondName('');
        setBranch('');
      } finally {
        setLoading(false);
      }
    }
  }

  const setNew = () => {
    if (responsible){
      setNewResponsible(responsible);
      onClose();
    }
  }

  return (
    <div className='responsible'>
      <DialogTitle id="scroll-dialog-title">
        Смена ответственного
        <div className='responsible__search'>
          <TextField
            label="Фамилия"
            variant="standard"
            autoComplete='off'
            fullWidth
            value={secondName}
            onChange={event => setSecondName(event.target.value)}
          />
          <TextField
            label="Филиал"
            variant="standard"
            autoComplete='off'
            fullWidth
            value={branch}
            onChange={event => setBranch(event.target.value)}
          />
          <LoadingButton
            variant="outlined"
            onClick={() => setList()}
            loading={loading}
          >
            Поиск
          </LoadingButton >
        </div>
      </DialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        <List component="nav" aria-label="main mailbox folders">
          {
            responsibleList.map(user =>
              <ListItemButton
                key={user.ID}
                selected={responsible && responsible.ID === user.ID}
                onClick={() => setResponsible(user)}
              >
                <p className='responsible__row'>{user.NAME} {user.LAST_NAME}<span>{user.WORK_DEPARTMENT}</span></p>
              </ListItemButton>)
          }
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
        >
          отменить
        </Button>
        <Button
          onClick={() => setNew()}
        >
          выбрать
        </Button>
      </DialogActions>
    </div>
  )
}