import NavBar from '../../components/NavBar'
import TableMain from '../../components/TableMain'
import LoadingView from '../LoadingView'
import { columns } from '../../services/periodo_academico.service'
import { Button } from '@nextui-org/react'
import { PlusIcon } from '../../icons/PlusIcon'
import { useState } from 'react'
import ModalMain from '../../components/ModalMain'
import { usePeriodosAcademicos } from '../../hooks/usePeriodoAcademico'
import RenderPeriodoAcademicoCell from '../../components/periodo_academico_components/RenderPeriodoAcademicoCells'
import CreatePeriodoAcademicoForm from '../../components/periodo_academico_components/CreatePeriodoAcademicoForm'


export default function PeriodosAcademicosView() {
    const { periodosAcademicosList, isLoading } = usePeriodosAcademicos() //Hook personalizado
    const [modalOpen, setModalOpen] = useState(false);


    if (isLoading) {
        return <LoadingView></LoadingView>//Renderizar vista de carga 
    }


    console.log(periodosAcademicosList)
    return (
        <>
            <NavBar></NavBar>
            <div className="container mx-auto mt-10 p-6 md:p-12 bg-gray-800 rounded-2xl shadow-md" >
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold mb-4">Periodos Academicos</h1>
                    <Button startContent={<PlusIcon />} color='success' onPress={() => setModalOpen(true)}>Crear</Button>
                </div>
                <div>
                    <TableMain data={periodosAcademicosList} columns={columns} renderCell={RenderPeriodoAcademicoCell}></TableMain>
                </div>
            </div>
            <ModalMain isOpen={modalOpen} close={() => setModalOpen(false)}>
                <CreatePeriodoAcademicoForm></CreatePeriodoAcademicoForm>
            </ModalMain>
        </>
    )
}
