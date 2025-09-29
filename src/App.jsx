import {BrowserRouter,Route,Routes} from "react-router-dom"
import HomePage from './Components/Home'
import './App.css'
import ProtectedRoute from './Components/ProtectedRoute'
import LoginPage from './Components/Login'
import JobPage from './Components/Jobs'
import PageNotFound from './Components/PageNotFound'
import JobDetailsPage from './Components/JobDetails'

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
     <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
        path='/jobs'
        element={
          <ProtectedRoute>
            <JobPage/>
          </ProtectedRoute>
        }
        />
        <Route
        path='/jobs/:id'
        element={
          <ProtectedRoute>
            <JobDetailsPage/>
          </ProtectedRoute>
        }
        />
        <Route path='*' element={<ProtectedRoute>
          <PageNotFound/>
        </ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
