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
import { createAsignacion } from '../../services/asignacion.service';
import { useAuth0 } from '@auth0/auth0-react';


export default function AsignacionView() {

    const { getAccessTokenSilently } = useAuth0()
    const { funcionesSustantivasList } = useFuncionesSustantivas()
    const { cursosList, isLoading } = useCursos() //Hook personalizado
    const [selectedUser, setSelectedUser] = useState(null); // Estado para el usuario seleccionado
    const [selectedPeriod, setSelectedPeriodo] = useState(null); // Estado para el usuario seleccionado
    const [totalHoras, setTotalHoras] = useState(0); // Estado para las horas totales de los cursos en la zona de soltar
    const [asignacion, setAsignacion] = useState({
        docente: "",
        periodo_academico: 1,
        horas_disponibles: 0,
        cursos: [],
        funciones_sustantivas: []
    });

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        setAsignacion(prev => ({ ...prev, docente: user }));
    }

    const handlePeriodoAcademicoSelect = (periodo) => {
        setSelectedPeriodo(periodo)
        setAsignacion(prev => ({ ...prev, periodo_academico: parseInt(periodo, 10) }));

    }

    const handleHoraSelect = (hora) => {
        setSelectedHora(hora)
        setAsignacion(prev => ({ ...prev, horas_disponibles: parseInt(hora, 10) }))
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


    const handleClick = async () => {

        const accessToken = await getAccessTokenSilently()
        const response = await createAsignacion(accessToken, asignacion)
        console.log(response)

    }

    if (isLoading) {
        return <LoadingView></LoadingView>//Renderizar vista de carga 
    }
    console.log(asignacion)
    return (
        <>
            <NavBar></NavBar>
            <div className="container mx-auto mt-10 p-6 md:p-12 bg-gray-800 rounded-2xl shadow-md text-white" >
                <div className='flex justify-evenly'>
                    <UserSelect onUserSelect={handleUserSelect} className="bg-gray-700 p-2 rounded-lg"></UserSelect>
                    <PeriodoAcademicoSelect onPeriodoAcademicoSelect={handlePeriodoAcademicoSelect} className="bg-gray-700 p-2 rounded-lg"></PeriodoAcademicoSelect>
                    <HorasUsuarioInput email={selectedUser} totalHoras={totalHoras} onHoraSelect={handleHoraSelect} className="bg-gray-700 p-2 rounded-lg"></HorasUsuarioInput>
                </div>
                <div className='m-8 flex justify-evenly'>
                    <div>
                        <p className="text-xl font-bold text-center mb-5">Cursos</p>
                        <div className='flex gap-3'>
                            <CursosList cursos={cursosList} className="bg-gray-700 p-2 rounded-lg"></CursosList>
                            <DropZone onDropCurso={handleDropCurso} className="bg-gray-700 p-2 rounded-lg"></DropZone>
                        </div>
                    </div>
                    <div>
                        <p className="text-xl font-bold text-center mb-5">Funciones Sustantivas</p>
                        <div className='flex gap-3'>
                            <FuncionesSustantivasList funcionesSustantivas={funcionesSustantivasList} className="bg-gray-700 p-2 rounded-lg"></FuncionesSustantivasList>
                            <FuncionesSustantivasDropZone onDropFuncion={handleDropFuncion} onRemoveFuncion={handleRemoveFuncion} className="bg-gray-700 p-2 rounded-lg"></FuncionesSustantivasDropZone>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <Button onClick={handleClick} color='success' className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Guardar</Button>

                </div>
            </div>
        </>
    )
}    