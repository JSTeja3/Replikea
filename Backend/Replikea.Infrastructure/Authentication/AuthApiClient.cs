using System.Net.Http.Json;
using Replikea.Application.Interfaces.Authentication;
using Replikea.Application.DTOs.Authentication;
using System.Net;
using Replikea.Application.Exceptions;
using System.Net.Http.Headers;

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

        if (response.StatusCode == HttpStatusCode.Unauthorized)
        {
            throw new InvalidCredentialsException("Invalid email or password.");
        }

        response.EnsureSuccessStatusCode();

        var result = await response.Content
            .ReadFromJsonAsync<LoginResponseAuthApi>();

        return result
            ?? throw new InvalidOperationException(
                "Auth API returned an empty login response.");

    }
    public async Task<LoginResponseAuthApi> RefreshAsync(RefreshRequest request)
    {
        var response = await httpClient.PostAsJsonAsync("/api/auth/refresh", request);

        response.EnsureSuccessStatusCode();

        var result = await response.Content
            .ReadFromJsonAsync<LoginResponseAuthApi>();

        return result
            ?? throw new InvalidOperationException(
                "Auth API returned an empty refresh response.");

    }
    public async Task<LogoutResponse> LogoutAsync(LogoutRequest request)
    {
        var response = await httpClient.PostAsJsonAsync("/api/auth/logout", request);

        response.EnsureSuccessStatusCode();

        var result = await response.Content
            .ReadFromJsonAsync<LogoutResponse>();

        return result
            ?? throw new InvalidOperationException(
                "Auth API returned an empty logout response.");

    }
    public async Task<RegisterResponse> RegisterAsync(RegisterRequest request)
    {
        var response = await httpClient.PostAsJsonAsync("/api/auth/register", request);

        if (response.StatusCode == HttpStatusCode.Conflict)
        {
            throw new DuplicateEmailException("An account with this email address already exists.");
        }

        response.EnsureSuccessStatusCode();

        var result = await response.Content
        .ReadFromJsonAsync<RegisterResponse>();

        return result
            ?? throw new InvalidOperationException(
                "Auth API returned an empty registration response.");

    }



    public async Task<UserProfileResponse> GetProfileAsync(string accessToken, CancellationToken cancellationToken = default)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(accessToken);

       
        using var request = new HttpRequestMessage(HttpMethod.Get, "/api/auth/profile");

        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

        //using var response helps dispose response safely when its use is completed as since HttpResponseMessage uses IDisposable
        var response = await httpClient.SendAsync(
            request,
            cancellationToken
        );

        response.EnsureSuccessStatusCode();

        var result = await response.Content
        .ReadFromJsonAsync<UserProfileResponse>(cancellationToken);

        return result
            ?? throw new InvalidOperationException(
                "Auth API returned an empty profile response."
            );
    }
}