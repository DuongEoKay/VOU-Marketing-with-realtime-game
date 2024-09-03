
import './App.css';
import { ThemeProvider } from '@emotion/react';
import { DarkTheme } from './Theme/DarkTheme';
import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './component/State/Authentication/Action';
import Routers from './Routers/Routers';
//import { getRestaurantById, getRestaurantByUserId } from './component/State/Restaurant/Action';


function App() {
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")
  const username = localStorage.getItem("username")
  const {auth}=useSelector(state=>state)
  useEffect(() => {
      dispatch(getUser(jwt || auth.jwt))
  }, [auth.jwt]);

  // useEffect(() => {
  //   dispatch(getRestaurantByUserId( jwt || auth.jwt))
  // },[auth.user]);


  return (
    <ThemeProvider theme={DarkTheme}>
        <CssBaseline />
        <Routers/>
    </ThemeProvider>


  );
}

export default App;
