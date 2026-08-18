
document.addEventListener('DOMContentLoaded', () => {
    initAdmin();
    setupTabs();
    setupLivePreviewUpdate();
});

function initAdmin() {
    const data = getData();
    const p = data.profile;

    // Populate profile form
    document.getElementById('input-name').value = p.name;
    document.getElementById('input-role').value = p.role;
    document.getElementById('input-bio').value = p.bio;
    document.getElementById('input-avatar').value = p.avatar;
    document.getElementById('input-email').value = p.email || '';

    // Render Links List
    renderAdminLinks();
}

function renderAdminLinks() {
    const data = getData();
    const list = document.getElementById('links-list');
    list.innerHTML = '';

    data.links.forEach((link, idx) => {
        const item = document.createElement('div');
        item.className = "link-item-admin bg-[#1A1A1A] border border-[#333] rounded-xl p-4 flex items-center justify-between group";
        item.dataset.id = link.id;
        
        item.innerHTML = `
            <div class="flex items-center gap-4">
                <i class="fas fa-grip-vertical text-gray-500 cursor-grab hover:text-[#d4af37]"></i>
                <div class="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center">
                    <i class="${link.icon} text-gray-300"></i>
                </div>
                <div>
                    <h4 class="text-white font-semibold">${link.title}</h4>
                    <p class="text-xs text-gray-500">${link.url}</p>
                </div>
            </div>
            <div class="flex gap-2">
                <button onclick="editLink('${link.id}')" class="p-2 text-gray-400 hover:text-[#d4af37] transition-colors"><i class="fas fa-pen"></i></button>
                <button onclick="deleteLink('${link.id}')" class="p-2 text-gray-400 hover:text-red-500 transition-colors"><i class="fas fa-trash"></i></button>
                <label class="relative inline-flex items-center cursor-pointer ml-2">
                  <input type="checkbox" class="sr-only peer" ${link.active ? 'checked' : ''} onchange="toggleLink('${link.id}')">
                  <div class="w-9 h-5 bg-[#333] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#d4af37]"></div>
                </label>
            </div>
        `;
        list.appendChild(item);
    });

    // Initialize Sortable
    new Sortable(list, {
        animation: 150,
        handle: '.fa-grip-vertical',
        ghostClass: 'sortable-ghost',
        onEnd: function () {
            // Reorder array
            const newOrderIds = Array.from(list.children).map(child => child.dataset.id);
            const currentData = getData();
            const reorderedLinks = newOrderIds.map(id => currentData.links.find(l => l.id === id));
            currentData.links = reorderedLinks;
            saveAndUpdate(currentData);
        }
    });
}

function setupLivePreviewUpdate() {
    const inputs = ['input-name', 'input-role', 'input-bio', 'input-avatar', 'input-email'];
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            const data = getData();
            data.profile = {
                name: document.getElementById('input-name').value,
                role: document.getElementById('input-role').value,
                bio: document.getElementById('input-bio').value,
                avatar: document.getElementById('input-avatar').value,
                email: document.getElementById('input-email').value,
            };
            saveAndUpdate(data);
        });
    });
}

function saveAndUpdate(data) {
    saveData(data);
    // Reload iframe to show changes
    const iframe = document.getElementById('preview-frame');
    if(iframe) {
        // Post message or reload. Reload is simpler.
        iframe.contentWindow.location.reload();
    }
}

// Modal logic for Links
const modal = document.getElementById('link-modal');

function openAddModal() {
    document.getElementById('modal-title').textContent = 'Add New Link';
    document.getElementById('link-id').value = '';
    document.getElementById('link-title').value = '';
    document.getElementById('link-url').value = '';
    document.getElementById('link-icon').value = 'fas fa-link';
    document.getElementById('link-desc').value = '';
    modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
}

function editLink(id) {
    const link = getData().links.find(l => l.id === id);
    if(!link) return;
    
    document.getElementById('modal-title').textContent = 'Edit Link';
    document.getElementById('link-id').value = link.id;
    document.getElementById('link-title').value = link.title;
    document.getElementById('link-url').value = link.url;
    document.getElementById('link-icon').value = link.icon;
    document.getElementById('link-desc').value = link.desc || '';
    
    modal.classList.remove('hidden');
}

function saveLink() {
    const data = getData();
    const id = document.getElementById('link-id').value;
    const newLink = {
        id: id || Date.now().toString(),
        title: document.getElementById('link-title').value || 'Untitled',
        url: document.getElementById('link-url').value || '#',
        icon: document.getElementById('link-icon').value || 'fas fa-link',
        desc: document.getElementById('link-desc').value,
        active: true
    };

    if(id) {
        const index = data.links.findIndex(l => l.id === id);
        newLink.active = data.links[index].active; // preserve status
        data.links[index] = newLink;
    } else {
        data.links.push(newLink);
    }

    saveAndUpdate(data);
    closeModal();
    renderAdminLinks();
}

function deleteLink(id) {
    if(confirm('Are you sure want to delete this link?')) {
        const data = getData();
        data.links = data.links.filter(l => l.id !== id);
        saveAndUpdate(data);
        renderAdminLinks();
    }
}

function toggleLink(id) {
    const data = getData();
    const link = data.links.find(l => l.id === id);
    if(link) {
        link.active = !link.active;
        saveAndUpdate(data);
    }
}

// Tabs
function setupTabs() {
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            
            tabContents.forEach(tc => tc.classList.add('hidden'));
            document.getElementById('tab-' + item.dataset.tab).classList.remove('hidden');
        });
    });
}
