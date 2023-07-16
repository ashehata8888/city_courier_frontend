

import { useState , useEffect ,useRef} from 'react';
import { useNavigate } from 'react-router-dom';

  const LOGIN_URL = 'https://backend-ahmed-shehata-crm.onrender.com//api/users/authenticate'


const LoginPage = () => {

  const [isSender,setisSender] = useState(false)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSignIn= ()=>{
        console.log("handleSignIn")
    }

    const handleRedirect = (path) => {
      navigate(path);
    };



    
// const LOGIN_URL = 'https://backend-ahmed-shehata-crm.onrender.com//api/users/authenticate'
// const LOGIN_URL = new WebSocket('ws://localhost:7000/api/users/authenticate')
// var LOGIN_URL = new WebSocket("ws:http//localhost:7000/api/users/authenticate","echo-protocol");

  // const { setAuth } = useAuth()

  // navigate('/posts', {state: { test: 'test'}})


  const userRef = useRef()


  const [user, setUser] = useState('')
  // const [password, setpassword] = useState('1234')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false);
  const [dMSuccess,setDMSuccess] = useState(false)

  useEffect(() => {
    // userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [user, password])




    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function(event) {
      window.history.pushState(null, document.title, window.location.href);
    });


  const handleSubmit = async (e) => {
    e.preventDefault()

    isSender ? handleRedirect('/DashBoardPage') : handleRedirect('/ToDoPage')

    let bool = false

    return fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ user_name: user, password: password }),
      // body: JSON.stringify({ user_name: user, password: password }),
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    }).then(async (response) => {
      const res = await response.json()
      try {
        const accessToken = res.data.token
        const userId = res.data.id
        console.log(accessToken)

        // const accessToken = wait res.data;
        // console.log(accessToken);
        // setAuth({ user, password, accessToken , userId })
        // setUser('')
        // setpassword('')

        // navigate(from,{replace:true})
        // navigate('/Home')
      } catch (err) {
        console.log(err)
        // navigate('/HomePage', { replace: true })

      

      }

      // }catch(err){
      // const response = await response
      if (!response) {
        setErrMsg('There is No Response from the Server')
      } else if (response.status === 400) {
        setErrMsg('Missing Username or Password')
      } else if (response.status === 401) {
        setErrMsg(res.message)
        alert(res.message)
      } else if (
        (response.status === 200 && res.data.position === 'AdminDev') ||
        res.data.position === 'Admin'
      ) {
        switch (res.data.privilege) {
          case 'sender':
            navigate('/Developer', {
              state: {
                position: res.data.position
              },
              replace: true
            })
            break
          case 'Admin':
            navigate('/Admin', {
              state: {
                position: res.data.position,
                token:res.data.token
              },
              replace: true
            })
            break
        }
      } else if (response.status === 200 && res.data.bl1_id > 0 && res.data.bl2_id > 0) {
        // bool = true;
        switch (res.data.bl1_id + res.data.bl2_id) {
          case 39:
            navigate('/ICU_NICU', { replace: true })
            break
          case 47:
            navigate('/BIOS', { replace: true })
            break
          // case 3 :
          //   navigate('/CONS', { replace: true })
          //   break;
        }
      } else if (response.status === 200 && res.data.status === 'Active') {
        // bool = true;
        switch (res.data.status) {
          case 'Active':
     const userData={
          id: res.data.id,
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          user_name: res.data.user_name,
          user_mail: res.data.user_mail,
          position: res.data.position,
          privilege: res.data.privilege,
          status: res.data.status,
          token: res.data.token,
          created_date: res.data.created_date,
          bl1_id: res.data.bl1_id,
          bl2_id: res.data.bl2_id,
          bl3_id: res.data.bl3_id,
          bl4_id: res.data.bl4_id,
          bl5_id: res.data.bl5_id,
          bl6_id: res.data.bl6_id,
          bl7_id: res.data.bl7_id,
          bu_id: res.data.bu_id

        }
          localStorage.setItem('userData', JSON.stringify(userData))


         console.log('userData item was set in the browser storage ...',localStorage)
         const useridStorage = localStorage.getItem('userData')
         setSuccess(true)
         if(useridStorage.length > 0){
          setSuccess(true)
         }
         
            // navigate('/Home', {
            //   state: userData,
            //   replace: true
            // })
            break
          }
          // DM id is 4
        }    else if (response.status === 200 && res.data.status === 'Active' && res.data.bl1_id === 4) {
              // bool = true;
              switch (res.data.status) {
                case 'Active':
           const userData={
                id: res.data.id,
                first_name: res.data.first_name,
                last_name: res.data.last_name,
                user_name: res.data.user_name,
                user_mail: res.data.user_mail,
                position: res.data.position,
                privilege: res.data.privilege,
                status: res.data.status,
                token: res.data.token,
                created_date: res.data.created_date,
                bl1_id: res.data.bl1_id,
                bl2_id: res.data.bl2_id,
                bl3_id: res.data.bl3_id,
                bl4_id: res.data.bl4_id,
                bl5_id: res.data.bl5_id,
                bl6_id: res.data.bl6_id,
                bl7_id: res.data.bl7_id,
                bu_id: res.data.bu_id
      
              }
                localStorage.setItem('userData', JSON.stringify(userData))
      
      
               console.log('userData item was set in the browser storage ...',localStorage)
               const useridStorage = localStorage.getItem('userData')
               setDMSuccess(true)
               if(useridStorage.length > 0){
                setDMSuccess(true)
               }
               
                  // navigate('/Home', {
                  //   state: userData,
                  //   replace: true
                  // })
                  break
          default:
            navigate('/Unauthorized', { replace: true })
        }
        //     break
        //   case 3:
        //     navigate('/CONS', { replace: true })
        //     break
        //   case 4:
        //     navigate('/DM', { replace: true })
        //     break
        //   case 5:
        //     navigate('/IMP', { replace: true })
        //     break
        //   case 6:
        //     navigate('/SD', { replace: true })
        //     break
        //   case 7:
        //     navigate('/STER', { replace: true })
        //     break
        //   case 8:
        //     navigate('/WCL', { replace: true })
        //     break
        //   case 9:
        //     navigate('/JOT', { replace: true })
        //     break
        //   case 10:
        //     navigate('/CMF', { replace: true })
        //     break
        //   case 11:
        //     navigate('/TRM', { replace: true })
        //     break
        //   case 12:
        //     navigate('/OR', { replace: true })
        //     break
        //   case 13:
        //     navigate('/ENT', { replace: true })
        //     break
        //   case 14:
        //     navigate('/ENTTH', { replace: true })
        //     break
        //   case 15:
        //     navigate('/UR', { replace: true })
        //     break
        //   case 16:
        //     navigate('/LAPA', { replace: true })
        //     break
        //   case 17:
        //     navigate('/GYN', { replace: true })
        //     break
        //   case 18:
        //     navigate('/ERBE', { replace: true })
        //     break
        //   case 19:
        //     navigate('/ICU', { replace: true })
        //     break
        //   case 20:
        //     navigate('/NICU', { replace: true })
        //     break
        //   case 21:
        //     navigate('/SE', { replace: true })
        //     break
        //   case 22:
        //     navigate('/Fluke', { replace: true })
        //     break
        //   case 23:
        //     navigate('/Private_Medical_upper', { replace: true })
        //     break
        //   case 24:
        //     navigate('/Private_Medical_lower', { replace: true })
        //     break
        //   case 25:
        //     navigate('/Private_OR', { replace: true })
        //     break
        //   case 26:
        //     navigate('/Private_Disposable', { replace: true })
        //     break
        // }

        // setErrMsg('Success Login waiting to transfer ....');
      } else {
        setErrMsg('Login Failed')
      }
      // userRef.current.focus()
      //  setTimeout(()=>errRef.current.focus(),500) ;
      // setSuccess(bool);
      // navigate('/Home', { replace: bool })
    })

    //         if (!response.ok) {
    //             throw new Error("HTTP status " + response.status);
    //         }
    //         return response.json(); // or `.json()` or several others, see #4 above
    //     });

    // }

    // const response = await  fetch (LOGIN_URL, {
    //      method: "POST",
    //      body: JSON.stringify({user_name : user, password : password}),
    //      headers: { 'Content-Type': 'application/json' },
    //      withCredentials: true
    // })
    // .then((response) => console.log(response.json()))

    // if(result.message === "SUCCESS"){
    //   alert(“You are logged in.”);
    //   this.goToMain();
    //  } else {
    //      alert(“Please check your login information.”);
    //  }

    // console.log(JSON.stringify(response.data));
    //     const accessToken = response.data.token;
    //     // const roles=response.data.roles;
    //     setAuth({user, password, accessToken});
    //     setUser('');
    //     setpassword('');
    // setSuccess(true);

    // }
    // }catch(err){
    //   const response = await response
    //   if(!err.response){
    //     setErrMsg(`${response.message.text()}`);
    //     } else if (err.response.status === 400) {
    //     setErrMsg('Missing Username or Password');
    //     } else if (err.response.status === 401) {
    //              setErrMsg('Unauthorized');
    //     } else {
    //        setErrMsg('Login Failed');
    //     }
    //     userRef.current.focus();
    //   //  setTimeout(()=>errRef.current.focus(),500) ;
    // }

    // const response = await axios({
    //   method: 'post',
    //   url: 'https://backend-ahmed-shehata-crm.onrender.com//api/users/authenticate',
    //   data: {
    //     user_name: user,
    //     password: password
    //   }
    // });

    // status	"Active"


  }





  



return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '89vh', background: '#f5f5f5', flexDirection: 'column' }}>
      <form
        onSubmit={handleSubmit}
        style={{ borderRadius:"25px", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh', background: 'white' }}
      >
        <h1>Login</h1>
        <br></br>
        <input
          type="text"
          placeholder="User Name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
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