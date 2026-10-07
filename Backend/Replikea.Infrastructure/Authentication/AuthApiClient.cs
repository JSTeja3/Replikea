using System.Net.Http.Json;
using Replikea.Application.Interfaces.Authentication;
using Replikea.Application.DTOs.Authentication;

namespace Replikea.Infrastructure.Authentication;

public class AuthApiClient : IAuthApiClient
{
    private readonly HttpClient httpClient;

    public AuthApiClient(HttpClient httpClient)
    {
        this.httpClient = httpClient;
    }

    public async Task<LoginResponseAuthApi> LoginAsync(LoginRequest request)
    {
        var response = await httpClient.PostAsJsonAsync("/api/auth/login", request);

        response.EnsureSuccessStatusCode();

        var result = await response.Content
            .ReadFromJsonAsync<LoginResponseAuthApi>();

        return result
            ?? throw new InvalidOperationException(
                "Auth API returned an empty response.");
        
    }
}