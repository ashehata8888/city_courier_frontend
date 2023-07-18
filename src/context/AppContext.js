import React from 'react';

const AppContext = React.createContext();

export default AppContext;



// import React,{ createContext, useContext, useState } from 'react';

// const MyContext = createContext();

//  const AppContext = () => useContext(MyContext);

//  function MyContextProvider({ children }) {
//   const [userData, setUserData] = useState(null);

//   return (
//     <MyContext.Provider value={{ userData, setUserData }}>
//       {children}
//     </MyContext.Provider>
//   );
// }

// export default {AppContext ,MyContextProvider}