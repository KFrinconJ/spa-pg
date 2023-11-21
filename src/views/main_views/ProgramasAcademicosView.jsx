import NavBar from '../../components/NavBar'
import TableMain from '../../components/TableMain'
import LoadingView from '../LoadingView'
import { columns } from '../../services/programa_academico.service'
import { Button } from '@nextui-org/react'
import { PlusIcon } from '../../icons/PlusIcon'
import { useState } from 'react'
import ModalMain from '../../components/ModalMain'
import CreateProgramaAcademicoForm from '../../components/programa_academico_components/CreateProgramaAcademicoForm'
import { useProgramasAcademicos } from '../../hooks/useProgramasAcademicos'
import renderProgramaAcademicoCell from '../../components/programa_academico_components/RenderProgramaAcademicoCells'


export default function ProgramasAcademicosView() {
    const { programaAcademicoList, isLoading } = useProgramasAcademicos() //Hook personalizado
    const [modalOpen, setModalOpen] = useState(false);


    if (isLoading) {
        return <LoadingView></LoadingView>//Renderizar vista de carga 
    }


    console.log(programaAcademicoList)
    return (
        <>
            <NavBar></NavBar>
            <div className="container mx-auto mt-10 p-6 md:p-12 bg-gray-800 rounded-2xl shadow-md" >
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold mb-4">Programas Academicos</h1>
                    <Button startContent={<PlusIcon />} color='success' onPress={() => setModalOpen(true)}>Crear</Button>
                </div>
                <div>
                    <TableMain data={programaAcademicoList} columns={columns} renderCell={renderProgramaAcademicoCell}></TableMain>
                </div>
            </div>
            <ModalMain isOpen={modalOpen} close={() => setModalOpen(false)}>
                <CreateProgramaAcademicoForm></CreateProgramaAcademicoForm>
            </ModalMain>
        </>
    )
}
