import { useContext } from "react";
import { AppContext } from "../../../Context/Context";

function Welcome() {
    const {adminName} = useContext(AppContext)
    return (
        <div>
            WELCOME {adminName} TO ADMIN PAGE :D
        </div>
    );
}

export default Welcome;