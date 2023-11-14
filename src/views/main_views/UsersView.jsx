import NavBar from '../../components/NavBar'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import { PlusIcon } from '../../icons/PlusIcon'
import TableUsers from '../../components/users_components/TableUsers'
import { getUsersList } from '../../services/usuario.service'
import LoadingView from '../LoadingView'

export default function UsersView() {

    const [usersList, setUsersList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { getAccessTokenSilently } = useAuth0()

    const columns = [
        { name: "NOMBRE", uid: "name" },
        { name: "ROL", uid: "rol" },
        { name: "EMAIL", uid: "email" },
        { name: "ACCIONES", uid: "acciones" },
    ];



    const obtenerUsuarios = async () => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await getUsersList(accessToken)

            if (response.error) {
                console.error('Error al obtener el rol del usuario:', response.error);
                setUsersList([{ name: "None" }])

            } else {
                setUsersList(response.data);
            }
        } catch (error) {
            console.error('Error al obtener el token de acceso o el ID del usuario:', error);
        }
    }


    // LLamado de la funcion obtener rol
    useEffect(() => {
        obtenerUsuarios().then(() => setIsLoading(false))
    }, [])

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
                        <Button color='success' startContent={<PlusIcon />}>
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