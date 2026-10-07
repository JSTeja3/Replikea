using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using Replikea.Application.Interfaces.Authentication;
using Replikea.Application.Services.Authentication;
using Replikea.Infrastructure.Authentication;


var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReplikeaFrontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var jwtKey = builder.Configuration["JWT_KEY"] ?? throw new InvalidOperationException("JWT key is not configured.");
var jwtIssuer = builder.Configuration["JWT_ISSUER"] ?? throw new InvalidOperationException("JWT issuer is not configured.");
var jwtAudience = builder.Configuration["JWT_AUDIENCE"] ?? throw new InvalidOperationException("JWT audience is not configured.");


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
   .AddJwtBearer(options =>
   {
       options.TokenValidationParameters = new TokenValidationParameters
       {
           ValidateIssuerSigningKey = true,
           IssuerSigningKey = new SymmetricSecurityKey(
               Encoding.UTF8.GetBytes(jwtKey)),

           ValidateIssuer = true,
           ValidIssuer = jwtIssuer,

           ValidateAudience = true,
           ValidAudience = jwtAudience,

           ValidateLifetime = true,

           ClockSkew = TimeSpan.Zero
       };
   });

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter your JWT token."
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});  

builder.Services.AddHttpClient<IAuthApiClient, AuthApiClient>(
    client =>
    {
        client.BaseAddress = new Uri(
            builder.Configuration["AuthApi:BaseUrl"]
            ?? throw new InvalidOperationException(
                "Auth API base URL is not configured."));
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("ReplikeaFrontend");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

