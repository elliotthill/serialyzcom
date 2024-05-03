import React, {useEffect, useContext} from "react";

import UserContext, { UserContextType } from './services/user-context.js';
import {User} from './services/auth.js';

export default function App() {

  const {currentUser, setCurrentUser} = useContext<UserContextType>(UserContext);

  useEffect(() => {
      console.log(currentUser);

  }, []);


  return (
    <>
        <div className="font-bold">This is app.tsx rendering on the client. Haha!</div>
        <p>THis is a paragraph</p>
    </>
  )
}



