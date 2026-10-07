using Replikea.Application.DTOs.Authentication;

namespace Replikea.Application.Interfaces.Authentication;

public interface IAuthApiClient
{
    Task<LoginResponseAuthApi> LoginAsync(LoginRequest request);
}