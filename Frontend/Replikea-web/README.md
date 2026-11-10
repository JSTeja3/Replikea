# Replikea Web

The frontend application for **Replikea Enterprise**, built using React, TypeScript and Vite.

It provides the user interface for interacting with Replikea's backend APIs, including authentication and enterprise application workflows.

## Technology Stack

| Technology | Purpose |
|---|---|
| React | Component-based UI development |
| TypeScript | Static typing |
| Vite | Frontend development and build tooling |
| CSS | Styling and responsive layouts |
| Lucide React | Icons |
| Fetch API | HTTP communication with backend APIs |

## Prerequisites

Ensure the following are installed:

- Node.js
- npm
- Git

The backend API should also be running when testing features that require server communication.

## Getting Started

### 1. Navigate to the frontend project

```bash
cd Frontend/Replikea-web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.development` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:5031
```

This variable defines the base URL used for communication with Replikea.Api.

**Note:** Variables prefixed with `VITE_` are exposed to the frontend application. Never store passwords, private keys, API secrets or other sensitive credentials in frontend environment variables.

### 4. Start the development server

```bash
npm run dev
```

The Vite development server runs at:

```text
http://localhost:5173
```

### 5. Build the application

```bash
npm run build
```

This performs TypeScript project checks and generates the production build.

## Available Commands

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Checks TypeScript and creates production build |
| `npm run lint` | Runs ESLint |
| `npm run preview` | Previews the production build locally |

## Project Structure

```text
Replikea-web/
├── public/
│   └── replikea_icon.png
│   └── replikea_logo.png
│
├── src/
│   ├── context/
│   │   ├── AuthContext.ts
│   │   ├── AuthProvider.tsx
│   │   └── useAuth.ts
│   │
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── HomePage.tsx
│   │
│   ├── services/
│   │   └── authService.ts
│   │
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
│
├── .env.development
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Application Structure

### Pages

Contains the application's page-level React components.

- **LoginPage:** Handles the login experience and email verification flow.
- **RegisterPage:** Handles new user registration.
- **HomePage:** Initial authenticated landing page.

### Context

Contains authentication-related global state and functionality.

- **AuthContext:** Defines the authentication context and its types.
- **AuthProvider:** Provides authentication state and session initialization to the application.
- **useAuth:** Custom hook for accessing authentication context.

### Services

Contains modules responsible for communicating with backend APIs.

- **authService:** Centralizes authentication-related HTTP requests.

### Styling

- `index.css`: Global styles, design variables and common styling.
- `App.css`: Application layout and component-specific styles.

## Authentication Flow

Replikea uses a backend-managed authentication flow.

The frontend communicates with `Replikea.Api`, which coordinates authentication with the Auth API.

The current authentication flow includes:

1. **Registration:** New users can register using their details.
2. **Login:** Credentials are submitted to the backend for validation.
3. **Access Token:** The frontend receives an access token after successful authentication.
4. **Refresh Token:** The refresh token is maintained in an HttpOnly cookie managed by the backend.
5. **Session Restoration:** The application attempts to restore an existing authenticated session when initialized.
6. **Logout:** The backend revokes the refresh token and the frontend clears its authentication state.

### Token Storage

- Access token: Maintained in React application memory.
- Refresh token: Stored in an HttpOnly cookie by the backend.
- The frontend uses `credentials: "include"` for requests that need browser cookies.

## API Integration

The frontend communicates with the backend using the Fetch API.

The base URL is configured through:

```env
VITE_API_BASE_URL=http://localhost:5031
```

Authentication API calls are centralized in `src/services/authService.ts` rather than being duplicated across page components.

## Build and Deployment

Generate the production build:

```bash
npm run build
```

The generated production files are placed in the `dist/` directory.

For a local production preview:

```bash
npm run preview
```

Deployment configuration and hosting details will be documented as the application moves towards production.

---

Part of the Replikea Enterprise project.