import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import RegistrationForm from './Components/RegistrationForm';
import ListAllData from './Pages/ListAllData';
import NavBar from './Pages/NavBar';
// import AxiosComponent from './Components/AxiosComponent';

function App() {
  return (
    <div className="App">
      {/* <AxiosComponent /> */}

      <Router>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<RegistrationForm />} />
          <Route exact path='/list' element={<ListAllData />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
