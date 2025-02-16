
// Achievement Badge Data with Categories
const badges = [
    {
        title: "Code Contributor",
        description: "Contributed to 100+ open source projects.",
        icon: "assets/icons/trophy.svg",
        category: "Open Source",
        progress: 75
    },
    {
        title: "Learning Streak",
        description: "Completed 30 days of coding challenges.",
        icon: "assets/icons/medal.svg",
        category: "Learning",
        progress: 40
    },
    {
        title: "Top Performer",
        description: "Recognized as the top contributor of the month.",
        icon: "assets/icons/star.svg",
        category: "Recognition",
        progress: 70
    },
    {
        title: "Bug Hunter",
        description: "Reported and fixed critical bugs in open-source projects.",
        icon: "assets/icons/bug.svg",
        category: "Open Source",
        progress: 50
    },
    {
        title: "Mentor",
        description: "Guided and mentored new developers.",
        icon: "assets/icons/mentor.svg",
        category: "Community",
        progress: 60
    },
    {
        title: "Hackathon Winner",
        description: "Won a global coding hackathon.",
        icon: "assets/icons/hackathon.svg",
        category: "Achievement",
        progress: 100
    },
    {
        title: "Team Player",
        description: "Collaborated successfully in team projects.",
        icon: "assets/icons/team.svg",
        category: "Collaboration",
        progress: 75
    }
];

// Function to Generate Badge Cards
function generateBadgeCards() {
    const badgeGrid = document.getElementById('badge-grid');
    let badgeCards = '';

    badges.forEach(badge => {
        badgeCards += `
            <div class="col-md-4 mb-4">
                <div class="card achievement-card text-center shadow-sm">
                    <div class="card-body">
                        <img src="${badge.icon}" alt="${badge.title} Icon" class="badge-icon mb-3">
                        <h5 class="card-title">${badge.title}</h5>
                        <p class="card-text">${badge.description}</p>
                    </div>
                </div>
            </div>
        `;
    });

    badgeGrid.innerHTML = badgeCards;
}

// Call the function to display badges on page load
window.onload = generateBadgeCards;

// Function to Search Badges by Title
function searchBadges() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const filteredBadges = badges.filter(badge => 
        badge.title.toLowerCase().includes(searchTerm)
    );
    displayBadges(filteredBadges);
}

// Enhanced Filtering with Category and Search
function filterBadges() {
    const category = document.getElementById('category-filter').value;
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();

    let filteredBadges = badges;

    if (category !== "All") {
        filteredBadges = filteredBadges.filter(badge => badge.category === category);
    }

    if (searchTerm) {
        filteredBadges = filteredBadges.filter(badge => 
            badge.title.toLowerCase().includes(searchTerm)
        );
    }
    
    displayBadges(filteredBadges);
}

// Function to Sort Badges by Title
function sortBadges() {
    const sortOption = document.getElementById('sort-option').value;
    let sortedBadges = [...badges];

    sortedBadges.sort((a, b) => {
        if (sortOption === "asc") {
            return a.title.localeCompare(b.title);
        } else {
            return b.title.localeCompare(a.title);
        }
    });

    displayBadges(sortedBadges);
}

// Play Sound Function
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.currentTime = 0;  // Reset to start
    sound.play();
}

// Play Animation on Achievement Unlock
function playUnlockAnimation(cardElement) {
    cardElement.classList.add('unlock-animation');
    setTimeout(() => {
        cardElement.classList.remove('unlock-animation');
    }, 1500);  // Duration of animation
}

// Update Display Function for Animations
function displayBadges(badgeArray) {
    const badgeGrid = document.getElementById('badge-grid');
    let badgeCards = '';

    badgeArray.forEach((badge, index) => {
        const isUnlocked = badge.progress === 100;
        
        badgeCards += `
            <div class="col-md-4 mb-4">
                <div class="card achievement-card text-center shadow-sm ${isUnlocked ? 'unlocked' : ''}" id="card-${index}">
                    <div class="card-body">
                        <img src="${badge.icon}" alt="${badge.title} Icon" class="badge-icon mb-3">
                        <h5 class="card-title">${badge.title}</h5>
                        <p class="card-text">${badge.description}</p>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" style="width: ${badge.progress}%;" 
                                aria-valuenow="${badge.progress}" aria-valuemin="0" aria-valuemax="100">
                                ${badge.progress}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Play animation if badge is unlocked
        if (isUnlocked) {
            setTimeout(() => {
                playSound('unlock-sound');
                const cardElement = document.getElementById(`card-${index}`);
                playUnlockAnimation(cardElement);
            }, 500);
        }
    });

    badgeGrid.innerHTML = badgeCards;
}

// Track Site Visits
function trackVisits() {
    let visits = localStorage.getItem('siteVisits') || 0;
    visits++;
    localStorage.setItem('siteVisits', visits);

    // Unlock badge for 5 visits
    if (visits === 5) {
        badges[0].progress = 100;
        saveProgress();
        displayBadges(badges);
    }
}

// Track Button Clicks
let clickCount = 0;
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn')) {
        clickCount++;
        
        // Unlock badge for 10 clicks
        if (clickCount === 10) {
            badges[1].progress = 100;
            saveProgress();
            displayBadges(badges);
        }
    }
});

// Dark Mode Toggle
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Save mode in local storage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// // Calculate Overall Progress
// function calculateProgress() {
//     const totalBadges = badges.length;
//     let completedBadges = 0;
//     let totalProgress = 0;

//     badges.forEach(badge => {
//         totalProgress += badge.progress;
//         if (badge.progress === 100) {
//             completedBadges++;
//         }
//     });

//     const overallProgress = Math.round(totalProgress / totalBadges);

//     // Display Progress in Dashboard
//     document.getElementById('total-badges').innerText = totalBadges;
//     document.getElementById('completed-badges').innerText = completedBadges;
//     document.getElementById('overall-progress-bar').style.width = `${overallProgress}%`;
//     document.getElementById('overall-progress-bar').innerText = `${overallProgress}%`;
// }

// Save Progress to Local Storage
function saveProgress() {
    localStorage.setItem('badgeProgress', JSON.stringify(badges));
}

// Load Progress from Local Storage
function loadProgress() {
    const savedProgress = localStorage.getItem('badgeProgress');
    if (savedProgress) {
        const savedBadges = JSON.parse(savedProgress);
        savedBadges.forEach((savedBadge, index) => {
            badges[index].progress = savedBadge.progress;
        });
    }
}

// Update calculateProgress to save progress after calculating
function calculateProgress() {
    const totalBadges = badges.length;
    let completedBadges = 0;
    let totalProgress = 0;

    badges.forEach(badge => {
        totalProgress += badge.progress;
        if (badge.progress === 100) {
            completedBadges++;
        }
    });

    const overallProgress = Math.round(totalProgress / totalBadges);

    document.getElementById('total-badges').innerText = totalBadges;
    document.getElementById('completed-badges').innerText = completedBadges;
    document.getElementById('overall-progress-bar').style.width = `${overallProgress}%`;
    document.getElementById('overall-progress-bar').innerText = `${overallProgress}%`;

    // Save progress after calculation
    saveProgress();
}

// Show Tutorial Once
function showTutorial() {
    const tutorialOverlay = document.getElementById('tutorial-overlay');
    const tutorialNextBtn = document.getElementById('tutorial-next-btn');

    // Check if tutorial has been shown before
    const tutorialShown = localStorage.getItem('tutorialShown');
    if (!tutorialShown) {
        tutorialOverlay.classList.add('active');
    }

    tutorialNextBtn.addEventListener('click', () => {
        tutorialOverlay.classList.remove('active');
        localStorage.setItem('tutorialShown', true);
    });
}

// Load saved theme on page load
// window.onload = () => {
//     loadProgress();
//     displayBadges(badges);
//     filterBadges();
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme === 'dark') {
//         document.body.classList.add('dark-mode');
//         document.getElementById('dark-mode-toggle').checked = true;
//     }
//     calculateProgress();
//     showTutorial();
// }
window.onload = () => {
    loadProgress();
    trackVisits();
    displayBadges(badges);
    filterBadges();
    calculateProgress();
    showTutorial();
}
// Commented out

