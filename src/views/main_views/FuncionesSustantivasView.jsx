import NavBar from '../../components/NavBar'
import TableMain from '../../components/TableMain'
import LoadingView from '../LoadingView'
import { useFuncionesSustantivas } from '../../hooks/useFuncionesSustantivas'
import { columns } from '../../services/funcion_sustantiva.service'
import renderCursoCell from '../../components/curso_components/RenderCursoCells'
import { Button } from '@nextui-org/react'
import { PlusIcon } from '../../icons/PlusIcon'
import { useState } from 'react'
import ModalMain from '../../components/ModalMain'
import CreateFuncionSustantivaForm from '../../components/funciones_sustantivas_componentes/CreateFuncionSustantivaForm'


export default function FuncionesSustantivasView() {
    const {funcionesSustantivasList , isLoading } = useFuncionesSustantivas() //Hook personalizado
    const [modalOpen, setModalOpen] = useState(false);


    if (isLoading) {
        return <LoadingView></LoadingView>//Renderizar vista de carga 
    }


    console.log(funcionesSustantivasList)
    return (
        <>
            <NavBar></NavBar>
            <div className="container mx-auto mt-10 p-6 md:p-12 bg-gray-800 rounded-2xl shadow-md" >
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold mb-4">Funciones Sustantivas</h1>
                    <Button startContent={<PlusIcon />} color='success' onPress={() => setModalOpen(true)}>Crear</Button>
                </div>
                <div>
                    <TableMain data={funcionesSustantivasList} columns={columns} renderCell={renderCursoCell}></TableMain>
                </div>
            </div>
            <ModalMain isOpen={modalOpen} close={() => setModalOpen(false)}>
                <CreateFuncionSustantivaForm></CreateFuncionSustantivaForm>
            </ModalMain>
        </>
    )
}
