import React from 'react';
import { ListBase } from "react-admin";
import LaunchGraph from '../../graph/LaunchGraph';

const GraphList = props => (
    <ListBase perPage={100} {...props}>
      <LaunchGraph></LaunchGraph>
    </ListBase>
)

export default GraphList;
