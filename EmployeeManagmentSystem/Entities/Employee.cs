using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeManagmentSystem.Entities
{
    public class Employee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Emp_Id { get; set; }

        public required string Emp_Name { get; set; }
        public required string Dob { get; set; }
        public required string PhoneNumber { get; set; }
        public required string Email_Id { get; set; }
        public required string Gender { get; set; }
        public string JobTitle { get; set; }
        public DateTime? Joining_Date { get; set; }
        public DateTime? Leaving_Date { get; set; }
        public decimal Salary { get; set; }
        public string Address { get; set; }
        public DateTime? Created_Date { get; set; }

        [ForeignKey(nameof(Department))]
        public int? DepartmentId { get; set; }
    }
}
