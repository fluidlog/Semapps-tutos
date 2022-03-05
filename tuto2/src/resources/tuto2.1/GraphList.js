import React from 'react';
import { ListBase } from "react-admin";
import TrombinoGraph from '../../graph/TrombinoGraph';

const GraphList = props => (
    <ListBase perPage={1000} {...props}>
      <TrombinoGraph></TrombinoGraph>
    </ListBase>
)

export default GraphList;
