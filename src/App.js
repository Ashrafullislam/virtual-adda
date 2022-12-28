import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes/Route';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="max-w-[1400px] mx-auto text-black bg-warning">
    <RouterProvider router={router} > 
       
    </RouterProvider>
    <Toaster />

    </div>
  );
}

export default App;
