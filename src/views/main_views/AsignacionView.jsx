import React, { useState } from 'react';
import NavBar from '../../components/NavBar'
import LoadingView from '../LoadingView'
import { useCursos } from '../../hooks/useCursos'
import { useFuncionesSustantivas } from '../../hooks/useFuncionesSustantivas'
import UserSelect from '../../components/asignaciones_components/UserSelect'
import PeriodoAcademicoSelect from '../../components/asignaciones_components/PeriodoAcademicoSelect'
import HorasUsuarioInput from '../../components/asignaciones_components/HorasUsuarioInput';
import CursosList from '../../components/asignaciones_components/CursosList';
import FuncionesSustantivasList from '../../components/asignaciones_components/FuncionesSustantivasList';
import DropZone from '../../components/asignaciones_components/DropZone';
import FuncionesSustantivasDropZone from '../../components/asignaciones_components/FSDropZone';
import { Button } from '@nextui-org/react';
import { createFuncionSustantiva } from '../../services/funcion_sustantiva.service';
import { useAuth0 } from '@auth0/auth0-react';


export default function AsignacionView() {

    const { getAccessTokenSilently} = useAuth0()
    const { funcionesSustantivasList } = useFuncionesSustantivas()
    const { cursosList, isLoading } = useCursos() //Hook personalizado
    const [selectedUser, setSelectedUser] = useState(null); // Estado para el usuario seleccionado
    const [totalHoras, setTotalHoras] = useState(0); // Estado para las horas totales de los cursos en la zona de soltar
    const [asignacion, setAsignacion] = useState({
        docente: "",
        periodo_academico: "",
        horas_disponibles: 0,
        cursos: [],
        funciones_sustantivas: []
    });

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        setAsignacion(prev => ({ ...prev, docente: user }));
    }

    const handlePeriodoAcademicoSelect = (periodo) => {
        setAsignacion(prev => ({ ...prev, periodo_academico: periodo }));
    }

    const handleHorasChange = (horas) => {
        setAsignacion(prev => ({ ...prev, horas_disponibles: horas }));
    }

    const handleDropCurso = (curso) => {
        setTotalHoras(prev => prev + curso.cantidad_horas);
        setAsignacion(prev => ({
            ...prev,
            horas_disponibles: prev.horas_disponibles - curso.cantidad_horas,
            cursos: [...prev.cursos, curso]
        }));
    }

    const handleDropFuncion = (funcion) => {
        setTotalHoras(prev => prev + funcion.cantidad_horas);
        setAsignacion(prev => ({
            ...prev,
            horas_disponibles: prev.horas_disponibles - funcion.cantidad_horas,
            funciones_sustantivas: [...prev.funciones_sustantivas, funcion]
        }));
    }

    const handleRemoveFuncion = (funcion) => {
        setTotalHoras(prev => prev - funcion.cantidad_horas);
        setAsignacion(prev => ({
            ...prev,
            horas_disponibles: prev.horas_disponibles + funcion.cantidad_horas,
            funciones_sustantivas: prev.funciones_sustantivas.filter(f => f.id !== funcion.id)
        }));
    }
    

    const handleClick = async() => {

        const accessToken = await getAccessTokenSilently()
        const response = await createFuncionSustantiva(accessToken, asignacion)
        console.log(response)

    }

    if (isLoading) {
        return <LoadingView></LoadingView>//Renderizar vista de carga 
    }
    console.log(asignacion)
    return (
        <>
            <NavBar></NavBar>
            <div className="container mx-auto mt-10 p-6 md:p-12 bg-gray-800 rounded-2xl shadow-md" >
                <div className='flex justify-evenly'>
                    <UserSelect onUserSelect={handleUserSelect}></UserSelect> {/* Pasamos la función setSelectedUser como prop */}
                    <PeriodoAcademicoSelect onPeriodoAcademicoSelect={handlePeriodoAcademicoSelect}></PeriodoAcademicoSelect>
                    <HorasUsuarioInput email={selectedUser} totalHoras={totalHoras} onHorasChange={handleHorasChange}></HorasUsuarioInput>
                </div>
                <div className='m-8 flex justify-evenly'>

                    <CursosList cursos={cursosList}></CursosList>
                    <DropZone onDropCurso={handleDropCurso} />
                    <FuncionesSustantivasList funcionesSustantivas={funcionesSustantivasList} />
                    <FuncionesSustantivasDropZone onDropFuncion={handleDropFuncion} onRemoveFuncion={handleRemoveFuncion} />
                </div>


                <Button onClick={handleClick}>Guardar</Button>
            </div>
        </>
    )
}
