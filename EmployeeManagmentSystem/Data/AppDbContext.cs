using Microsoft.EntityFrameworkCore;
using EmployeeManagmentSystem.Entities;

namespace EmployeeManagmentSystem.Data

{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
        
    }
}
