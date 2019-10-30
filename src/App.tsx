import React from 'react';
import Map from './Map';
import Legend from './Legend';

const App: React.FC = () => {
  return (
    <div>
      <Legend />
      <Map />
    </div>
  );
};

export default App;
