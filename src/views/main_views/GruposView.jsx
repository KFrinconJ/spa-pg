import { useGrupos } from '../../hooks/useGrupos'
import { columns } from '../../services/grupo.service'
import RenderGrupoCell from '../../components/grupo_components/RenderGrupoCells'

import CreateGrupoForm from '../../components/grupo_components/CreateGrupoForm'

import NavBar from '../../components/NavBar'
import TableMain from '../../components/TableMain'
import LoadingView from '../LoadingView'
import { Button } from '@nextui-org/react'
import { PlusIcon } from '../../icons/PlusIcon'
import { useState } from 'react'
import ModalMain from '../../components/ModalMain'


export default function GruposView() {
    const { gruposList, isLoading } = useGrupos() //Hook personalizado
    const [modalOpen, setModalOpen] = useState(false);


    if (isLoading) {
        return <LoadingView></LoadingView>//Renderizar vista de carga 
    }


    console.log(gruposList)
    return (
        <>
            <NavBar></NavBar>
            <div className="container mx-auto mt-10 p-6 md:p-12 bg-gray-800 rounded-2xl shadow-md" >
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold mb-4">Grupos</h1>
                    <Button startContent={<PlusIcon />} color='success' onPress={() => setModalOpen(true)}>Crear</Button>
                </div>
                <div>
                    <TableMain data={gruposList} columns={columns} renderCell={RenderGrupoCell}></TableMain>
                </div>
            </div>
            <ModalMain isOpen={modalOpen} close={() => setModalOpen(false)}>
                <CreateGrupoForm/>
            </ModalMain>
        </>
    )
}
