import "./App.css";
import {useState,useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Layout from "./pages/Layout"
import Header from "./components/Header/Header";
import LoginPage from "./pages/loginPage/LoginPage";
import HomePage from "./pages/homePage/HomePage";
import DashBoardPage from "./pages/dashboardPage/DashBoardPage";
import CreateNewRequestPage from "./pages/createNewRequest/CreateNewRequestPage";
import ToDoPage from "./pages/todoPage/ToDoPage";
import AppContext from './context/AppContext';




function App() {

  const [contextUserData, setContextUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    setContextUserData(storedUserData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setContextUserData(null);
    // localStorage.clear()
  };


  return (

    <AppContext.Provider value={contextUserData}>
    <Router>
    <Layout handleLogout={handleLogout} >
      <div className="App">
      
          <Routes>
            <Route path="/" exact element={<LoginPage />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/DashBoardPage" element={<DashBoardPage />} />
            <Route
              path="/CreateNewRequestPage"
              element={<CreateNewRequestPage />}
            />
            <Route path="/ToDoPage" element={<ToDoPage />} />
          </Routes>
       
      </div>
    </Layout>
    </Router>
    </AppContext.Provider>
  );
}

export default App;
