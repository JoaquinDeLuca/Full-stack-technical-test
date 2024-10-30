import Home from './pages/Home'
import CreateAndEditUser from './pages/CreateAndEditUser'
import CreateAndEditProduct from './pages/CreateAndEditProduct'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/user/create' element={<CreateAndEditUser />} />
          <Route path='/user/:id/edit' element={<CreateAndEditUser />} />
          <Route path='/product/create' element={<CreateAndEditProduct />} />
          <Route path='/product/:id/edit' element={<CreateAndEditProduct />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
