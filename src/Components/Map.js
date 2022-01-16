import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import dateFormat from "dateformat";

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
            magnitude: value.properties.mag,
            depth: value.geometry.coordinates[2] ? value.geometry.coordinates[2] : false,
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

  const onSelect = item => {
    setSelected(item);
  }
  return (
    <GoogleMap
      mapContainerStyle={{
        width: "100vh",
        height: "70vh",
        margin: "0 auto",
        top: "10vh"
      }}
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
            onClick={() => setCenter({ lat: selected.location.lat, lng: selected.location.lng })}
          >
            <div>
              <p><strong>{selected.title}</strong></p>
              <p>Location: {selected.location.lat}, {selected.location.lng}</p>
              <p>Time: {dateFormat(new Date(selected.time), "dddd, mmmm dS, yyyy, h:MM:ss TT")}</p>
              <p>Magnitude: <span style={{
                color: selected.magnitude >= 5 ?
                  "#ff0000" : selected.magnitude <= 2 ?
                    "#ec9706" : "#ed7014"
              }}>
                <strong>
                  {selected.magnitude}
                </strong>
              </span>
              </p>
              <p>{selected.depth && `Depth:  ${selected.depth} Km`}</p>
            </div>
          </InfoWindow>
        )
      }
    </GoogleMap>
  )
}


export default Map;