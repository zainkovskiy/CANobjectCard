import React from 'react';
import styled from 'styled-components';

export const Realtor = ({ realtorInfo, responsibleOpen }) => {
  const openRealtor = () => {
    const sliderWidth = document.getElementById('root').clientWidth;
    let readyString = `https://crm.centralnoe.ru/company/personal/user/${realtorInfo?.UID || 1}/`;
    BX.SidePanel.Instance.open(readyString, { animationDuration: 300, width: sliderWidth, });
  }
  return (
    <div>
      <Header>
        <Title>Риелтор</Title>
        {
          realtorInfo?.isShowChange &&
          <Button
          onClick={responsibleOpen}
          >сменить</Button>
        }
      </Header>
      {
        realtorInfo?.isShow ?
          <Link
            onClick={openRealtor}
          >{realtorInfo?.name}</Link> :
          <Text>Не указан</Text>
      }
    </div >
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`
const Text = styled.span`
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  letter-spacing: 0.8px;
  color: #737373;
  font-size: 12px;
`
const Title = styled(Text)`
  font-size: 14px;
  font-weight: 600;
`
const Link = styled(Text)`
  cursor: pointer;
  color: rgb(56, 149, 255);
  &:hover {
    text-decoration: underline;
  }
`
const Button = styled(Text)`
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  letter-spacing: 0.8px;
  color: #737373;
  font-size: 12px;
  transition: transform .3s, color .3s;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    color: rgb(56, 149, 255);
  }
`