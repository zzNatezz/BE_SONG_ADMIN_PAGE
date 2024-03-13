import { useContext } from "react";
import { AppContext } from "../../../Context/Context";
import'./welcome.scss'

function Welcome() {
    const {adminName} = useContext(AppContext)
    return (
        <div className="welcome-container">
            WELCOME <span>{adminName}</span> TO ADMIN PAGE :D
        </div>
    );
}

export default Welcome;