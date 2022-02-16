import './App.css';
import Landing from './components/landing'
import { Routes, Route } from 'react-router-dom'
import Countries from './components/countries';
import Detail from './components/detail';


function App() {
  return (
    <div className="App">
      
      <Routes> 
        <Route index element = {<Landing />} />
        <Route path='/countries' element = {<Countries />} /> 
        <Route path='/countries/:id' element = {<Detail />} />   
          
      </Routes>

    </div>
  );
}

export default App;
