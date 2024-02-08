import { createContext } from "react";

const UserContext = createContext();

export default UserContext;

// export const UserProvider = ({ children }) => {
//   const [signedInUser, setSignedInUser] = useState({});

//   return (
//     <UserContext.Provider value={{ signedInUser, setSignedInUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
