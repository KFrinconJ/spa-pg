import NavBar from "../../components/NavBar"
import CardItem from "../../components/CardItem"
import ClassIcon from "../../assets/icon_class.png"
import TeachIcon from "../../assets/icon_teach.png"
import { useAuth0 } from "@auth0/auth0-react"
import OfficeIcon from "../../assets/icon_office.png"


export default function DocenteView() {

    const { user } = useAuth0()

    return (
        <>
            <NavBar></NavBar>
            <div className="container h-screen">
                <h1 className="container mx-auto my-10  text-3xl md:text-5xl text-with-600 font-bold leading-tight text-center md:text-left">Bienvenido, {user.name} </h1>
                <div className="container mx-auto px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    <CardItem cardTitle={"Funciones Sustantivas"} cardImg={TeachIcon} cardAltImg={"Icono de persona impartiendo clases"} cardLink={"/funciones-sustantivas/docente"} />
                    <CardItem cardTitle={"Cursos"} cardImg={ClassIcon} cardAltImg={"Icono de tablero de clases"} cardLink={"/cursos/docente"} />

                    {/* Agregar asignacion */}
                    <CardItem cardTitle={"Asignaciones"} cardImg={OfficeIcon} cardAltImg={"Icono de edificio representando una oficina"} cardLink={"/asignaciones/docente"} />

                </div>
            </div>
        </>
    )

}