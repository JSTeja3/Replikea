using Microsoft.AspNetCore.Mvc;

using Replikea.Application.DTOs.Authentication;
using Replikea.Application.Interfaces;



namespace Replikea.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthenticationService authService;

    public AuthController(IAuthenticationService authService)
    {
        this.authService = authService;
    }


    [HttpPost("check-email")]
    public async Task<ActionResult<CheckEmailResponse>> CheckEmailAsync(CheckEmailRequest request)
    {
        var result = await authService.CheckEmailAsync(request);

        return Ok(result);
    }
}

