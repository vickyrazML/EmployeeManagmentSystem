using EmployeeManagmentSystem.Data;
using EmployeeManagmentSystem.Entities;
using EmployeeManagmentSystem.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagmentSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IRepository<Employee> _EmployeeRepository;

        public EmployeeController(IRepository<Employee> EmployeeRepository)
        {
            _EmployeeRepository = EmployeeRepository;
        }

        [HttpGet]
        [Route("GetAllEmployees")]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _EmployeeRepository.GetAllAsync(e => e.Emp_Id);
            return Ok(employees);

        }

        [HttpGet()]
        [Route("GetEmployeeById/{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            var employee = await _EmployeeRepository.FindByIdAsync(id);
            if (employee == null)
            {
                return Ok(new { message = "No Data available." });
            }
            return Ok(employee);
        }
        [HttpGet]
        [Route("GetEmployeesByDepartmentId/{departmentId}")]
        public async Task<IActionResult> GetEmployeesByDepartmentId(int departmentId)
        {
            var employees = await _EmployeeRepository.FindAsync(e => e.DepartmentId == departmentId);
            return Ok(employees);
        }
        [HttpPost]
        [Route("AddEmployee")]
        public async Task<IActionResult> AddEmployee([FromBody] Employee objemp)
        {
            await _EmployeeRepository.AddAsync(objemp);
            return CreatedAtAction(nameof(GetEmployeeById), new { id = objemp.Emp_Id }, objemp);
        }
        [HttpPut]
        [Route("UpdateEmployee/{id:int}")]
        public async Task<IActionResult> UpdateEmployee(int id, [FromBody] Employee objemp)
        {
            var employee = await _EmployeeRepository.FindByIdAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            employee.Emp_Name = objemp.Emp_Name;
            employee.Dob = objemp.Dob;
            employee.PhoneNumber = objemp.PhoneNumber;
            employee.Email_Id = objemp.Email_Id;
            employee.Address = objemp.Address;
            employee.DepartmentId = objemp.DepartmentId;

            await _EmployeeRepository.UpdateAsync(employee);
            return Ok(new { status = "Record updated successfully." });

        }
        [HttpDelete]
        [Route("DeleteEmployee/{id:int}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            await _EmployeeRepository.DeleteAsync(id);
            return Ok(new { message = "Record Deleted successfully." });
        }

    }
}
    