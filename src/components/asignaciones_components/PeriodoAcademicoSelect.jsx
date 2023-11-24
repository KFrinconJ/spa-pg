import { Select, SelectItem } from "@nextui-org/select";
import { Spinner } from "@nextui-org/spinner";
import { usePeriodosAcademicos } from "../../hooks/usePeriodoAcademico";


export default function PeriodoAcademicoSelect() {


    const { periodosAcademicosList, isLoading } = usePeriodosAcademicos()
    if (isLoading) {
        return (
            <div className="container flex justify-center">
                <Spinner label="Loading..." color="warning" />
            </div>
        )
    }

    console.log(periodosAcademicosList)
    return (
        <Select
            items={periodosAcademicosList}
            label="Periodo Academico"
            placeholder="Seleccionar el periodo academico"
            className="max-w-xs"
        >
            {(periodoAcademico) => <SelectItem key={periodoAcademico.id}>{periodoAcademico.nombre}</SelectItem>}
        </Select>
    )
}