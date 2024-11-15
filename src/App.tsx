
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import useRouteElements from './useRouteElements'

function App() {
  const routeElements = useRouteElements()
  return (
    <>
      {routeElements}
      <ToastContainer />
    </>
  )
}

export default App;
