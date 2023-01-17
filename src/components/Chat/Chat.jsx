import React, { useState, useEffect } from 'react';
import './Chat.scss';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { Button, IconButton } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { ChatMessage } from 'components/ChatMessage';
import { chatApi } from '../../Api';
import moment from 'moment/moment';

export const Chat = ({ isShowChat, owner, reqNumber }) => {
  const [chatData, setChatData] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getChatList();
  }, [])
  const getChatList = (id) => {
    chatApi({
      action: owner ? "getOwnerChats" : "getChats",
      reqNumber: reqNumber,
      viewerId: id || userId
    }).then(chat => {
      setChatData(chat);
      console.log(chat);
    })
  }
  const handleClickChatId = (id) => {
    setChatId(id);
    getChatList(id);
  }

  const hadleChange = (event) => {
    setMessage(event.target.value);
  }

  const sendMesssage = () => {
    const newMessage = {
      created: moment().format('YYYY-MM-DD'),
      fromUserId: userId,
      message: message,
    };
    setChatData((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, newMessage]
    }));
    chatApi({
      action: 'sendMessage',
      senderId: userId,
      toId: chatId,
      reqNumber: reqNumber,
      message: message,
    })
    setMessage('');
  }
  return (
    <>
      <DialogTitle>
        Чат
      </DialogTitle>
      <DialogContent>
        <div className='chat'>
          {
            chatData?.senders?.length > 0 &&
            <div className="chat__list">
              <List component="nav" sx={{ paddingTop: 0 }}>
                {
                  chatData?.senders.map((item) =>
                    <ListItemButton
                      key={item.UID}
                      selected={item.UID === chatId}
                      onClick={() => handleClickChatId(item.UID)}
                    >
                      <span
                        className='chat__text'
                        style={{ fontSize: 12 }}
                      >{item.fullName}</span>
                    </ListItemButton>
                  )
                }
              </List>
            </div>
          }
          <div className="chat__field">
            <div className="chat__messages">
              {
                chatData?.messages?.length > 0 &&
                chatData.messages.map((message, idx) =>
                  <ChatMessage
                    key={idx}
                    message={message}
                    isLast={chatData.messages.length - 1 === idx}
                  />
                )
              }
            </div>
            <div className="chat__send">
              <TextField
                fullWidth
                autoComplete='off'
                size='small'
                onChange={hadleChange}
                value={message}
                onKeyDown={(event) => event.key === "Enter" && sendMesssage()}
              />
              <IconButton
                color="primary"
                onClick={sendMesssage}
              >
                <SendIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          size='small'
          variant='contained'
          onClick={isShowChat}
        >
          Закрыть
        </Button>
      </DialogActions>
    </>
  );
};