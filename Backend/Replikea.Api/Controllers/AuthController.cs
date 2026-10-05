using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

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

    [Authorize]
    [HttpGet("session")]
    public IActionResult GetSession()
    {
        // To get how claims are assigned
        // var claims = User.Claims.Select(c => new
        // {
        //     c.Type,
        //     c.Value
        // });

        // return Ok(claims);

        return Ok(new
        {
            authenticated = true,
            userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value,
            email = User.FindFirst(ClaimTypes.Email)?.Value,
            role = User.FindFirst(ClaimTypes.Role)?.Value
        });
    }


    [HttpPost("check-email")]
    public async Task<ActionResult<CheckEmailResponse>> CheckEmailAsync(CheckEmailRequest request)
    {
        var result = await authService.CheckEmailAsync(request);

        return Ok(result);
    }
}

