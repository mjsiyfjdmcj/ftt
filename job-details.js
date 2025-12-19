// Job Details JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get job data from URL parameters or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('id');
    
    // Sample job data (in real implementation, this would come from a database)
    const jobData = {
        '1': {
            title: 'Fellow - Just Energy Transition',
            type: 'FULL TIME',
            location: 'Dhaka',
            salary: '--',
            deadline: '27 Dec 2025',
            description: `
                <p>We are seeking a dedicated Fellow to join our Just Energy Transition program. This role focuses on promoting sustainable energy solutions and climate justice initiatives across Bangladesh.</p>
                <p>The successful candidate will work closely with communities, government agencies, and partner organizations to advance clean energy access and environmental sustainability.</p>
            `,
            responsibilities: [
                'Develop and implement just energy transition strategies',
                'Engage with local communities on renewable energy initiatives',
                'Collaborate with government and private sector partners',
                'Monitor and evaluate program effectiveness',
                'Prepare reports and documentation'
            ],
            requirements: [
                'Bachelor\'s degree in Environmental Science, Engineering, or related field',
                '3+ years experience in energy or climate programs',
                'Strong communication and project management skills',
                'Experience working with communities and stakeholders',
                'Fluency in English and Bengali'
            ],
            applicationProcess: `
                <p>Send your CV and cover letter to <strong>careers@actionaid.org</strong></p>
                <p>Please mention the position title in the subject line.</p>
            `
        },
        '2': {
            title: 'Manager – Resilience and Climate Justice',
            type: 'FULL TIME',
            location: 'Dhaka',
            salary: '--',
            deadline: '26 Dec 2025',
            description: `
                <p>Join our team as a Manager for Resilience and Climate Justice programs. Lead initiatives that build community resilience against climate change impacts.</p>
                <p>This role involves strategic planning, team management, and direct engagement with vulnerable communities.</p>
            `,
            responsibilities: [
                'Lead resilience and climate justice programs',
                'Manage program teams and budgets',
                'Develop partnerships with local organizations',
                'Design and implement community-based adaptation strategies',
                'Ensure program quality and impact measurement'
            ],
            requirements: [
                'Master\'s degree in relevant field',
                '5+ years management experience in development sector',
                'Proven track record in climate adaptation programs',
                'Strong leadership and analytical skills',
                'Experience in budget management and donor relations'
            ],
            applicationProcess: `
                <p>Submit your application through our online portal at <strong>careers.actionaid.org</strong></p>
                <p>Include CV, cover letter, and two professional references.</p>
            `
        },
        '3': {
            title: 'Coordinator - Livelihood and Skill Development',
            type: 'FULL TIME',
            location: 'Dhaka',
            salary: '--',
            deadline: '23 Dec 2025',
            description: `
                <p>Coordinate livelihood and skill development programs that empower communities through sustainable economic opportunities.</p>
                <p>Work directly with beneficiaries to design and implement training programs that enhance employability and income generation.</p>
            `,
            responsibilities: [
                'Coordinate livelihood and skill development activities',
                'Conduct training needs assessments',
                'Develop training curricula and materials',
                'Monitor program progress and outcomes',
                'Build relationships with training providers and employers'
            ],
            requirements: [
                'Bachelor\'s degree in Social Sciences or related field',
                '2+ years experience in livelihood programs',
                'Training and facilitation skills',
                'Understanding of local labor markets',
                'Computer literacy and reporting skills'
            ],
            applicationProcess: `
                <p>Email your application to <strong>hr@actionaid.org</strong></p>
                <p>Subject: Application for Coordinator - Livelihood and Skill Development</p>
            `
        }
    };
    
    // Load job data if ID is provided
    if (jobId && jobData[jobId]) {
        const job = jobData[jobId];
        
        document.getElementById('jobTitle').textContent = job.title;
        document.getElementById('jobType').textContent = job.type;
        document.getElementById('jobLocation').textContent = `📍 ${job.location}`;
        document.getElementById('jobSalary').textContent = `💰 ${job.salary}`;
        document.getElementById('jobDeadline').textContent = `📅 Deadline: ${job.deadline}`;
        
        document.getElementById('jobDescription').innerHTML = job.description;
        
        const responsibilitiesList = document.getElementById('jobResponsibilities');
        responsibilitiesList.innerHTML = job.responsibilities.map(item => `<li>${item}</li>`).join('');
        
        const requirementsList = document.getElementById('jobRequirements');
        requirementsList.innerHTML = job.requirements.map(item => `<li>${item}</li>`).join('');
        
        document.getElementById('applicationProcess').innerHTML = job.applicationProcess;
        
        // Update page title
        document.title = `${job.title} - ActionAid`;
    }
    
    // Share button functionality
    document.querySelector('.share-btn').addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: document.getElementById('jobTitle').textContent,
                text: 'Check out this job opportunity at ActionAid',
                url: window.location.href
            });
        } else {
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(function() {
                alert('Job link copied to clipboard!');
            });
        }
    });

    // Form submission
    document.getElementById('applicationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            jobTitle: document.getElementById('jobTitle').textContent,
            timestamp: new Date().toISOString()
        };
        
        // Submit to Google Sheets
        fetch('https://script.google.com/macros/s/AKfycbzDyFDV9_TrlhUsHCvulRrsGoYbMTk0pAOgWkEiJs3Hks_KNKpLgpOPsbnx46V6f_01/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(() => {
            alert('Application submitted successfully!');
            document.getElementById('applicationForm').reset();
            closeApplicationForm();
        })
        .catch(() => {
            alert('Error submitting application. Please try again.');
        });
    });
});

// Application Form Functions
function showApplicationForm() {
    document.getElementById('applicationModal').style.display = 'block';
}

function closeApplicationForm() {
    document.getElementById('applicationModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('applicationModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}