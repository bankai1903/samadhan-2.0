class StudentMarksCalculator {
    constructor() {
        this.students = [];
        this.currentFilter = 'all';
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.getElementById('student-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addStudent();
        });

        document.getElementById('show-all').addEventListener('click', () => this.filterStudents('all'));
        document.getElementById('show-passed').addEventListener('click', () => this.filterStudents('passed'));
        document.getElementById('show-failed').addEventListener('click', () => this.filterStudents('failed'));
        document.getElementById('show-excellence').addEventListener('click', () => this.filterStudents('excellence'));
    }

    addStudent() {
        const name = document.getElementById('student-name').value.trim();
        const subjects = {
            math: parseInt(document.getElementById('math').value),
            science: parseInt(document.getElementById('science').value),
            english: parseInt(document.getElementById('english').value),
            history: parseInt(document.getElementById('history').value)
        };

        if (!name) {
            alert('Please enter a student name');
            return;
        }

        const student = {
            id: Date.now(),
            name: name,
            subjects: subjects,
            results: this.calculateResults(subjects)
        };

        this.students.push(student);
        this.clearForm();
        this.updateDisplay();
        this.showNotification(`${name} has been added successfully!`);
    }

    calculateResults(subjects) {
        const subjectArray = Object.entries(subjects);
        const totalMarks = subjectArray
            .map(([subject, marks]) => marks)
            .reduce((total, marks) => total + marks, 0);
        
        const maxMarks = subjectArray.length * 100;
        const percentage = (totalMarks / maxMarks) * 100;
        
        return {
            totalMarks,
            maxMarks,
            percentage: Math.round(percentage * 100) / 100,
            grade: this.calculateGrade(percentage),
            status: percentage >= 60 ? 'Passed' : 'Failed'
        };
    }

    calculateGrade(percentage) {
        if (percentage >= 90) return 'A';
        if (percentage >= 80) return 'B';
        if (percentage >= 70) return 'C';
        if (percentage >= 60) return 'D';
        return 'F';
    }

    filterStudents(filterType) {
        this.currentFilter = filterType;
        
        document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`show-${filterType === 'all' ? 'all' : filterType}`).classList.add('active');
        
        let filteredStudents;
        
        switch (filterType) {
            case 'passed':
                filteredStudents = this.students.filter(student => student.results.percentage >= 60);
                break;
            case 'failed':
                filteredStudents = this.students.filter(student => student.results.percentage < 60);
                break;
            case 'excellence':
                filteredStudents = this.students.filter(student => student.results.percentage >= 90);
                break;
            default:
                filteredStudents = this.students;
        }
        
        this.displayStudents(filteredStudents);
    }

    updateDisplay() {
        this.updateStatistics();
        this.filterStudents(this.currentFilter);
    }

    updateStatistics() {
        const totalStudents = this.students.length;
        document.getElementById('total-students').textContent = totalStudents;

        if (totalStudents === 0) {
            document.getElementById('class-average').textContent = '0';
            document.getElementById('top-performer').textContent = 'N/A';
            return;
        }

        const classAverage = this.students
            .map(student => student.results.percentage)
            .reduce((sum, percentage) => sum + percentage, 0) / totalStudents;
        
        document.getElementById('class-average').textContent = `${Math.round(classAverage * 100) / 100}%`;

        const topPerformer = this.students.reduce((top, student) => 
            student.results.percentage > top.results.percentage ? student : top
        );
        
        document.getElementById('top-performer').textContent = 
            `${topPerformer.name} (${topPerformer.results.percentage}%)`;
    }

    displayStudents(studentsToShow) {
        const container = document.getElementById('students-list');
        
        if (studentsToShow.length === 0) {
            container.innerHTML = '<div class="no-students">No students found matching the selected criteria.</div>';
            return;
        }

        const studentsHTML = studentsToShow
            .map(student => this.createStudentCard(student))
            .join('');
        
        container.innerHTML = studentsHTML;
    }

    createStudentCard(student) {
        const subjectsHTML = Object.entries(student.subjects)
            .map(([subject, marks]) => `
                <div class="subject-score">
                    <div class="subject-name">${subject.charAt(0).toUpperCase() + subject.slice(1)}</div>
                    <div class="score">${marks}</div>
                </div>
            `).join('');

        return `
            <div class="student-card">
                <div class="student-header">
                    <div class="student-name">${student.name}</div>
                    <div class="grade-badge grade-${student.results.grade.toLowerCase()}">
                        Grade ${student.results.grade}
                    </div>
                </div>
                
                <div class="subjects-grid">
                    ${subjectsHTML}
                </div>
                
                <div class="student-summary">
                    <div class="total-marks">
                        Total: ${student.results.totalMarks}/${student.results.maxMarks}
                    </div>
                    <div class="percentage">
                        ${student.results.percentage}% - ${student.results.status}
                    </div>
                </div>
            </div>
        `;
    }

    clearForm() {
        document.getElementById('student-form').reset();
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .no-students {
        text-align: center;
        padding: 40px;
        color: #6c757d;
        font-size: 1.2rem;
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    new StudentMarksCalculator();
});
