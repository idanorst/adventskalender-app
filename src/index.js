import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import { 
  RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route 
} from 'react-router-dom'
import Layout from './pages/Layout'
import StartPage from './pages/StartPage'
import CalenderPage from './pages/CalendarPage'
import SettingsPage from './pages/SettingsPage'
import ActivityExamples from './pages/ActivityExamples'
import SharedCalendar from './pages/SharedCalender'
import CreateShared from './pages/CreateShared'


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />} >
      <Route index element={<StartPage />}/>
      <Route path='createCalendar' element={<SettingsPage />}/>
      <Route path='calendar' element={<CalenderPage />}/>
      <Route path='activity-examples' element={<ActivityExamples />} />
      <Route path='createShared' element={<CreateShared />} />
      <Route path='shared' element={<SharedCalendar />} />
  </Route>
))

function App() {

  return (
      <RouterProvider router={router} />
  )
}


ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />)



