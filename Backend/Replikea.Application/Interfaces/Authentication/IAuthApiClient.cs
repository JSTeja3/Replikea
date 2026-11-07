using Replikea.Application.DTOs.Authentication;

namespace Replikea.Application.Interfaces.Authentication;

public interface IAuthApiClient
{
    Task<LoginResponseAuthApi> LoginAsync(LoginRequest request);
    Task<LoginResponseAuthApi> RefreshAsync(RefreshRequest request);
    Task<LogoutResponse> LogoutAsync(LogoutRequest request);
    Task<RegisterResponse> RegisterAsync(RegisterRequest request);
}