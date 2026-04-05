import { AuthProvider } from "./CreateContext";

const AuthContext = ({ children }) => {
  const siteInfo = {
    user : 'lakdsf',
    logout : '',
  };

  return (
    <AuthProvider.Provider value={siteInfo}>{children}</AuthProvider.Provider>
  );
};

export default AuthContext;
