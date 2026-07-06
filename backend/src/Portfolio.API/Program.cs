using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Portfolio.Application.Features.Contact.Commands;
using Portfolio.Application.Interfaces;
using Portfolio.Infrastructure.Data;
using Portfolio.Infrastructure.Repositories;
using Portfolio.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// ──────────────────────────────────────────
// Services
// ──────────────────────────────────────────

// Controllers + API
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new()
    {
        Title = "Rutvik Gohel Portfolio API",
        Version = "v1",
        Description = "Backend API for Rutvik Gohel's portfolio — contact, analytics, and admin."
    });
});

// Database (PostgreSQL)
builder.Services.AddDbContext<PortfolioDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// MediatR (CQRS handlers)
builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssembly(typeof(SendContactMessageHandler).Assembly));

// FluentValidation
builder.Services.AddValidatorsFromAssembly(typeof(SendContactMessageHandler).Assembly);

// Repositories
builder.Services.AddScoped<IContactRepository, ContactRepository>();
builder.Services.AddScoped<IAnalyticsRepository, AnalyticsRepository>();

// Services
builder.Services.AddScoped<IEmailService, EmailService>();

// CORS — allow frontend dev server + production domain
builder.Services.AddCors(options =>
{
    options.AddPolicy("Portfolio", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:5173",
                "http://localhost:3000",
                "https://rutvikgohel.dev"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

// Rate limiting
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("contact", o =>
    {
        o.Window = TimeSpan.FromHours(1);
        o.PermitLimit = 10;
        o.QueueLimit = 0;
    });
});

// Health checks
builder.Services.AddHealthChecks()
    .AddCheck("self", () => HealthCheckResult.Healthy());

// Logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

var app = builder.Build();

// ──────────────────────────────────────────
// Middleware pipeline
// ──────────────────────────────────────────

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Portfolio API v1"));
}

app.UseHttpsRedirection();
app.UseCors("Portfolio");
app.UseRateLimiter();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();
app.MapHealthChecks("/health");

// Auto-migrate DB on startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<PortfolioDbContext>();
    await db.Database.MigrateAsync();
}

app.Run();
