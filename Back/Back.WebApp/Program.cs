using Microsoft.EntityFrameworkCore;
using Back.DAL.DataContext;
using Back.DAL.Repositories;
using Back.Models;
using Back.BLL.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<WorkplaceContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("cadena"));
});
builder.Services.AddScoped<IGenericRepository<Back.Models.Task>, TaskRepository>();
builder.Services.AddScoped<IGenericRepository<User>, UserRepositry>();

builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<IUserService, UsersService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseCors(builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
});

app.UseAuthorization();


app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");
});


app.Run();
