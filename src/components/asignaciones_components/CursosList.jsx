import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Divider, Spinner } from "@nextui-org/react";

export default function CursosList({ cursos }) {
    const [dragging, setDragging] = useState(false);

    const dragStart = (e, curso) => {
        setDragging(curso);
        e.dataTransfer.setData("text/plain", JSON.stringify(curso));
    }

    if (!cursos) {
        return (
            <div className="container flex justify-center">
                <Spinner label="Loading..." color="warning" />
            </div>
        )
    }

    return (
        <div className="flex flex-wrap flex-col justify-around">
            {cursos.map((curso) => (
                <Card 
                    className="max-w-[300px] m-4" 
                    key={curso.id}
                    draggable
                    onDragStart={(e) => dragStart(e, curso)}
                >
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col">
                            <p className="text-sm">{curso.nombre}</p>
                            <p className="text-xs text-default-500">{curso.codigo}</p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <p className="text-sm">{curso.cantidad_horas}</p>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}
