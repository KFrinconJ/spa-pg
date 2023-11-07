
import './App.css'
import { Route, Routes } from "react-router-dom"
import { AuthenticationGuard } from './auth/authGuard'
import { useAuth0 } from '@auth0/auth0-react'
// Vistas para todos
import Home from "./views/Home"
import CallbackPage from './views/Callback'
import Profile from './views/Profile'
// Vistas de Roles
import AdminView from './views/rol_views/AdminView'
import DocenteView from './views/rol_views/DocenteView'
import DirectorView from './views/rol_views/DirectorView'


//Vistas de Modulos
import UsersView from './views/main_views/UsersView'
import DependenciasView from './views/main_views/DependenciasView'
import FuncionesSustantivasView from './views/main_views/FuncionesSustantivasView'
import ProgramasAcademicosView from './views/main_views/ProgramasAcademicosView'
import CursosView from './views/main_views/CursosView'

export default function App() {

  const { user } = useAuth0()



  return (

    <Routes>

      {/* Rutas accesibles por todos */}
      <Route path='/' element={<Home />} />
      <Route path='/profile' element={< Profile />} />
      <Route path='/callback' element={<CallbackPage />} />
      {/* Como se puede usar informacion del usuario para rutas condicionales */}
      {/* {user && user.nickname == 'kfrjdev' && <Route path='/admin' element={<AuthenticationGuard component={AdminView} />} />} */}


      {/* Rutas que puede acceder el administrador */}
      <Route path='/admin' element={<AuthenticationGuard component={AdminView} />} />
      <Route path='/usuarios' element={<AuthenticationGuard component={UsersView} />} />
      <Route path='/programas-academicos' element={<AuthenticationGuard component={ProgramasAcademicosView} />} />
      <Route path='/funciones-sustantivas' element={<AuthenticationGuard component={FuncionesSustantivasView} />} />
      <Route path='/cursos' element={<AuthenticationGuard component={CursosView} />} />
      <Route path='/dependencias' element={<AuthenticationGuard component={DependenciasView} />} />


      {/* Rutas que puede acceder el docente */}
      <Route path='/docente' element={<AuthenticationGuard component={DocenteView} />} />
      <Route path='/cursos' element={<AuthenticationGuard component={CursosView} />} />
      <Route path='/funciones-sustantivas' element={<AuthenticationGuard component={FuncionesSustantivasView} />} />


      {/* Rutas que puede acceder el director del programa academico */}
      <Route path='/director' element={<AuthenticationGuard component={DirectorView} />} />
      <Route path='/cursos' element={<AuthenticationGuard component={CursosView} />} />
      <Route path='/funciones-sustantivas' element={<AuthenticationGuard component={FuncionesSustantivasView} />} />
      <Route path='/usuarios' element={<AuthenticationGuard component={UsersView} />} />


    </Routes>

  )
}
