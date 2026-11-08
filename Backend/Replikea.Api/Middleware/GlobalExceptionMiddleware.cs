using System.Net;
using Replikea.Application.Exceptions;

namespace Replikea.Api.Middleware;

public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate next;
    private readonly ILogger<GlobalExceptionMiddleware> logger;

    public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
    {
        this.next = next;
        this.logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch(Exception exception)
        {
            logger.LogError(exception, "An unexpected error occured while processing the request");

            await HandleExceptionAsync(context, exception);
        }
    }

    public static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var statusCode = exception switch
        {
            DuplicateEmailException => HttpStatusCode.Conflict,
            InvalidCredentialsException => HttpStatusCode.Unauthorized,
            ArgumentException => HttpStatusCode.BadRequest,
            UnauthorizedAccessException => HttpStatusCode.Unauthorized,
            _ => HttpStatusCode.InternalServerError
        };

        context.Response.StatusCode = (int)statusCode;
        context.Response.ContentType = "application/json";

        var message = (statusCode == HttpStatusCode.InternalServerError) ? "An unexpected error occurred." : exception.Message;

        await context.Response.WriteAsJsonAsync(new
        {
            statusCode = (int)statusCode,
            message
        });
    }
}
