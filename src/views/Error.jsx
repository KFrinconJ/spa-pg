import LogoutButton from '../components/buttons/LogoutButton';

const ErrorPage = ({ errorMessage, errorCode }) => {

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <div className="text-center">
                <h1 className="text-6xl font-semibold text-red-600"> {errorCode} </h1>
                <p className="text-xl mt-4 text-gray-600">{errorMessage}</p>
                <LogoutButton />
            </div>
        </div>
    );
};

export default ErrorPage;
