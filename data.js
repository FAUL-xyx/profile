
// Default Data Setup
const defaultData = {
    profile: {
        name: "Alexander Great",
        role: "Creative Director",
        bio: "Building digital experiences with elegance. Welcome to my personal hub.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=200&h=200",
        email: "hello@example.com"
    },
    links: [
        { id: '1', title: 'Instagram', url: 'https://instagram.com', icon: 'fab fa-instagram', desc: '@alexgreat', active: true },
        { id: '2', title: 'GitHub', url: 'https://github.com', icon: 'fab fa-github', desc: 'Code Portfolio', active: true },
        { id: '3', title: 'LinkedIn', url: 'https://linkedin.com', icon: 'fab fa-linkedin', desc: 'Professional Network', active: true },
        { id: '4', title: 'Mobile Legends', url: '#', icon: 'fas fa-gamepad', desc: 'ID: 12345678 (1234)', active: true },
        { id: '5', title: 'Personal Website', url: 'https://example.com', icon: 'fas fa-globe', desc: 'Read my blog', active: true }
    ]
};

// Initialize localStorage if empty
if (!localStorage.getItem('premiumCardData')) {
    localStorage.setItem('premiumCardData', JSON.stringify(defaultData));
}

function getData() {
    return JSON.parse(localStorage.getItem('premiumCardData'));
}

function saveData(data) {
    localStorage.setItem('premiumCardData', JSON.stringify(data));
    // Dispatch custom event to notify changes
    window.dispatchEvent(new Event('dataUpdated'));
}
