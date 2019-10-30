import React from 'react';
import Map from './Map';
import Legend from './Legend';
import '../node_modules/mapbox-gl/dist/mapbox-gl.css';

const App: React.FC = () => {
  return (
    <div>
      <Legend />
      <Map />
    </div>
  );
};

export default App;
