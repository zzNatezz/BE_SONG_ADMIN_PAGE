import react, { useContext } from "react";
import image from "../../assets/png/image";
import "./Login.scss";
import Icon from "../../assets/svg/Icon";
import { AppContext } from "../../Context/Context";

function Login() {
    const { username, password, setUserName, setPassword, setLoading, handleSubmit } =
        useContext(AppContext);
    return (
        <div className="login-container">
            <div className="login-top">
                <img src={image.mainLogo} alt="main_logo" />
                <h1>STAVE ADMIN ROLE</h1>
            </div>
            <div className="login-sub">`</div>
            <form className="login-content">
                <div className="login-username">
                    <img src={Icon.message} alt="messageIcon" />
                    <input
                        type="input"
                        placeholder="Fill in your email or user name here"
                        required
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className="login-password">
                    <img src={Icon.lock} alt="lockIcon" />
                    <input
                        type="password"
                        placeholder="Fill in your passwork here"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="login-submitbtn">
                    <button onClick={(e) => handleSubmit(e)} className="submit-btn">SUBMIT</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
