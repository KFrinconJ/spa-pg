import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { DeleteIcon } from "../../icons/DeleteIcon";

export default function DropZone({ onDropCurso }) {
    const [droppedCursos, setDroppedCursos] = useState([]);

    const dragOver = (e) => {
        e.preventDefault();
    }

    const drop = (e) => {
        e.preventDefault();
        const curso = JSON.parse(e.dataTransfer.getData("text/plain"));
        setDroppedCursos(prev => [...prev, curso]);
        onDropCurso(curso);
    }

    const removeCurso = (id) => {
        const curso = droppedCursos.find(curso => curso.id === id);
        setDroppedCursos(prev => prev.filter(curso => curso.id !== id));
        onDropCurso({ ...curso, cantidad_horas: -curso.cantidad_horas });
    }
    return (
        <div
            className="flex flex-wrap flex-col justify-around border-2 border-dashed border-gray-400 p-4"
            onDragOver={dragOver}
            onDrop={drop}
            style={{ minHeight: '200px' }}
        >
            {droppedCursos.length === 0 && <p>Arrastra y suelta aquí</p>}
            {droppedCursos.map((curso) => (
                <Card className="max-w-[300px] m-1" key={curso.id}>
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col">
                            <p className="text-sm">{curso.nombre}</p>
                            <p className="text-xs text-default-500">{curso.codigo}</p>
                        </div>
                        <button onClick={() => removeCurso(curso.id)} className="text-lg text-danger cursor-pointer active:opacity-50">
                            <DeleteIcon />
                        </button>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <p className="text-sm">Horas semanales: {curso.cantidad_horas}</p>
                    </CardBody>
                </Card>
            ))}
        </div>
    );

}
