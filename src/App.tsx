import { useState } from "react";

function GatekeeperPortal() {
    const [currentView, setCurrentView] = useState('landing-screen-div');

  return(
      <main>
          {/* LANDING SCREEN DIV */}
          <div className={currentView === 'landing-screen-div' ? '' : 'hidden'}>
              <p>GATEKEEPER PORTAL</p>

              <p>
                  A secure, member-only skeletop website.
                  <br/>
                  Experience authentication at its purest form.
              </p>

              <button onClick={() => setCurrentView('auth-div')}>Start</button>
          </div>


          {/* AUTH DIV */}
          <div className={currentView === 'auth-div' ? '' : 'hidden'}>
              <p></p>

              <form>
                  <input type="email" placeholder="Email"/>
                  <input type="password" placeholder="Password"/>
                  <button></button>
              </form>

              <p>Dont have an account? <span>Sign Up</span> instead.</p>

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