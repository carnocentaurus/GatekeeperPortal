# GatekeeperPortal
A secure, member-only skeleton website built with React, Tailwind CSS, and TypeScript. It utilizes Supabase for authentication and user management, providing a "pure" authentication experience.

## Features
- Secure user registration and login
- Email validation (specifically for @gmail.com addresses)
- Real-time authentication state handling
- Password update functionality
- Clean, responsive dashboard interface
- Lightweight and fast performance

## Tech Stack
| Technology | Purpose |
|------------|---------|
| React 19 | UI components and state management |
| TypeScript | Type safety and improved developer experience |
| Vite | Fast build tool and development server |
| Tailwind CSS 4 | Modern utility-first styling |
| Supabase | Backend-as-a-Service for Authentication |

## How It Works
1. Users begin at the landing screen and proceed to the authentication portal.
2. The application provides both Log In and Sign Up views:
   - Registration includes a client-side check for `@gmail.com` domains.
   - Authentication is handled securely through the `supabaseClient`.
3. Upon successful authentication, the `onAuthStateChange` listener updates the view to the Dashboard.
4. The Dashboard displays a personalized welcome message and provides options to:
   - Update the account password.
   - Securely log out and clear the session.
5. React state management ensures seamless transitions between different views without page reloads.

## Screenshots
- [Landing Screen](./src/assets/screenshots/landingScreen.png)
- [Authentication Screen](./src/assets/screenshots/authScreen.png)
- [Dashboard](./src/assets/screenshots/dashboard.png)
- [Update Password Screen](./src/assets/screenshots/updatePasswordScreen.png)

## How to Run
1. Navigate to the project folder:
   ```bash
   cd GatekeeperPortal
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (Create a `.env.local` file):
   ```
   VITE_SUPABASE_PROJECT_URL=your_project_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open the provided local URL in your browser.

## Future Improvements
- Multi-factor authentication (MFA)
- User profile management (avatar, display name)
- Password recovery/reset flow via email
- Role-based access control (RBAC)

## API Reference
This project utilizes the [@supabase/supabase-js](https://supabase.com/docs/reference/javascript/introduction) library for its core authentication functionality.