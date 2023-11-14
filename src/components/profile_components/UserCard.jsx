export default function UserCard({ userData }) {
    return (
        <div className="max-w-4xl mx-auto mt-10 bg-gray-800 text-white rounded-lg shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="p-8">
                    <h1 className="uppercase tracking-wide text-lg text-indigo-500 font-semibold">
                        Perfil de usuario
                    </h1>
                    <p className="mt-2 text-gray-300">{userData.email}</p>
                </div>
            </div>
        </div>
    )
}
