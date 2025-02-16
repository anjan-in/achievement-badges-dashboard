// Achievement Badge Data
const badges = [
    {
        title: "Code Contributor",
        description: "Contributed to 100+ open source projects.",
        icon: "assets/icons/trophy.svg"
    },
    {
        title: "Learning Streak",
        description: "Completed 30 days of coding challenges.",
        icon: "assets/icons/medal.svg"
    },
    {
        title: "Top Performer",
        description: "Recognized as the top contributor of the month.",
        icon: "assets/icons/star.svg"
    },
    {
        title: "Bug Hunter",
        description: "Reported and fixed critical bugs in open-source projects.",
        icon: "assets/icons/bug.svg"
    },
    {
        title: "Mentor",
        description: "Guided and mentored new developers.",
        icon: "assets/icons/mentor.svg"
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
