import React from 'react';
import { ListBase } from "react-admin";
import CirclePacking from '../../graph/CirclePackingD3';

const CircleList = props => (
  <ListBase perPage={1000} {...props}>
    <CirclePacking />
  </ListBase>
);

export default CircleList;
