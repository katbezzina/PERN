import { useContext } from "react";
import { AuthContext } from '../Context/AuthContext'

const IsAuthenticated = () => {

    const { user } = useContext(AuthContext);

     const isAuthenticated = user !== null ? true : false;
  return isAuthenticated;
}

export default IsAuthenticated;