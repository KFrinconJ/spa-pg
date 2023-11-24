import { Input } from "@nextui-org/react";
import { useUserDetail } from "../../hooks/useUserDetail";
import { Spinner } from "@nextui-org/spinner";


export default function HorasUsuarioInput({ email, totalHoras, onHoraSelect }) {

    const { userInfo, isLoading } = useUserDetail(email)


    if (isLoading) {
        return (
            <div className="container flex justify-center">
                <Spinner label="Loading..." color="warning" />
            </div>
        )
    }

    if (userInfo) {
        const horasRestantes = userInfo.horas_laborales - totalHoras;

        return (
            <div className="w-1/5">
                <Input type="text" label="Horas Laborales" placeholder="Horas Laborales" value={horasRestantes}  onChange={(e)=>onHoraSelect(e.target.value)} />
            </div>
        );

    }


}
