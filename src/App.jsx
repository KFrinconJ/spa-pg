
import './App.css'
import { Route, Routes } from "react-router-dom"
import { AuthenticationGuard } from './auth/authGuard'


// Vistas para todos
import Home from "./views/Home"
import CallbackPage from './views/Callback'
import Profile from './views/Profile'
import Dashboard from './views/Dashboard'
// Vistas de Roles
import AdminView from './views/rol_views/AdminView'
import DocenteView from './views/rol_views/DocenteView'
import DirectorView from './views/rol_views/DirectorView'


//Vistas de Modulos
// Usuarios
import UsersView from './views/main_views/UsersView'
import DetailUser from './components/users_components/DetailUser'
import EditUser from './components/users_components/EditUser'


// Cursos
import CursosView from './views/main_views/CursosView'
import DetailCurso from './components/curso_components/DetailCurso'
import EditCurso from './components/curso_components/EditCurso'



//Programas Academicos
import ProgramasAcademicosView from './views/main_views/ProgramasAcademicosView'
import EditProgramaAcademico from './components/programa_academico_components/EditProgramaAcademico'
import DetailProgramaAcademico from './components/programa_academico_components/DetailProgramaAcademico'




//Dependencias
import DependenciasView from './views/main_views/DependenciasView'
import EditDependencia from './components/dependencia_components/EditDependencia'
import DetailDependencia from './components/dependencia_components/DetailDependencia'


//PeriodosAcademicos
import PeriodosAcademicosView from './views/main_views/PeriodosAcademicosView'



//Actividad
import ActividadesView from './views/main_views/ActividadesView'
import DetailActividad from './components/actividad_components/DetailActividad'
import EditActividad from './components/actividad_components/EditActividad'


//Funciones Sustantivas
import FuncionesSustantivasView from './views/main_views/FuncionesSustantivasView'
import EditFuncionSustantiva from './components/funciones_sustantivas_componentes/EditFuncionSustantiva'
import DetailFuncionSustantiva from './components/funciones_sustantivas_componentes/DetailFuncionSustantiva'

//Grupos
import GruposView from './views/main_views/GruposView'
import DetailGrupo from './components/grupo_components/DetailGrupo'
import EditGrupo from './components/grupo_components/EditGrupo'


//Asignaciones
import AsignacionView from './views/main_views/AsignacionView'
import AsignacionesDocente from './components/asignaciones_components/AsignacionesDocente'
import CursosDocente from './components/curso_components/CursosDocente'
import FuncionesSustantivasDocente from './components/funciones_sustantivas_componentes/FuncionesSustantivasDocente'
import EditPeriodoAcademico from './components/periodo_academico_components/EditPeriodoAcademico'


export default function App() {


  return (

    <Routes>

      {/* Rutas accesibles por todos */}
      <Route path='/' element={<Home />} />
      <Route path='/profile' element={< Profile />} />
      <Route path='/callback' element={<CallbackPage />} />
      <Route path='/dashboard' element={<AuthenticationGuard component={Dashboard} />} />


      {/* Rutas que puede acceder el administrador */}
      <Route path='/admin' element={<AuthenticationGuard component={AdminView} />} />

      {/* Usuarios */}
      <Route path='/usuarios' element={<AuthenticationGuard component={UsersView} />} />
      <Route path='/details/:email' element={<AuthenticationGuard component={DetailUser} />} />
      <Route path='/edit/:email' element={<AuthenticationGuard component={EditUser} />} />



      {/* Cursos */}
      <Route path='/cursos' element={<AuthenticationGuard component={CursosView} />} />
      <Route path='/cursos/docente' element={<AuthenticationGuard component={CursosDocente} />} />
      <Route path='cursos/detalles/:id' element={<AuthenticationGuard component={DetailCurso} />} />
      <Route path='cursos/editar/:id' element={<AuthenticationGuard component={EditCurso} />} />



      {/* Programa Academico */}
      <Route path='/programas-academicos' element={<AuthenticationGuard component={ProgramasAcademicosView} />} />
      <Route path='programas-academicos/detalles/:snies' element={<AuthenticationGuard component={DetailProgramaAcademico} />} />
      <Route path='programas-academicos/editar/:snies' element={<AuthenticationGuard component={EditProgramaAcademico} />} />

      {/* Grupos */}
      <Route path='/grupos' element={<AuthenticationGuard component={GruposView} />} />
      <Route path='/grupos/detalles/:id' element={<AuthenticationGuard component={DetailGrupo} />} />
      <Route path='/grupos/editar/:id' element={<AuthenticationGuard component={EditGrupo} />} />




      {/* Funciones Sustantivas */}
      <Route path='/funciones-sustantivas' element={<AuthenticationGuard component={FuncionesSustantivasView} />} />
      <Route path='/funciones-sustantivas/detalles/:id' element={<AuthenticationGuard component={DetailFuncionSustantiva} />} />
      <Route path='/funciones-sustantivas/editar/:id' element={<AuthenticationGuard component={EditFuncionSustantiva} />} />
      <Route path='/funciones-sustantivas/docente' element={<AuthenticationGuard component={FuncionesSustantivasDocente} />} />


      {/* Dependencias */}
      <Route path='/dependencias' element={<AuthenticationGuard component={DependenciasView} />} />
      <Route path='/dependencias/detalles/:id' element={<AuthenticationGuard component={DetailDependencia} />} />
      <Route path='/dependencias/editar/:id' element={<AuthenticationGuard component={EditDependencia} />} />



      {/* Actividades */}
      <Route path='/actividades' element={<AuthenticationGuard component={ActividadesView} />} />
      <Route path='/actividades/detalles/:id' element={<AuthenticationGuard component={DetailActividad} />} />
      <Route path='/actividades/editar/:id' element={<AuthenticationGuard component={EditActividad} />} />
      


      {/* Periodos Academicos */}
      <Route path='/periodo-academico' element={<AuthenticationGuard component={PeriodosAcademicosView} />} />
      <Route path='/periodo-academico/editar/:id' element={<AuthenticationGuard component={EditPeriodoAcademico} />} />



      {/* Asignaciones */}
      <Route path='/asignaciones' element={<AuthenticationGuard component={AsignacionView} />} />
      <Route path='/asignaciones/docente' element={<AuthenticationGuard component={AsignacionesDocente} />} />

      
      







      {/* Rutas que puede acceder el director del programa academico */}
      <Route path='/director' element={<AuthenticationGuard component={DirectorView} />} />
      <Route path='/usuarios' element={<AuthenticationGuard component={UsersView} />} />
      <Route path='/docente' element={<AuthenticationGuard component={DocenteView} />} />


    </Routes>

  )
}
