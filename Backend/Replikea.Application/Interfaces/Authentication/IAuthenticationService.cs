using Replikea.Application.DTOs.Authentication;

namespace Replikea.Application.Interfaces.Authentication;

public interface IAuthenticationService
{
    Task<CheckEmailResponse> CheckEmailAsync(CheckEmailRequest request);
    Task<LoginResponseAuthApi> LoginAsync(LoginRequest request);
}