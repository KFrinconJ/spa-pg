import NavBar from "../components/NavBar"
import { useAuth0 } from "@auth0/auth0-react"

export default function Profile() {
    const { user } = useAuth0()

    if (!user) {
        return null
    }
    return (
        <>
            <NavBar></NavBar>
            <h1 className="container mx-auto my-10  text-3xl md:text-5xl text-with-600 font-bold leading-tight text-center md:text-left">Bienvenido, {user.name} </h1>
            <div className="content-layout">
                <h1 id="page-title" className="content__title">
                    Profile Page
                </h1>
                <div className="content__body">
                    <div className="profile-grid">
                        <div className="profile__header">
                            <img
                                src={user.picture}
                                alt="Profile"
                                className="profile__avatar"
                            />
                            <div className="profile__headline">
                                <h2 className="profile__title">{user.name}</h2>
                                <span className="profile__description">{user.email}</span>
                            </div>
                        </div>
                        {JSON.stringify(user)}
                        {/* <div className="profile__details">
                            <CodeSnippet
                                title="Decoded ID Token"
                                code={JSON.stringify(user, null, 2)}
                            />
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}