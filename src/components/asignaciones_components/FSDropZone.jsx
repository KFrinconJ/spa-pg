import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";

export default function FuncionesSustantivasDropZone({ onDropFuncion, onRemoveFuncion }) {
    const [droppedFunciones, setDroppedFunciones] = useState([]);

    const dragOver = (e) => {
        e.preventDefault();
    }

    const drop = (e) => {
        e.preventDefault();
        const funcion = JSON.parse(e.dataTransfer.getData("text/plain"));
        setDroppedFunciones(prev => [...prev, funcion]);
        onDropFuncion(funcion);
    }

    const removeFuncion = (id) => {
        const funcion = droppedFunciones.find(funcion => funcion.id === id);
        setDroppedFunciones(prev => prev.filter(funcion => funcion.id !== id));
        onRemoveFuncion(funcion);
    }

    return (
        <div 
            className="flex flex-wrap flex-col justify-around border-2 border-dashed border-gray-400 p-4" 
            onDragOver={dragOver}
            onDrop={drop}
            style={{ minHeight: '200px' }}
        >
            {droppedFunciones.length === 0 && <p>Arrastra y suelta aquí</p>}
            {droppedFunciones.map((funcion) => (
                <Card className="max-w-[300px] m-4" key={funcion.id}>
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col">
                            <p className="text-sm">{funcion.nombre}</p>
                            <p className="text-xs text-default-500">{funcion.dependencia}</p>
                        </div>
                        <button onClick={() => removeFuncion(funcion.id)}>Eliminar</button>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <p className="text-sm">{funcion.cantidad_horas}</p>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}
