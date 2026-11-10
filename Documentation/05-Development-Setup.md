# Replikea – Development Setup

## 1. Prerequisites

Install the following tools:

| Tool | Purpose |
|---|---|
| .NET SDK 8 | Backend development |
| Node.js and npm | Frontend development |
| SQL Server | Database |
| Docker | Local database/container environment |
| Git | Source control |
| VS Code | Development environment |

## 2. Project Structure

```text
Replikea/
├── Backend/
│   ├── Replikea.Api/
│   ├── Replikea.Application/
│   └── Replikea.Infrastructure/
│
├── Frontend/
│   └── Replikea-web/
│
├── Documentation/
└── README.md
```

## 3. Backend Setup

### Restore dependencies

Navigate to the backend project directory and restore dependencies:

```bash
dotnet restore
```

### Configure application settings

Use .NET User Secrets or environment variables for sensitive configuration.

Do not commit credentials, connection strings containing passwords, JWT signing keys or other secrets.

### Run the API

```bash
dotnet run --project Replikea.Api
```

Replikea.Api development URL:

```text
http://localhost:5031
```

Swagger:

```text
http://localhost:5031/swagger/index.html
```

## 4. Frontend Setup

Navigate to the frontend project:

```bash
cd Frontend/Replikea-web
```

Install dependencies:

```bash
npm install
```

Create `.env.development`:

```env
VITE_API_BASE_URL=http://localhost:5031
```

Start the development server:

```bash
npm run dev
```

Frontend development URL:

```text
http://localhost:5173
```

## 5. Development Commands

### Backend

| Command | Purpose |
|---|---|
| `dotnet restore` | Restore NuGet dependencies |
| `dotnet build` | Build backend projects |
| `dotnet run` | Run an application |
| `dotnet test` | Execute tests |

### Frontend

| Command | Purpose |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build frontend |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## 6. Local Development URLs

| Application | URL |
|---|---|
| React frontend | `http://localhost:5173` |
| Replikea.Api | `http://localhost:5031` |
| Replikea.Api Swagger | `http://localhost:5031/swagger/index.html` |

Additional service URLs should be added as their configurations are finalized.

## 7. Environment Configuration

- Keep development-specific settings in local environment files.
- Keep secrets in .NET User Secrets or an appropriate secret manager.
- Do not commit `.env` files containing sensitive information.
- Provide `.env.example` files for required frontend configuration.
- Restart the Vite development server after changing environment variables.

---

**Document status:** Initial local development setup. Update when project configuration, service URLs or development requirements change.