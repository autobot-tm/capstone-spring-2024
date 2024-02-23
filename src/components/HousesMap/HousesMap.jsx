import { GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { APP_CONFIG } from '../../config';
import { Caption } from '../Typography';
import { formatCustomCurrency } from '../../utils/number-seperator';
import { Link } from 'react-router-dom';
import CustomMarker from '../../assets/images/home.png';
import styles from './HouseMap.module.scss';
const HousesMap = ({ locations }) => {
  const HCMC_COORDINATES = {
    lat: 10.762622,
    lng: 106.660172,
  };
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: APP_CONFIG.GOOGLE_MAPS_KEY,
  });
  const [centerLocation, setCenterLocation] = useState(HCMC_COORDINATES);
  const [zoom, setZoom] = useState(12);
  const mapRef = useRef();

  const onMapLoad = useCallback(map => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (locations) {
      setZoom(12);
      setSelectedLocation(null);
    }
  }, [locations]);
  if (loadError) return 'Error';
  if (!isLoaded) return 'Maps';

  return (
    <GoogleMap
      mapContainerStyle={{
        height: '100%',
        width: '100%',
      }}
      center={centerLocation}
      zoom={zoom}
      onLoad={onMapLoad}>
      {locations.map(location => {
        return (
          <>
            <Marker
              options={{ icon: CustomMarker }}
              position={location.position}
              onClick={() => {
                setSelectedLocation(location);
                setCenterLocation(location.position);
                setZoom(13);
              }}
            />
          </>
        );
      })}
      {selectedLocation && (
        <Link to={'/houses/' + selectedLocation.id}>
          <InfoWindow
            position={selectedLocation.position}
            onCloseClick={() => {
              setSelectedLocation(null);
            }}>
            <div className={styles.infoWindowsCard}>
              <div className={styles.imageContainer}>
                <img src={selectedLocation.image} />
              </div>
              <Caption size={140} strong ellipsis>
                {selectedLocation.name}
              </Caption>
              <Caption size={110} strong>
                {formatCustomCurrency(selectedLocation.price)}
              </Caption>
            </div>
          </InfoWindow>
        </Link>
      )}
    </GoogleMap>
  );
};

export default HousesMap;
