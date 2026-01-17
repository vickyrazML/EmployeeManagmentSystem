using EmployeeManagmentSystem.Entities;
namespace EmployeeManagmentSystem.Data
{
    public class DataSeedHelper
    {
        public readonly AppDbContext _context;

        public DataSeedHelper(AppDbContext context)
        {
            _context = context;
        }

        public void SeedData()
        {
            if (!_context.Employees.Any())
            {
                _context.Employees.AddRange(
                   
                );
                _context.SaveChanges();
            }
        }
    }
}
