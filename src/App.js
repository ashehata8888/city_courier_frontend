import './App.css';
import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Header from './components/Header/Header';

function App() {
  return (

    <BrowserRouter>
    <div className="App">
    <Header/>
    </div>
    <NavBar />
  </BrowserRouter>
    
  );
}

export default App;