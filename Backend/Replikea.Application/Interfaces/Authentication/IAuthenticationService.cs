using Replikea.Application.DTOs.Authentication;

namespace Replikea.Application.Interfaces.Authentication;

public interface IAuthenticationService
{
    Task<CheckEmailResponse> CheckEmailAsync(CheckEmailRequest request);
    Task<LoginResponseAuthApi> LoginAsync(LoginRequest request);
    Task<LoginResponseAuthApi> RefreshAsync(RefreshRequest request);
    Task<LogoutResponse> LogoutAsync(LogoutRequest request);
    Task<RegisterResponse> RegisterAsync(RegisterRequest request);
    Task<UserProfileResponse> GetProfileAsync(string accessToken, CancellationToken cancellationToken = default);
}