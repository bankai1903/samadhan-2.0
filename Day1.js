
const student = {
    name: "Sumit Mewada",
    age: 20,
    grade: "A",
    major: "Computer Science",
    studentId: "CS2024001",
    email: "sumitmewada@gmail.com",
    isEnrolled: true,
    courses: ["JavaScript Fundamentals", "Data Structures", "Web Development"]
};


console.log("=== Student Details ===");
console.log("Name:", student.name);
console.log("Age:", student.age);
console.log("Grade:", student.grade);
console.log("Major:", student.major);
console.log("Student ID:", student.studentId);
console.log("Email:", student.email);
console.log("Enrolled:", student.isEnrolled);
console.log("Courses:", student.courses);

console.log("\n"); 


console.log("=== Complete Student Object ===");
console.log(student);

console.log("\n");


console.log("=== Formatted Student Profile ===");
console.log(`Student Name: ${student.name}
Age: ${student.age} years old
Major: ${student.major}
Current Grade: ${student.grade}
Student ID: ${student.studentId}
Email: ${student.email}
Enrollment Status: ${student.isEnrolled ? 'Active' : 'Inactive'}
Enrolled Courses: ${student.courses.join(', ')}`);

console.log("\n");


console.log("=== Using Object Methods ===");
console.log("Property names:", Object.keys(student));
console.log("Property values:", Object.values(student));


console.log("\n=== Looping Through Properties ===");
for (let property in student) {
    console.log(`${property}: ${student[property]}`);
}