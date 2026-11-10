# Replikea – Authentication

## 1. Overview

Replikea uses JWT-based authentication with access tokens and refresh tokens.

Authentication is managed by a separate Auth API, while Replikea.Api acts as the browser-facing authentication boundary.

## 2. Components

| Component | Responsibility |
|---|---|
| React | Handles login UI and maintains access token in memory |
| Replikea.Api | Coordinates authentication requests and manages refresh-token cookies |
| Auth API | Validates credentials, generates tokens and manages refresh-token rotation |
| SQL Server | Stores users and refresh-token records |

## 3. Authentication Flow

### Registration
1. User submits registration details through React.
2. Replikea.Api forwards the request to Auth API.
3. Auth API creates the user and stores the password hash.
4. Registration confirmation is returned to React.

### Login
1. React submits the email for checking.
2. Replikea.Api checks the authentication requirements through Auth API.
3. React requests the password when required.
4. Credentials are submitted through Replikea.Api.
5. Auth API validates credentials and generates access and refresh tokens.
6. Replikea.Api returns the access token to React and stores the refresh token in an HttpOnly cookie.

### Session Restoration
1. AuthProvider initializes when the React application starts.
2. React calls the refresh endpoint with browser credentials.
3. The browser automatically sends the HttpOnly refresh-token cookie.
4. Replikea.Api forwards the refresh token to Auth API.
5. Auth API validates and rotates the refresh token.
6. A new access token is returned to React.
7. React retrieves the authenticated user session.

### Token Refresh
1. React requests a new session when required.
2. The browser sends the refresh-token cookie.
3. Replikea.Api forwards it to Auth API.
4. Auth API validates the token and rotates it.
5. The new access token is returned and the refresh-token cookie is updated.

### Logout
1. React calls the logout endpoint.
2. Replikea.Api forwards the refresh token to Auth API for revocation.
3. The refresh-token cookie is cleared.
4. React clears its authentication state.

## 4. Token Storage

| Token | Storage | Purpose |
|---|---|---|
| Access Token | React memory | Authorizes API requests |
| Refresh Token | HttpOnly cookie | Obtains new access tokens |

### Cookie Configuration

| Attribute | Configuration |
|---|---|
| HttpOnly | Enabled |
| Secure | Enabled outside development |
| SameSite | Lax |
| Path | `/api/auth` |
| Domain | Not explicitly configured (host-only cookie) |

## 5. Security Considerations

- Passwords are stored as hashes, never as plain text.
- Refresh tokens are stored in HttpOnly cookies.
- Access tokens are not persisted in localStorage.
- Refresh-token rotation is handled by Auth API.
- CORS is configured to allow the frontend origin with credentials.
- CSRF protection must be addressed before production deployment.
- Authentication secrets must be stored outside source control.

## 6. Current Implementation Status

- [x] User registration
- [x] Email checking
- [x] Login
- [x] JWT access-token generation
- [x] Refresh-token generation and rotation
- [x] HttpOnly cookie management
- [x] Session restoration
- [x] Logout and refresh-token revocation
- [ ] Production-ready CSRF protection
- [ ] Role-based authorization across application features

---

**Document status:** Reflects the current authentication implementation. Update when authentication flows or security decisions change.