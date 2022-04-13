import { Route,Redirect } from 'react-router-dom';
import { isAuthenticated } from "../components/utils/authOperations"
  
  function PrivateRoute({ children,...rest}) {
    // console.log("inside private route");
    // console.log("is user Authenticated ",isAuthenticated);
    
    return (
     
      <Route
      {...rest}
        render={
          () => (
            isAuthenticated()
              ? (
                children
              ) : (
                <Redirect
                  to="/"
                />
              ))
        }
      />
    );
  }
  
  export default PrivateRoute;
  
  