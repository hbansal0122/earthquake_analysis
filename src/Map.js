import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const Map = ({ payload }) => {

  const [locations, setLoations] = useState([]);
  const [selected, setSelected] = useState({});
  const [center, setCenter] = useState({ lat: 37.0902, lng: 95.7129 });

  useEffect(() => {
    const getLocations = () => {
      setLoations(payload.features.map((value, index) => {
        if (value.geometry.coordinates[0] && value.geometry.coordinates[1]) {
          return {
            id: index,
            title: value.properties.title,
            time: value.properties.time,
            type: value.properties.type,
            tsunami: value.properties.tsunami === 0 ? false: true,
            magnitude: value.properties.mag,
            depth: value.geometry.coordinates[2] ? value.geometry.coordinates[2]: false,
            location: {
              "lng": value.geometry.coordinates[0],
              "lat": value.geometry.coordinates[1]
            }
          }
        } return null;
      }));
    };
    if (payload.features)
      getLocations();
  }, [payload])


  const mapStyles = {
    width: "100vh",
    height: "70vh",
    margin: "0 auto",
    top: "10vh"
  };

  const onSelect = item => {
    setSelected(item);
  }
  return (
    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={2}
      center={center}
    >
      {
        locations.map(item => {
          return (
            <Marker key={item.id} position={item.location} onClick={() => onSelect(item)} />
          )
        })
      }
      {
        selected.location &&
        (
          <InfoWindow
            position={selected.location}
            clickable={true}
            onCloseClick={() => setSelected({})}
            onClick={() => setCenter({ lat: selected.location.lat, lng: selected.location.lng})}
          >
            <div>
              <p>{selected.title}</p>
              <p>{`Earthquake time: ${JSON.stringify(new Date(selected.time))}`}</p>
              <p>{`Type of catastrophe: ${selected.type}`}</p>
              <p>{`Magnitude of the earthquake is ${selected.magnitude}`}</p>
              <p>{selected.tsunami && `This is also a ${selected.tsunami}`}</p>
              <p>{selected.depth && `Depth of catastrophe:  ${selected.depth}`}</p>
            </div>
          </InfoWindow>
        )
      }
    </GoogleMap>
  )
}
export default Map;