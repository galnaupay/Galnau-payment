// Payment data - easily modifiable
const PAYMENT_DATA = {
    dana: "0881012391309",
	gopay: "0881012391309",
    ovo: "0881012391309",
    SEABANK: "901389909355",
    SEABANK1: "901389909355",
    wa: "https://wa.me/6288801384376",
    email: "galnau@gmail.com",
    trakteer: "https://trakteer.id/example",
    saweria: "https://saweria.co/example",
    buymeacoffee: "https://www.buymeacoffee.com/example",
    qris: "https://telegra.ph/file/fd7653b053f71617fcb84.jpg"
};

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.getElementById('progress-bar');
const startBtn = document.getElementById('start-btn');
const content = document.getElementById('content');

// Initialize loading animation
window.onload = () => {
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            startBtn.classList.remove('hidden');
            startBtn.classList.add('pulse');
        } else {
            width += 2;
            progressBar.style.width = `${width}%`;
        }
    }, 50);
};

// Start button click handler
startBtn.addEventListener('click', () => {
    loadingScreen.classList.add('hidden');
    content.classList.remove('hidden');
    
    // Add animation to content
    content.style.opacity = 0;
    let opacity = 0;
    const fadeIn = setInterval(() => {
        if (opacity >= 1) {
            clearInterval(fadeIn);
        } else {
            opacity += 0.05;
            content.style.opacity = opacity;
        }
    }, 20);
});

// Toggle payment sections
function toggleSection(section) {
    const sections = ['ewallet', 'bank', 'donate'];
    const button = event.currentTarget;
    
    // Toggle active class on button
    button.classList.toggle('active');
    
    // Toggle content visibility
    const content = document.getElementById(`${section}-content`);
    content.classList.toggle('hidden');
    
    // Close other sections
    sections.filter(s => s !== section).forEach(s => {
        document.getElementById(`${s}-content`).classList.add('hidden');
        document.querySelector(`button[onclick="toggleSection('${s}')"]`).classList.remove('active');
    });
}

// Copy to clipboard function
function copyToClipboard(type) {
    const text = PAYMENT_DATA[type];
    navigator.clipboard.writeText(text).then(() => {
        const originalText = event.currentTarget.querySelector('span').textContent;
        event.currentTarget.querySelector('span').textContent = 'Copied!';
        event.currentTarget.style.backgroundColor = '#00ffaa';
        event.currentTarget.style.color = '#000';
        
        setTimeout(() => {
            event.currentTarget.querySelector('span').textContent = originalText;
            event.currentTarget.style.backgroundColor = '';
            event.currentTarget.style.color = '';
        }, 2000);
    });
}

// Open external links
function openQRIS() {
    window.open(PAYMENT_DATA.qris, '_blank');
}

function openWA() {
    window.open(PAYMENT_DATA.wa, '_blank');
}

function openEmail() {
    window.location.href = `mailto:${PAYMENT_DATA.email}`;
}

// Update donate links with actual URLs
document.addEventListener('DOMContentLoaded', () => {
    const donateLinks = document.querySelectorAll('#donate-content a');
    donateLinks[0].href = PAYMENT_DATA.trakteer;
    donateLinks[1].href = PAYMENT_DATA.saweria;
    donateLinks[2].href = PAYMENT_DATA.buymeacoffee;
});