import React, { useState, useEffect } from 'react';
import './Chat.scss';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { Button, IconButton } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { ChatMessage } from 'components/ChatMessage';
import { getChat } from '../../Api';

export const Chat = ({ isShowChat, owner }) => {
  const [chatData, setChatData] = useState();
  const [chatId, setChatId] = useState();

  useEffect(() => {
    getChatList();
  }, [])
  const getChatList = (id) => {
    getChat({
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

  const sendMesssage = () => {
    // action : sendMessage, senderId : тот кто пишет, toId : кому пишет, reqNumber : номеробъекта, message : сообщение
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
                  />
                )
              }
            </div>
            <div className="chat__send">
              <TextField
                fullWidth
                autoComplete='off'
                size='small'
              />
              <IconButton
                color="primary"
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

const ChatTitle = styled.span`
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  font-size: 18px;
`
