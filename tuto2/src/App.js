import React from 'react';
import Graph from './graph/MiserableGraph.js';

const App = () => {
  return (
    <div className="App">
      <header >
        <p>
          D3JS in REACT
        </p>
      </header>
      <Graph></Graph>
    </div>
  );
}

export default App;

//import { Admin } from 'react-admin';

// import dataProvider from './config/dataProvider';
// import theme from './config/theme';
//
// import * as resources from './resources';
// import SplitViewResource from "./layout/SplitViewResource";
// import Layout from './layout/Layout';


// const App = () => (
//   <Admin
//     title="Tuto2 (Trombino)"
//     dataProvider={dataProvider}
//     layout={Layout}
//     theme={theme}
//   >
//     {Object.entries(resources).map(([key, resource]) => (
//       <SplitViewResource key={key} name={key} {...resource.config} />
//     ))}
//   </Admin>
// );
