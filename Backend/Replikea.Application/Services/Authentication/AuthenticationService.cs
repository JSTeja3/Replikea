using Replikea.Application.DTOs.Authentication;
using Replikea.Application.Interfaces.Authentication;

namespace Replikea.Application.Services.Authentication;

public class AuthenticationService : IAuthenticationService
{
    private readonly IAuthApiClient authApiClient;

    public AuthenticationService(IAuthApiClient authApiClient)
    {
        this.authApiClient = authApiClient;
    }

    public async Task<CheckEmailResponse> CheckEmailAsync(CheckEmailRequest request)
    {
        // Code to call Auth API

        await Task.CompletedTask;

        return new CheckEmailResponse
        {
            RequiresPassword = true
        };
    }
    public async Task<LoginResponseAuthApi> LoginAsync(LoginRequest request)
    {
        return await authApiClient.LoginAsync(request);
    }
    public async Task<LoginResponseAuthApi> RefreshAsync(RefreshRequest request)
    {
        return await authApiClient.RefreshAsync(request);
    }
    public async Task<LogoutResponse> LogoutAsync(LogoutRequest request)
    {
        return await authApiClient.LogoutAsync(request);
    }
}