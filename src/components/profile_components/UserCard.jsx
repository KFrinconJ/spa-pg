export default function UserCard({ userData }) {
    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <img
                        className="h-48 w-full object-cover md:w-48"
                        src={userData.picture}
                        alt="Profile"
                    />
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        Perfil de usuario
                    </div>
                    <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
                        {userData.name}
                    </h2>
                    <p className="mt-2 text-gray-500">{userData.email}</p>
                </div>
            </div>
        </div>

    )
}