import NavBar from "../components/NavBar"
import Loading from "../components/Loading"

export default function LoadingView() {
    return (
        <>
            <NavBar></NavBar>
            <div className="container mx-auto px-10 flex items-center justify-center min-h-screen">
                <Loading></Loading>
            </div>
        </>
    )
}
