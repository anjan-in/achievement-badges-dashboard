
// Achievement Badge Data with Categories
const badges = [
    {
        title: "Code Contributor",
        description: "Contributed to 100+ open source projects.",
        icon: "assets/icons/trophy.svg",
        category: "Open Source"
    },
    {
        title: "Learning Streak",
        description: "Completed 30 days of coding challenges.",
        icon: "assets/icons/medal.svg",
        category: "Learning"
    },
    {
        title: "Top Performer",
        description: "Recognized as the top contributor of the month.",
        icon: "assets/icons/star.svg",
        category: "Recognition"
    },
    {
        title: "Bug Hunter",
        description: "Reported and fixed critical bugs in open-source projects.",
        icon: "assets/icons/bug.svg",
        category: "Open Source"
    },
    {
        title: "Mentor",
        description: "Guided and mentored new developers.",
        icon: "assets/icons/mentor.svg",
        category: "Community"
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

// Function to Filter Badges by Category
function filterBadges() {
    const category = document.getElementById('category-filter').value;
    let filteredBadges = badges;

    if (category !== "All") {
        filteredBadges = badges.filter(badge => badge.category === category);
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

// Function to Display Badges
function displayBadges(badgeArray) {
    const badgeGrid = document.getElementById('badge-grid');
    let badgeCards = '';

    badgeArray.forEach(badge => {
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

// Initialize and Display All Badges on Load
window.onload = () => displayBadges(badges);

