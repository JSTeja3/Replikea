# Replikea – System Architecture

## 1. Overview

Replikea is an enterprise retail application built using React and ASP.NET Core.

The application follows a layered backend architecture. The frontend communicates with the backend through REST APIs, while the backend coordinates business operations, data access and external service integrations.

## 2. High-Level Architecture

```text
             User / Browser
                   |
                   v
          React + TypeScript
          (Presentation Layer)
                   |
               HTTP / REST
                   |
                   v
              Replikea.Api
          (API / Entry Point)
                   |
                   v
          Replikea.Application
       (Application Logic / Use Cases)
                   |
                   v
          Infrastructure Layer
        (Data Access / Integrations)
                   |
                   v
               SQL Server
                   or
                Other APIs


       Replikea.Api
             |
             | HTTP
             v
           Auth API
     (Authentication / Tokens)
```

## 3. Component Responsibilities

| Component | Responsibility |
|---|---|
| React | UI rendering, user interactions and frontend state |
| Replikea.Api | Handles frontend HTTP requests and coordinates application operations |
| Application | Application use cases, orchestration and service contracts |
| Infrastructure | Database access and external service implementations |
| Auth API | User authentication, JWT generation and refresh-token management |
| SQL Server | Persistent application data |

## 4. Backend Architecture

The backend follows a layered structure:

- **API Layer:** Exposes HTTP endpoints and handles incoming requests.
- **Application Layer:** Coordinates use cases and application-level operations.
- **Infrastructure Layer:** Implements persistence and external integrations.


## 5. Service Communication

- React communicates with Replikea.Api using HTTP requests.
- Replikea.Api communicates with Auth API for authentication operations.
- Application services coordinate backend operations.
- Infrastructure handles database communication through Entity Framework Core and Other API calls.

React does not communicate directly with Auth API.

## 6. Technology Choices

| Area | Technology |
|---|---|
| Frontend | React + TypeScript |
| Backend | ASP.NET Core |
| ORM | Entity Framework Core |
| Database | SQL Server |
| Authentication | JWT + Refresh Tokens |
| Frontend tooling | Vite |

## 7. Architecture Considerations

- Maintain separation of concerns between layers.
- Keep business logic outside controllers.
- Use dependency injection for service dependencies.
- Keep external service integrations behind application-facing abstractions.
- Avoid coupling frontend components to backend implementation details.

---

**Document status:** Initial architecture documentation. Update when significant architectural decisions or service boundaries change.