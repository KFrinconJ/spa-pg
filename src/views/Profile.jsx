import NavBar from "../components/NavBar";
import LoadingView from "./LoadingView";
import UserCard from "../components/profile_components/UserCard";
import DetailUserForm from "../components/profile_components/DetailUserForm";
import { useProfile } from "../hooks/useProfile";

export default function Profile() {
    const { userInfo, isLoading } = useProfile() // Hook personalizado

    if (isLoading) {
        return <LoadingView></LoadingView>; //Renderizar vista de carga
    }

    if (userInfo) {
        return (
            <>
                <NavBar></NavBar>
                <div className="container mx-auto min-h-screen">
                    <UserCard userData={userInfo}>
                    </UserCard>

                    <div className="mt-6">
                        <DetailUserForm dataIn={userInfo} />
                    </div>
                </div>
            </>
        );
    }
}
