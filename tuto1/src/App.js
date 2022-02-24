import React from 'react';
import { Admin } from 'react-admin';

import dataProvider from './config/dataProvider';
import theme from './config/theme';

import * as resources from './resources';
import SplitViewResource from "./layout/SplitViewResource";
import Layout from './layout/Layout';


const App = () => (
  <Admin
    title="Tuto1 (Lexique)"
    dataProvider={dataProvider}
    layout={Layout}
    theme={theme}
  >
    {Object.entries(resources).map(([key, resource]) => (
      <SplitViewResource key={key} name={key} {...resource.config} />
    ))}
  </Admin>
);

export default App;
