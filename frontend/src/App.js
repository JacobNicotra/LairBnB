// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Router, BrowserRouter } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotBrowser from './components/SpotsPage'
import SpotDetailer from "./components/SpotDetails";
import CreateSpotForm from './components/CreateSpotForm'
import CreateSpotPage from './components/CreateSpotPage'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        
          <Switch>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path="/spots">
              <SpotBrowser />
            </Route>
            <Route exact path="/spot/:spotId">
              <SpotDetailer />
            </Route>
            <Route exact path="/spots/new">
              <CreateSpotPage />
            </Route>
          </Switch>
      
      )}
    </>
  );
}

export default App;
