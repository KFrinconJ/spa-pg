import NavBar from '../../components/NavBar'
import TableMain from '../../components/TableMain'
import LoadingView from '../LoadingView'
import { useCursos } from '../../hooks/useCursos'
import { columns } from '../../services/curso.service'
import renderCursoCell from '../../components/curso_components/RenderCursoCells'



export default function CursosView() {
    const { cursosList, isLoading } = useCursos() //Hook personalizado

    if (isLoading) {
        return <LoadingView></LoadingView>//Renderizar vista de carga 
    }


    console.log(cursosList)
    return (
        <>
            <NavBar></NavBar>
            <div className="container mx-auto mt-10 p-6 md:p-12 bg-gray-800 rounded-2xl shadow-md" >
                <h1 className="text-4xl font-bold mb-4">Cursos</h1>
                <div>
                    <TableMain data={cursosList} columns={columns} renderCell={renderCursoCell}></TableMain>
                </div>
            </div>
        </>
    )
}
