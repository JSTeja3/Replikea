using Microsoft.AspNetCore.Mvc;

namespace Replikea.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    [HttpPost("check-email")]
    public IActionResult CheckEmail([FromBody] CheckEmailRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Email))
        {
            return BadRequest("Email is required.");
        }

        return Ok(new
        {
            requiresPassword = true
        });
    }
}

public class CheckEmailRequest
{
    public string Email {get; set;} = string.Empty;
}