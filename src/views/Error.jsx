import React from 'react';

const ErrorPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <div className="text-center">
                <h1 className="text-6xl font-semibold text-red-600">404</h1>
                <p className="text-xl mt-4 text-gray-600">Lo sentimos, la página que estás buscando no se encuentra.</p>
                <button className="mt-6 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Volver al inicio</button>
            </div>
        </div>
    );
};

export default ErrorPage;
