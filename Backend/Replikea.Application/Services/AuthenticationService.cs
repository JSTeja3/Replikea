using Replikea.Application.DTOs.Authentication;
using Replikea.Application.Interfaces;

namespace Replikea.Application.Services;

public class AuthenticationService : IAuthenticationService
{
    public async Task<CheckEmailResponse> CheckEmailAsync(CheckEmailRequest request)
    {
        // Code to call Auth API

        await Task.CompletedTask;

        return new CheckEmailResponse
        {
            RequiresPassword = true
        };
    }
}