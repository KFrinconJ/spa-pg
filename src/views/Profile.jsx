import NavBar from "../components/NavBar"
import { useAuth0 } from "@auth0/auth0-react"
import ErrorPage from "./Error"
import { Input } from "@nextui-org/react";

export default function Profile() {
    const { user } = useAuth0()

    if (!user) {
        return null
    }
    return (
        <>
            <NavBar></NavBar>
            <div className="container mx-auto my-10 px-4 md:px-0">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl">
                    <div className="md:flex">
                        <div className="md:flex-shrink-0">
                            <img className="h-48 w-full object-cover md:w-48" src={user.picture} alt="Profile" />
                        </div>
                        <div className="p-8">
                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Perfil de usuario</div>
                            <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{user.name}</h2>
                            <p className="mt-2 text-gray-500">{user.email}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <h2 className="text-2xl font-bold mb-2">Detalles del usuario:</h2>
                    <form action="" className="w-full max-w-lg mx-auto mt-5">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">

                                <Input type="email" id="email-1" placeholder="Enter your email" />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <Input type="email" id="email-2" placeholder="Enter your email" />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <Input type="email" id="email-3" placeholder="Enter your email" />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <Input type="email" id="email-4" placeholder="Enter your email" />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <Input type="email" id="email-5" placeholder="Enter your email" />
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}
