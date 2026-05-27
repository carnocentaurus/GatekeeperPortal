function GatekeeperPortal() {
  return(
      <main>
          {/* LANDING SCREEN DIV */}
          <div>
              <p>GATEKEEPER PORTAL</p>

              <p>
                  A secure, member-only skeletop website.
                  <br/>
                  Experience authentication at its purest form.
              </p>

              <button>Start</button>
          </div>


          {/* AUTH DIV */}
          <div>
              <p></p>

              <form>
                  <input type="email" placeholder="Email"/>
                  <input type="password" placeholder="Password"/>
                  <button></button>
              </form>

              <p>Dont have an account? <span>Sign Up</span> instead.</p>

              <button>Back to Landing Screen</button>
          </div>


          {/* DASHBOARD DIV */}
          <div>
              <p>DASHBOARD</p>
              <p></p>

              <button>Update Password</button>
              <button>Log Out</button>
          </div>


          {/* UPDATE PASSWORD DIV */}
          <div>
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