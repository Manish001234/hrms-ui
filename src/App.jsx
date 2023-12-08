import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Employee from './Components/Employee'
import Category from './Components/Category'
import Profile from './Components/Profile'
import AddCategory from './Components/AddCategory'
import AddEmployee from './Components/AddEmployee'
import EditEmployee from './Components/EditEmployee'
import Start from './Components/Start'
import EmployeeLogin from './Components/EmployeeLogin'
import EmployeeDetail from './Components/EmployeeDetail'
import PrivateRoute from './Components/PrivateRoute'
import Employeedit from './Components/employee/Employeedit'
import Leavelist from './Components/admin/Leavelist'
import EmployeLeavelist from './Components/employee/EmployeLeavelist'
import Empdashboard from './Components/employee/Empdashboard'
import Createempleave from './Components/employee/Createempleave'
import Emphome from './Components/employee/Emphome'
import Salerycreate from './Components/admin/Salerycreate'
import Saleryreportemp from './Components/employee/Saleryreportemp'
import Empattendence from './Components/employee/Empattendence'
import Attendence from './Components/admin/Attendence'
import Paswordchange from './Components/employee/Paswordchange'
import ForgotPasswordForm from './Components/employee/ForgotPasswordForm'
import Resetchangepassword from './Components/employee/Resetchangepassword'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Start />}></Route>
      <Route path='/adminlogin' element={<Login />}></Route>
      <Route path='/employee_login' element={<EmployeeLogin />}></Route>
      <Route path='/forgot' element={<ForgotPasswordForm/>}></Route>
      <Route path='/reset/:token' element={<Resetchangepassword/>}></Route>
         <Route path='/empdash' element={
  <PrivateRoute>
    <Empdashboard />
  </PrivateRoute>
}>
  <Route path='' element={<Emphome/>}></Route>
  <Route path='/empdash/employee_detail' element={<EmployeeDetail />} />
  <Route path='/empdash/employee_leave' element={<EmployeLeavelist />}></Route>
  <Route path='/empdash/employee_edit' element={<Employeedit />}></Route>
  <Route path='/empdash/createempleave' element={<Createempleave />}></Route>
  <Route path='/empdash/saleryreport' element={<Saleryreportemp />}></Route>
  <Route path='/empdash/attendence' element={<Empattendence />}></Route>
  <Route path='/empdash/changepassword' element={<Paswordchange />}></Route>
 
</Route>
      <Route path='/dashboard' element={
        <PrivateRoute >
          <Dashboard />
        </PrivateRoute>
      }>
        <Route path='' element={<Home />}></Route>
        <Route path='/dashboard/employee' element={<Employee />}></Route>
        <Route path='/dashboard/leave_list' element={<Leavelist key="leave_list" />}></Route>
        <Route path='/dashboard/category' element={<Category />}></Route>
        <Route path='/dashboard/profile' element={<Profile />}></Route>
        <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
        <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
        <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
        <Route path='/dashboard/salerycreate' element={<Salerycreate/>}></Route>
        <Route path='/dashboard/attendnece' element={<Attendence/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
