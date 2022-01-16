import { useEffect, useReducer, useState } from "react";
import { initialState, backendURL, delay } from "./utils";
import { ACTIONS } from "./reducer/actions";
import { reducer } from "./reducer/reducer";
import Map from "./Map";

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

  console.log(earthquakeData)
  if (error) return <div>Failed to get the data {error}</div>
  if (loading) return <div>Loading...</div>
  return (
    <div>
      <h1 style={classes.title}>This is a real live view of earthquakes on earth. <br />
        Website will get updated in {timeLeft} seconds</h1>
      <Map payload={earthquakeData} />
    </div>
  );
}

const classes = {
  title: {
    textAlign: "center"
  }
};

export default App;
