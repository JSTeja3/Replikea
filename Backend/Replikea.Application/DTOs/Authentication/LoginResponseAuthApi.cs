namespace Replikea.Application.DTOs.Authentication;

public class LoginResponseAuthApi
{
    public string AccessToken { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
}