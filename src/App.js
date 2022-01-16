import { useEffect, useReducer, useState } from "react";
import Loader from "react-js-loader";
import { initialState, backendURL, delay } from "./utils";
import { ACTIONS } from "./reducer/actions";
import { reducer } from "./reducer/reducer";
import Map from "./Components/Map";

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const { earthquakeData, loading, error } = state;
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const getEarthquakeDataInfo = async () => {
      dispatch({ type: ACTIONS.CALL_API });
      const response = await fetch(backendURL);
      if (response.status === 200) {
        dispatch({ type: ACTIONS.SUCCESS, data: await response.json() });
        return;
      }
      dispatch({ type: ACTIONS.ERROR, error: response.error });
    };
    if (!timeLeft) {
      getEarthquakeDataInfo();
      setTimeLeft(delay);
    }
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);


  if (error) return <div>Failed to get the data {error}</div>
  if (loading) return <Loader type="box-rotate-z" bgColor={"#000"} color={'#FFFFFF'} size={100} />
  return (
    <div>
      <h1 style={classes.title}>Earthquakes live view</h1><br />
      <h2 style={classes.title}>(will be refreshed in {timeLeft} sec)</h2>
      <Map payload={earthquakeData} />
    </div>
  );
}

const classes = {
  title: {
    textAlign: "center",
    margin: 0
  }
};

export default App;
