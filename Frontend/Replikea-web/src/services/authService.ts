const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    message: string;
}

export interface CheckEmailRequest {
    email: string;
}

export interface CheckEmailResponse{
    requiresPassword: boolean;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
}

export interface SessionResponse {
    authenticated: boolean;
    userId: string;
    email: string;
    role: string;
}

export interface RefreshResponse {
    accessToken: string;
}

export interface LogoutResponse {
    message: string;
}

async function handleResponse<T>(
    response: Response,
    fallbackMessage: string
): Promise<T> {
    const text = await response.text();

    let data: unknown = null;

    if (text) {
        try {
            data = JSON.parse(text);
        } catch {
            throw new Error("Server returned an invalid response.");
        }
    }

    if (!response.ok) {
        const message =
            typeof data === "object" &&
            data !== null &&
            "message" in data &&
            typeof data.message === "string"
                ? data.message
                : fallbackMessage;

        throw new Error(message);
    }

    if (data === null) {
        throw new Error("Server returned an empty response.");
    }

    return data as T;
}

export async function register(request: RegisterRequest): Promise<RegisterResponse> {

    const response = await fetch(
        `${API_BASE_URL}/api/auth/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        }
    );

    return handleResponse<RegisterResponse>(
        response,
        "Registration failed"
    );
}

export async function checkEmail(request: CheckEmailRequest): Promise<CheckEmailResponse> {

    const response = await fetch(
        `${API_BASE_URL}/api/auth/check-email`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        }
    );

    return handleResponse<CheckEmailResponse>(
        response,
        "Unable to check email"
    );
}

export async function login(request: LoginRequest): Promise<LoginResponse>{
    const response = await fetch(
        `${API_BASE_URL}/api/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(request),
        }
    );

    return handleResponse<LoginResponse>(
        response,
        "Invalid email or password"
    );

}

export async function getSession(accessToken: string): Promise<SessionResponse> {

    const response = await fetch(
        `${API_BASE_URL}/api/auth/session`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    return handleResponse<SessionResponse>(
        response,
        "Unable to retrieve session"
    );
    
}

export async function refreshSession(): Promise<RefreshResponse> {
    const response = await fetch(
        `${API_BASE_URL}/api/auth/refresh`,
        {
            method: "POST",
            credentials: "include",
        }
    );

    return handleResponse<RefreshResponse>(
        response,
        "Unable to refresh session"
    );
}

export async function logout(): Promise<LogoutResponse> {
    const response = await fetch(
        `${API_BASE_URL}/api/auth/logout`,
        {
            method: "POST",
            credentials: "include",
        }
    );

    return handleResponse<LogoutResponse>(
        response,
        "Logout failed"
    );
}