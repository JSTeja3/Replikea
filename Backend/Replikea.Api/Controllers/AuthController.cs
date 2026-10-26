using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

using Replikea.Application.DTOs.Authentication;
using Replikea.Application.Interfaces.Authentication;



namespace Replikea.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthenticationService authService;
    private readonly IWebHostEnvironment environment;

    public AuthController(IAuthenticationService authService, IWebHostEnvironment environment)
    {
        this.authService = authService;
        this.environment = environment;
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

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseAuthApi>> Login(
    LoginRequest request)
    {
        var result = await authService.LoginAsync(request);

        //Store refresh token in browser-managed cookie 
        Response.Cookies.Append(
            "replikea_refresh",
            result.RefreshToken,
            new CookieOptions
            {
                HttpOnly = true,
                Secure = !environment.IsDevelopment(),
                SameSite = SameSiteMode.Lax,
                Path = "api/auth"
            }
        );


        //Return only access token to react in response body
        return Ok(new LoginResponse
        {
            AccessToken = result.AccessToken
        });
    }
}

