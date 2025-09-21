function switchPage(page) {
    document.getElementById('signup-page').classList.toggle('hidden', page !== 'signup');
    document.getElementById('dashboard-page').classList.toggle('hidden', page !== 'dashboard');
    if (page === 'signup') localStorage.clear(); // Simulate logout
}

// Sign-up form handler (stores username, switches to dashboard)
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    localStorage.setItem('username', username);
    localStorage.setItem('sessions', 0); // Init stats
    localStorage.setItem('totalScore', 0);
    alert('Signed up successfully! Welcome to Mockify.');
    switchPage('dashboard');
    loadDashboard();
});

// Load dashboard data (welcome, recent sessions, stats)
function loadDashboard() {
    const username = localStorage.getItem('username') || 'User';
    document.getElementById('welcome-msg').innerText = `Welcome back, ${username}! Let's ace those interviews. 🎤`;
    
    // Mock recent sessions (replace with API fetch)
    const mockSessions = [
        'Tech Session: Score 85% - Tip: Improve code explanations.',
        'Behavioral: Score 92% - Great storytelling!'
    ];
    const sessionsList = document.getElementById('recent-sessions');
    sessionsList.innerHTML = '';
    mockSessions.forEach(session => {
        const li = document.createElement('li');
        li.innerText = session;
        sessionsList.appendChild(li);
    });
    
    // Load stats (mock; update via API later)
    const sessions = parseInt(localStorage.getItem('sessions')) || 0;
    const totalScore = parseInt(localStorage.getItem('totalScore')) || 0;
    const avgScore = sessions > 0 ? Math.round(totalScore / sessions) : 0;
    document.getElementById('sessions-count').innerText = sessions;
    document.getElementById('avg-score').innerText = `${avgScore}%`;
    document.getElementById('progress-bar').value = avgScore;
}

// Placeholder for future API connection (fetches based on category, updates stats)
function fetchInterviewQuestions() {
    const category = document.getElementById('category').value;
    // Mock API response (replace with real fetch: fetch(`your-api-endpoint?category=${category}`).then(...))
    const mockData = {
        tech: [{ q: "Explain closures in JS.", tip: "Relate to real-world use." }, { q: "What is Big O?", tip: "Give examples." }],
        behavioral: [{ q: "Tell me about a challenge.", tip: "Use STAR method." }, { q: "Teamwork example?", tip: "Highlight collaboration." }],
        creative: [{ q: "Design a app for aliens.", tip: "Be imaginative!" }, { q: "If you were a superhero?", tip: "Tie to skills." }]
    }[category] || [];
    
    const questionsDiv = document.getElementById('questions');
    questionsDiv.innerHTML = '<h4>Mock Questions:</h4>';
    mockData.forEach(q => {
        const div = document.createElement('div');
        div.className = 'question';
        div.innerHTML = `<strong>Question:</strong> ${q.q}<br><em>AI Tip:</em> ${q.tip}`;
        questionsDiv.appendChild(div);
    });
    
    // Simulate session completion (update stats; replace with real API)
    let sessions = parseInt(localStorage.getItem('sessions')) || 0;
    let totalScore = parseInt(localStorage.getItem('totalScore')) || 0;
    const mockScore = Math.floor(Math.random() * 41) + 60; // 60-100%
    sessions++;
    totalScore += mockScore;
    localStorage.setItem('sessions', sessions);
    localStorage.setItem('totalScore', totalScore);
    loadDashboard(); // Refresh stats
}

// Reset stats function
function resetStats() {
    localStorage.setItem('sessions', 0);
    localStorage.setItem('totalScore', 0);
    loadDashboard();
    alert('Stats reset!');
}

// Auto-load dashboard if already signed up
if (localStorage.getItem('username')) {
    switchPage('dashboard');
    loadDashboard();
}