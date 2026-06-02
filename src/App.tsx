import { useState, useEffect } from "react";
import { supabaseClient } from "./supabaseClient";
import { type JSX } from "react";

function GatekeeperPortal(): JSX.Element {
    const [currentView, setCurrentView] = useState<string>('landing-screen-div');

    const [isSignUp, setIsSignUp] = useState<boolean>(false);

    const [authTitle, setAuthTitle] = useState<string>('Log into your account');
    const [authBtnText, setAuthBtnText] = useState<string>('Log In');
    const [authAccountText, setAuthAccountText] = useState<string>('Dont have an account? ');
    const [authInsteadText, setAuthInsteadText] = useState<string>('Sign Up');
    const [welcomeMsg, setWelcomeMsg] = useState<string>('');

    const [emailInput, setEmailInput] = useState<string>('');
    const [passwordInput, setPasswordInput] = useState<string>('');
    const [newPasswordInput, setNewPasswordInput] = useState<string>('');


    function handleTextDisplay(): void {
        const nextSignUpState:boolean = !isSignUp;
        setIsSignUp(nextSignUpState);

        if (nextSignUpState) {
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

    
    async function handleAuth(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        const email:string = emailInput;
        const password:string = passwordInput;

        if (isSignUp) {
            if (!String(email).includes('@gmail.com')) {
                alert('Email must contain `@gmail.com` at the end');
                return;
            }

            const {error} = await supabaseClient.auth.signUp({email, password});

            if (error) alert(`Sign up error: ${error}`);

            alert('Sign up success!');
            setIsSignUp(false);
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

        setCurrentView('landing-screen-div');
    }


    function handleInsteadTextClicks(): void {
        const nextSignUpState:boolean = !isSignUp;
        setIsSignUp(nextSignUpState);

        handleTextDisplay();
    }


    useEffect(() => {
        supabaseClient.auth.onAuthStateChange((event:string, session:any) => {
            if (session) {
                setWelcomeMsg(`Welcome, ${session.user.email}!`);
                setCurrentView('dashboard-div');

                setEmailInput('');
                setPasswordInput('');
            }
            else {
                setWelcomeMsg('');
                setCurrentView('landing-screen-div');
            }
        });
    }, [])


    async function handleUpdatePassword(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        const newPassword:string = newPasswordInput;
        const {error} = await supabaseClient.auth.updateUser({password: newPassword});

        if (error) alert(`Password update failed: ${error.message}`);

        alert('Password updated successfully!');
        setNewPasswordInput('');
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
                <p className="font-righteous text-5xl md:text-8xl">
                    GATEKEEPER PORTAL
                </p>

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

                <p>{authAccountText}<span onClick={handleInsteadTextClicks} className="text-blue-700">{authInsteadText}</span> instead.</p>

                <button onClick={() => setCurrentView('landing-screen-div')}>Back to Landing Screen</button>
            </div>


            {/* DASHBOARD DIV */}
            <div className={currentView === 'dashboard-div' ? '' : 'hidden'}>
                <p className="font-righteous text-5xl md:text-8xl">DASHBOARD</p>
                <p>{welcomeMsg}</p>

                <button onClick={() => setCurrentView('update-password-div')}>Update Password</button>
                <button onClick={handleLogOut}>Log Out</button>
            </div>


            {/* UPDATE PASSWORD DIV */}
            <div className={currentView === 'update-password-div' ? '' : 'hidden'}>
                <p>Update Password</p>

                <form onSubmit={handleUpdatePassword}>
                    <input 
                        value={newPasswordInput}
                        onChange={(event) => setNewPasswordInput(event.target.value)}
                        type="password" 
                        placeholder="New Password"
                    />
                    <button>Update Password</button>
                </form>
            </div>
        </main>
    );
}

export default GatekeeperPortal;