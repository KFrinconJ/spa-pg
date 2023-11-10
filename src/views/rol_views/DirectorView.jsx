import NavBar from "../../components/NavBar"
import CardItem from "../../components/CardItem"
import ClassIcon from "../../assets/icon_class.png"
import TeachIcon from "../../assets/icon_teach.png"
import UsersIcon from "../../assets/icon_users.png"

import { useAuth0 } from "@auth0/auth0-react"

export default function DirectorView() {

    const { user } = useAuth0()

    return (
        <>
            <NavBar></NavBar>
            <div className="container h-screen">

                <h1 className="container mx-auto my-10  text-3xl md:text-5xl text-with-600 font-bold leading-tight text-center md:text-left">Bienvenido, {user.name} </h1>
                <div className="container mx-auto px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    <CardItem cardTitle={"Funciones Sustantivas"} cardImg={TeachIcon} cardAltImg={"Icono de persona impartiendo clases"} cardLink={"/funciones-sustantivas"} />
                    <CardItem cardTitle={"Cursos"} cardImg={ClassIcon} cardAltImg={"Icono de tablero de clases"} cardLink={"/cursos"} />
                    <CardItem cardTitle={"Docentes"} cardImg={UsersIcon} cardAltImg={"Icono de usuarios"} cardLink={"/usuarios"} />
                    {/* Agregar Asignacion */}
                </div>
            </div>
        </>
    )

}