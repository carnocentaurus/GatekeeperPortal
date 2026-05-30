import { useState } from "react";
import { supabaseClient } from "./supabaseClient";

function GatekeeperPortal() {
    const [currentView, setCurrentView] = useState('landing-screen-div');

    const [authTitle, setAuthTitle] = useState('Log into your account');
    const [authBtnText, setAuthBtnText] = useState('Log In');
    const [authAccountText, setAuthAccountText] = useState('Dont have an account? ');
    const [authInsteadText, setAuthInsteadText] = useState('Sign Up');

    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

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

    
    async function handleAuth(event: React.FormEvent): Promise<void> {
        event.preventDefault();

        const email = emailInput;
        const password = passwordInput;

        if (isSignUp) {
            if (!String(email).includes('@gmail.com')) {
                alert('Email must contain `@gmail.com` at the end');
                return;
            }

            const {error} = await supabaseClient.auth.signUp({email, password});

            if (error) alert(`Sign up error: ${error}`);

            alert('Sign up success!');
            isSignUp = false;
            handleTextDisplay();
        }
        else {
            const {error} = await supabaseClient.auth.signInWithPassword({email, password});

            if (error) {
                alert(`Log in error: ${error}`);
                return;
            }

            alert('Log in successful!');
        }
    }


    async function handleLogOut(): Promise<void> {
        const {error} = await supabaseClient.auth.signOut();

        if (error) alert(`Log out error: ${error.message}`);

        setEmailInput('');
        setPasswordInput('');

        setCurrentView('dashboard-div');
    }


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

                <form onSubmit={handleAuth}>
                    <input 
                        value={emailInput}
                        onChange={(event) => setEmailInput(event.target.value)}
                        type="email" 
                        placeholder="Email"
                    />
                    <input 
                        value={passwordInput}
                        onChange={(event) => setPasswordInput(event.target.value)}
                        type="password" 
                        placeholder="Password"
                    />
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
                <button onClick={handleLogOut}>Log Out</button>
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