import NavBar from "../../components/NavBar"
import CardItem from "../../components/CardItem"
import UsersIcon from "../../assets/icon_users.png"
import BooksIcon from "../../assets/icon_books.png"
import ClassIcon from "../../assets/icon_class.png"
import OfficeIcon from "../../assets/icon_office.png"
import TeachIcon from "../../assets/icon_teach.png"
import CalendarIcon from "../../assets/icon_calendar.png"
import TaskIcon from "../../assets/icon_task.png"
import GroupIcon from "../../assets/icon_group.png"
import PaperIcon from "../../assets/icon_paper.png"

import { useAuth0 } from "@auth0/auth0-react"

export default function AdminView() {

    const { user } = useAuth0()

    return (
        <>
            <NavBar></NavBar>
            <div className="container h-screen">

                <h1 className="container mx-auto my-10 text-3xl md:text-5xl text-with-600 font-bold leading-tight text-center md:text-left break-words">Bienvenido, {user.name} </h1>
                <div className="container mx-auto px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    <CardItem cardTitle={"Usuarios"} cardImg={UsersIcon} cardAltImg={"Icono de usuarios"} cardLink={"/usuarios"} />
                    <CardItem cardTitle={"Programas Academicos"} cardImg={BooksIcon} cardAltImg={"Icono de libros para programas academicos"} cardLink={"/programas-academicos"} />
                    <CardItem cardTitle={"Funciones Sustantivas"} cardImg={TeachIcon} cardAltImg={"Icono de persona impartiendo clases"} cardLink={"/funciones-sustantivas"} />
                    <CardItem cardTitle={"Cursos"} cardImg={ClassIcon} cardAltImg={"Icono de tablero de clases"} cardLink={"/cursos"} />
                    <CardItem cardTitle={"Grupos"} cardImg={GroupIcon} cardAltImg={"Icono de grupos"} cardLink={"/grupos"} />
                    <CardItem cardTitle={"Dependencias"} cardImg={OfficeIcon} cardAltImg={"Icono de edificio representando una oficina"} cardLink={"/dependencias"} />
                    <CardItem cardTitle={"Periodo Academico"} cardImg={CalendarIcon} cardAltImg={"Icono de calendario"} cardLink={"/periodo-academico"} />
                    <CardItem cardTitle={"Asignaciones"} cardImg={TaskIcon} cardAltImg={"Icono de libreta de tareas"} cardLink={"/asignaciones"} />
                    <CardItem cardTitle={"Actividades"} cardImg={PaperIcon} cardAltImg={"Icono de libreta de tareas"} cardLink={"/actividades"} />
                    {/* Agregar Asignacion */}
                </div>
            </div>
        </>
    )
}
