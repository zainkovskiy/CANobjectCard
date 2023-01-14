import React from 'react';
import styled from 'styled-components'
import { StatusBarItem } from "components/StatusBarItem";

const StatusBarStyleComponent = styled.div`
  display: flex;
  gap: 1rem;
`
const status = 2;

export const StatusBar = () => {
  return (
    <StatusBarStyleComponent>
      {
        statusList.map((item, idx) => {
          return (
            <StatusBarItem
              key={idx}
              title={item}
              status={ idx <= status }
            />
          )
        })
      }
    </StatusBarStyleComponent>
  );
};

const statusList = [
  'Что то на П',
  'Листинг',
  'Реклама',
  'Сделка',
]