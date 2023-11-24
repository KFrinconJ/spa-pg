import { Select, SelectItem } from "@nextui-org/select";
import { Spinner } from "@nextui-org/spinner";
import { usePeriodosAcademicos } from "../../hooks/usePeriodoAcademico";


export default function PeriodoAcademicoSelect({onPeriodoAcademicoSelect}) {


    const { periodosAcademicosList, isLoading } = usePeriodosAcademicos()
    if (isLoading) {
        return (
            <div className="container flex justify-center">
                <Spinner label="Loading..." color="warning" />
            </div>
        )
    }

    return (
        <Select
            items={periodosAcademicosList}
            label="Periodo Academico"
            placeholder="Seleccionar el periodo academico"
            className="max-w-xs"
            onChange={(e)=>onPeriodoAcademicoSelect(e.target.value)}
        >
            {(periodoAcademico) => <SelectItem key={periodoAcademico.id}>{periodoAcademico.nombre}</SelectItem>}
        </Select>
    )
}