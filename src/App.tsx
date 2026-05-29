import { useState } from "react";

function GatekeeperPortal() {
    const [currentView, setCurrentView] = useState('landing-screen-div');

    const [authTitle, setAuthTitle] = useState('Log into your account');
    const [authBtnText, setAuthBtnText] = useState('Log In');
    const [authAccountText, setAuthAccountText] = useState('Dont have an account? ');
    const [authInsteadText, setAuthInsteadText] = useState('Sign Up');

    let isSignUp:boolean = false; // start as log in


    function handleTextDisplay(): void {
        if (isSignUp) {
            setAuthTitle('Create Account');
            setAuthBtnText('Create Account');
            setAuthAccountText('Already have an account? ');
            setAuthInsteadText('Log In');
        }
        else {
            setAuthTitle('Log into your account');
            setAuthBtnText('Log In');
            setAuthAccountText('Dont have an account? ');
            setAuthInsteadText('Sign Up');
        }
    }
    

    handleTextDisplay();


    return(
        <main className="
            flex
            justify-center
            items-center
            h-screen
        ">
            {/* LANDING SCREEN DIV */}
            <div className={currentView === 'landing-screen-div' ? '' : 'hidden'}>
                <p className="font-righteous text-5xl">GATEKEEPER PORTAL</p>

                <p>
                    A secure, member-only skeletop website.
                    <br/>
                    Experience authentication at its purest form.
                </p>

                <button onClick={() => setCurrentView('auth-div')}>Start</button>
            </div>


            {/* AUTH DIV */}
            <div className={currentView === 'auth-div' ? '' : 'hidden'}>
                <p>{authTitle}</p>

                <form>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <button>{authBtnText}</button>
                </form>

                <p>{authAccountText}<span>{authInsteadText}</span> instead.</p>

                <button onClick={() => setCurrentView('landing-screen-div')}>Back to Landing Screen</button>
            </div>


            {/* DASHBOARD DIV */}
            <div className={currentView === 'dashboard-div' ? '' : 'hidden'}>
                <p>DASHBOARD</p>
                <p></p>

                <button onClick={() => setCurrentView('update-password-div')}>Update Password</button>
                <button>Log Out</button>
            </div>


            {/* UPDATE PASSWORD DIV */}
            <div className={currentView === 'update-password-div' ? '' : 'hidden'}>
                <p>Update Password</p>

                <form>
                    <input type="password" placeholder="New Password"/>
                    <button>Update Password</button>
                </form>
            </div>
        </main>
    );
}

export default GatekeeperPortal;