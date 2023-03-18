import logo from './logo.svg';
import './App.css';
import { routes } from './Routes/Routes';
import { RouterProvider } from 'react-router-dom';

function App() {
  const router = routes
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
