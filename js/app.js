
document.addEventListener('DOMContentLoaded', () => {
    loadProfile();
    
    // Listen for data updates (useful for Live Preview iframe)
    window.addEventListener('storage', () => {
        loadProfile();
    });
    window.addEventListener('dataUpdated', () => {
        loadProfile();
    });
});

function loadProfile() {
    const data = getData();
    const p = data.profile;

    // Update Profile Info
    document.getElementById('profile-name').textContent = p.name;
    document.getElementById('profile-role').textContent = p.role;
    document.getElementById('profile-bio').textContent = p.bio;
    if(p.avatar) document.getElementById('profile-avatar').src = p.avatar;
    
    // Connect Button action
    const btnConnect = document.getElementById('btn-connect');
    btnConnect.onclick = () => {
        window.location.href = `mailto:${p.email || ''}`;
    };

    // Render Links
    const container = document.getElementById('links-container');
    container.innerHTML = ''; // Clear current

    let delay = 0.1;
    data.links.filter(l => l.active).forEach((link, index) => {
        const card = document.createElement('a');
        card.href = link.url;
        card.target = "_blank";
        card.className = "social-card block w-full p-4 rounded-xl flex items-center justify-between stagger-item transform-style-3d group";
        card.style.animationDelay = `${delay}s`;
        
        card.setAttribute('data-tilt', '');
        card.setAttribute('data-tilt-max', '5');
        card.setAttribute('data-tilt-speed', '400');
        card.setAttribute('data-tilt-glare', 'true');
        card.setAttribute('data-tilt-max-glare', '0.2');

        card.innerHTML = `
            <div class="flex items-center gap-4 translate-z-20">
                <div class="social-card-icon w-12 h-12 rounded-full flex items-center justify-center border border-transparent transition-colors">
                    <i class="${link.icon} text-xl text-gray-300 group-hover:text-[#d4af37] transition-colors"></i>
                </div>
                <div>
                    <h3 class="text-white font-semibold text-lg">${link.title}</h3>
                    ${link.desc ? `<p class="text-gray-400 text-sm mt-0.5">${link.desc}</p>` : ''}
                </div>
            </div>
            <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-[#d4af37] group-hover:bg-[#d4af37]/10 transition-all translate-z-10">
                <i class="fas fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform duration-300"></i>
            </div>
        `;
        container.appendChild(card);
        delay += 0.08;
    });

    // Re-initialize VanillaTilt for dynamically added elements
    VanillaTilt.init(document.querySelectorAll(".social-card"));
}

// Share Modal Logic
const modal = document.getElementById('share-modal');
const modalContent = document.getElementById('share-modal-content');
let qrCodeCreated = false;

function openShareModal() {
    modal.classList.remove('hidden');
    // slight delay for animation
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modalContent.classList.remove('scale-95');
    }, 10);

    if(!qrCodeCreated) {
        new QRCode(document.getElementById("qrcode"), {
            text: window.location.href,
            width: 150,
            height: 150,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
        qrCodeCreated = true;
    }
}

function closeShareModal() {
    modal.classList.add('opacity-0');
    modalContent.classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert("Link copied to clipboard!");
    });
}

function shareNative() {
    if (navigator.share) {
        const p = getData().profile;
        navigator.share({
            title: p.name + ' - Digital Card',
            text: 'Check out my premium digital profile!',
            url: window.location.href,
        });
    } else {
        alert("Native sharing not supported on this browser.");
    }
}
