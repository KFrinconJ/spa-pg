import UserInfo from "./UserInfo"
import LoginButton from "./buttons/LoginButton"


export default function AuthenticatedStatus({ isAuthenticated }) {


    if (isAuthenticated) {
        return (<UserInfo />)

    }

    return <LoginButton />




}