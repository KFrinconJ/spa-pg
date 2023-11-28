import PeriodoAcademicoSelect from "./PeriodoAcademicoSelect"
import NavBar from "../NavBar"

import { useAsignaciones } from '../../hooks/useAsignaciones'
import LoadingView from "../../views/LoadingView"
import { useAuth0 } from "@auth0/auth0-react"
import { useState } from "react"

export default function AsignacionesDocente() {
    const { asignacionesList, isLoading } = useAsignaciones()
    const [selectedPeriod, setSelectedPeriodo] = useState(null); // Estado para el usuario seleccionado
    const { user } = useAuth0()

    const handlePeriodoAcademicoSelect = (periodo) => {
        setSelectedPeriodo(periodo)
    }

    const userEmail = user.email; 
    let filteredList = asignacionesList.filter(item => item.docente === userEmail && item.periodo_academico === parseInt(selectedPeriod));

    if (isLoading) {
        return <LoadingView></LoadingView>//Renderizar vista de carga 
    }

    return (
        <>
            <NavBar></NavBar>
            <div className="container mx-auto mt-10 p-6 md:p-12 bg-gray-800 rounded-2xl shadow-md" >
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-4xl font-bold mb-4">Asignaciones</h1>
                        <h2> {userEmail} </h2>
                    </div>
                    <PeriodoAcademicoSelect onPeriodoAcademicoSelect={handlePeriodoAcademicoSelect}></PeriodoAcademicoSelect>

                </div>
                <div>
                    {filteredList.map(item => (
                        <div key={item.id}>
                            <div>
                                <h2>Cursos:</h2>
                                {item.cursos.map(curso => (
                                    <div key={curso.id} className="p-4 border-2 border-gray-300 m-2">
                                        <h2 className="text-xl font-bold">{curso.nombre}</h2>
                                        <p>Código: {curso.codigo}</p>
                                        <p>Cantidad de Horas: {curso.cantidad_horas}</p>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <h2>Funciones Sustantivas:</h2>
                                {item.funciones_sustantivas.map(funcion => (
                                    <div key={funcion.id} className="p-4 border-2 border-gray-300 m-2">
                                        <h2 className="text-xl font-bold">{funcion.nombre}</h2>
                                        <p>Actividad: {funcion.actividad}</p>
                                        <p>Dependencia: {funcion.dependencia}</p>
                                        <p>Descripción: {funcion.descripcion}</p>
                                        <p>Cantidad de Horas: {funcion.cantidad_horas}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </>
    )
}
