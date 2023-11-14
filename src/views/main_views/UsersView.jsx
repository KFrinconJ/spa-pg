import NavBar from '../../components/NavBar'
import { Button } from '@nextui-org/react'
import { PlusIcon } from '../../icons/PlusIcon'
import TableUsers from '../../components/users_components/TableUsers'
import LoadingView from '../LoadingView'
import { useUsers } from '../../hooks/useUsers'
import { columns } from '../../services/usuario.service'

export default function UsersView() {
    const { usersList, isLoading } = useUsers() //Hook personalizado

    if (isLoading) {
        return <LoadingView></LoadingView>//Renderizar vista de carga 
    }

    return (
        <>
            <NavBar></NavBar>
            <div className="container mx-auto mt-10 p-6 md:p-12 bg-gray-800 rounded-2xl shadow-md" >
                <div className='flex justify-between'>
                    <h1 className="text-4xl font-bold mb-4">Usuarios 😃</h1>
                    <div className="mb-8">
                        <Button color='success' startContent={<PlusIcon />} >
                            Crear Usuario
                        </Button>
                    </div>
                </div>
                <div>
                    <TableUsers users={usersList} columns={columns}></TableUsers>
                </div>
            </div>
        </>
    )
}
