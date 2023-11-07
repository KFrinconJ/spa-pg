import TableMain from '../../components/table_components/TableMain'
import NavBar from '../../components/NavBar'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { columns, getListUsuarios } from '../../services/usuario.service'



export default function UsersView() {

    const [usersList, setUsersList] = useState([])
    const { getAccessTokenSilently } = useAuth0()








    useEffect(() => {
        let isMounted = true;

        const getMessage = async () => {
            const accessToken = await getAccessTokenSilently();
            const { data, error } = await getListUsuarios(accessToken);

            if (!isMounted) {
                return;
            }

            if (data) {
                setUsersList(data);
            }

            if (error) {
                setUsersList(JSON.stringify(error, null, 2));
            }
        };

        getMessage();

        return () => {
            isMounted = false;
        };
    }, [getAccessTokenSilently]);


    console.log((usersList))

    return (
        <>
            <NavBar></NavBar>
            <div className="container mx-auto mt-10">

                <TableMain
                    dataIn={usersList}
                    columnsIn={columns}
                />


                <h1>Lista de usuarios 😃</h1>
                <div>

                </div>





            </div>
        </>
    )
}