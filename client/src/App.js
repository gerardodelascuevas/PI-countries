import './App.css';
import Landing from './components/landing'
import { Routes, Route } from 'react-router-dom'
import Countries from './components/countries';
import Detail from './components/detail';
import ActivityCreate from './components/activity-create';



function App() {
  return (
    <div className="App">
      
      <Routes>

        <Route index element = {<Landing />} />
        <Route path='/countries' element = {<Countries />} /> 
        <Route path='/countries/:id' element = {<Detail />} />   
        <Route path='/activity' element = { <ActivityCreate /> } /> 


      </Routes>

    </div>
  );
}

export default App;
