using Replikea.Application.DTOs.Authentication;

namespace Replikea.Application.Interfaces;

public interface IAuthenticationService
{
    Task<CheckEmailResponse> CheckEmailAsync(CheckEmailRequest request);
}