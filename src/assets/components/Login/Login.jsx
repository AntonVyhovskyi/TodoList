import cls from './Login.module.css'
import googleImg from './google-icon-logo-svgrepo-com.svg'




const Login = (props) => {

    console.log(props.user);
    return (
        <div>
            {props.user ? (
                <div className={cls.loginHeaderContainer}>
                    <div className={cls.headerLogo}><span>toto</span> ToDoList</div>

                    <div className={cls.headerRight}>
                        <div className={cls.headerNameAndImg}>
                            <div className={cls.headerName}>{props.user.displayName}</div>
                            <div className={cls.headerImg}><img src={props.user.photoURL} alt="avatar" /></div>
                        </div>
                        <button onClick={() => props.handleLogout()} className={cls.buttonLogOut}>
                            <div className={cls.buttonLogOutEl1}></div>
                            <div className={cls.buttonLogOutEl2}></div>
                            <div className={cls.buttonLogOutEl3}></div>
                        </button>
                    </div>


                </div>


            )
                :
                (
                    <div className={cls.unloginHeaderContainer}>
                        <div className={cls.unloginHeaderBox}>
                            <button className={cls.unloginHeaderBtn} onClick={() => props.signInWithGoogle()}>
                                <img src={googleImg} alt="goggle" />
                                Continue with Goggle
                            </button>
                        </div>

                    </div>

                )
            }
        </div>
    );
}

export default Login;