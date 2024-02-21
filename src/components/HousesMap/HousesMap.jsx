import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import React from 'react';

const HousesMap = () => {
  const position = { lat: 10.777, lng: 106.67823 };
  return (
    <APIProvider apiKey="AIzaSyAL8J9L8-7mKB38pCoF7N3H-4p9gOO-a7A">
      <div style={{ height: '100vh', width: '100%' }}>
        <Map zoom={9} center={position}>
          <AdvancedMarker position={position}></AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
};

export default HousesMap;
