import { useState, useEffect, useCallback, createContext } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Top from './components/Top';
import LateComp from './components/Late';
import DirectionComp from './components/Direction';
import MapComp from './components/Map';
import ReasonComp from './components/Reason';
import ShareComp from './components/Share';
import './style.css';

export const InputData = createContext();

const App = () => {
  
  const [travelMode, setTravelMode] = useState('');
  const [reason, setReason] = useState('');
  const [answer, setAnswer] = useState('');
  const [selectedLate, setLate] = useState('');
  //経路を格納
  const [currentDirection, setCurrentDirection] = useState('');
  const value = {
    travelMode, setTravelMode, reason, setReason, answer, setAnswer, currentDirection, setCurrentDirection, selectedLate, setLate
  };

  return (
    <>
      <InputData.Provider value={value}>
        <BrowserRouter>
          <Switch>

            <Route exact path='/' render={() => <Top />} />
            <Route path='/late' render={() => <LateComp />} />
            <Route path='/direction' render={() => <DirectionComp />} />
            <Route path='/map' render={() => <MapComp />} />
            <Route path='/reason' render={() => <ReasonComp />} />
            <Route path='/share' render={() => <ShareComp />} />

          </Switch>
        </BrowserRouter>
      </InputData.Provider>
    </>
  );
};

export default App;