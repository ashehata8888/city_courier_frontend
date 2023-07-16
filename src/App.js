import './App.css';
import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Header from './components/Header/Header';
import LoginPage from './pages/loginPage/LoginPage';

function App() {
  return (

    <BrowserRouter>
    <div className="App">
    <Header/>
    <LoginPage/>
    </div>
    {/* <NavBar /> */}
  </BrowserRouter>
    
  );
}

export default App;