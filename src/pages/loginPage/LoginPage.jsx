

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSignIn= ()=>{
        console.log("handleSignIn")
    }

    const handleRedirect = (path) => {
        navigate.push(path);
      };

  



return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '89vh', background: '#f5f5f5', flexDirection: 'column' }}>
      <form
        onSubmit={handleSignIn}
        style={{ borderRadius:"25px", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh', background: 'white' }}
      >
        <h1>Login</h1>
        <br></br>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', marginBottom: '10px', width: '300px', minWidth: '200px', marginRight: '20px', marginLeft: '20px' }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', marginBottom: '10px', width: '300px', marginRight: '20px', marginLeft: '20px' }}
          required
        />
        <button type="submit" style={{ borderRadius:"10px", marginTop:"20px",padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Sign In
        </button>
      </form>

    </div>
  );
};

export default LoginPage;