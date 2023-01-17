import React from 'react';
import moment from 'moment/moment';
import styled from 'styled-components';

const Message = styled.div`
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 0.5rem;
  align-self: ${(props) => props.author === userId ? 'flex-end' : 'flex-start'};
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 20%;
  background-color: ${(props) => props.author === userId ? 'honeydew' : '#fff'};;
  box-sizing: border-box;
`
const Author = styled.div`
  font-family: Montserrat, sans-serif;
  font-size: 9px;
`
const Text = styled.div`
font-family: Montserrat, sans-serif;
`

const Data = styled(Author)`
  align-self: flex-end;
`

export const ChatMessage = ({ message }) => {
  return (
    <Message author={message.fromUserId}>
      <Author>{message.fromUser}</Author>
      <Text>{message.message}</Text>
      <Data>{moment(message.created).locale('ru').format('DD MMMM YYYY')}</Data>
    </Message>
  );
};
