import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Layout from "./components/Layout"
import Header from "./components/Header/Header";
import LoginPage from "./pages/loginPage/LoginPage";
import HomePage from "./pages/homePage/HomePage";
import DashBoardPage from "./pages/dashboardPage/DashBoardPage";
import CreateNewRequestPage from "./pages/createNewRequest/CreateNewRequestPage";
import ToDoPage from "./pages/todoPage/ToDoPage";



function App() {
  return (
    <Router>
    <Layout>
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
  );
}

export default App;
