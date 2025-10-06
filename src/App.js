import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { route } from './Routers/Route/Route';
import { useEffect, useState } from 'react';
import whatsapp from './Assctes/whatsapp-svgrepo-com.svg'

import { Analytics } from "@vercel/analytics/react"

function App() {
      const [sppin, setSppin] = useState(false);


      useEffect(() => {
            setSppin(true);
            setTimeout(() => {
                  setSppin(false);
            }, 2000);
      }, []);

      return (
            <div>

                  <Analytics />

                  <RouterProvider router={route}></RouterProvider>

            </div>

      );
}

export default App;
