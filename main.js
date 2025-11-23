/**
 * 1. CONFIGURATION & CONSTANTS
 * Lưu trữ dữ liệu tĩnh và cấu hình mặc định
 */
const CONFIG = {
    STORAGE_KEY: 'cmsData',
    ICONS: [
        "bi-activity", "bi-alarm", "bi-apple", "bi-android2", "bi-archive",
        "bi-arrow-right", "bi-arrow-repeat", "bi-award", "bi-bag", "bi-bank",
        "bi-bar-chart", "bi-basket", "bi-bell", "bi-book", "bi-bookmark",
        "bi-box", "bi-briefcase", "bi-brightness-high", "bi-broadcast", "bi-brush",
        "bi-calculator", "bi-calendar-check", "bi-camera", "bi-cart", "bi-cash-coin",
        "bi-chat-dots", "bi-check-circle", "bi-clock", "bi-cloud", "bi-code-slash",
        "bi-gear", "bi-globe", "bi-heart", "bi-house", "bi-image",
        "bi-info-circle", "bi-laptop", "bi-layers", "bi-lightbulb", "bi-link",
        "bi-list-task", "bi-map", "bi-megaphone", "bi-menu-button-wide", "bi-mic",
        "bi-moon", "bi-music-note-beamed", "bi-newspaper", "bi-palette", "bi-people",
        "bi-phone", "bi-play-circle", "bi-plug", "bi-printer", "bi-puzzle",
        "bi-search", "bi-share", "bi-shield-check", "bi-shop", "bi-star",
        "bi-sun", "bi-tag", "bi-tools", "bi-trash", "bi-trophy",
        "bi-truck", "bi-tv", "bi-unlock", "bi-upload", "bi-wallet2",
        "bi-wifi", "bi-window", "bi-wrench", "bi-youtube", "bi-zoom-in"
    ],
    DEFAULT_DATA: {
        services: [
            { id: 1, icon: 'bi-activity', title: 'Nesciunt Mete', desc: 'Provident nihil minus qui consequatur non omnis maiores.' },
            { id: 2, icon: 'bi-broadcast', title: 'Eosle Commodi', desc: 'Ut autem aut autem non a. Sint sint sit facilis nam iusto sint.' },
            { id: 3, icon: 'bi-easel', title: 'Ledo Markt', desc: 'Ut excepturi voluptatem nisi sed. Quidem fuga consequatur.' },
            { id: 4, icon: 'bi-bounding-box-circles', title: 'Asperiores Commodit', desc: 'Non et temporibus minus omnis sed dolor esse consequatur.' },
            { id: 5, icon: 'bi-calendar4-week', title: 'Velit Doloremque', desc: 'Cumque et suscipit saepe. Est maiores autem enim facilis ut aut ipsam.' },
            { id: 6, icon: 'bi-chat-square-text', title: 'Dolori Architecto', desc: 'Hic molestias ea quibusdam eos. Fugiat enim doloremque aut neque non.' }
        ],
        testimonials: [
            { id: 1, name: 'Matt Brandon', role: 'Freelancer', img: 'Img/c1.jpg', quote: 'Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat.' },
            { id: 2, name: 'John Larson', role: 'Entrepreneur', img: 'Img/c2.jpg', quote: 'Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster.' },
            { id: 3, name: 'Saul Goodman', role: 'Ceo & Founder', img: 'Img/c3.jpg', quote: 'Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus.' }
        ]
    }
};

/**
 * 2. STORAGE SERVICE
 * Chịu trách nhiệm tương tác với LocalStorage
 */
const StorageService = {
    getAll() {
        try {
            const data = localStorage.getItem(CONFIG.STORAGE_KEY);
            return data ? JSON.parse(data) : this.reset();
        } catch (e) {
            console.error("Lỗi đọc dữ liệu", e);
            return this.reset();
        }
    },

    saveAll(data) {
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(data));
        // Phát event để UI tự cập nhật
        document.dispatchEvent(new Event('cmsDataUpdated'));
    },

    reset() {
        this.saveAll(CONFIG.DEFAULT_DATA);
        return CONFIG.DEFAULT_DATA;
    },

    // Hàm CRUD tổng quát cho mọi key (services/testimonials)
    upsertItem(key, item) {
        const data = this.getAll();
        const index = data[key].findIndex(i => i.id == item.id);
        
        if (index !== -1) {
            data[key][index] = item; // Update
        } else {
            item.id = Date.now(); // Tạo ID mới nếu chưa có
            data[key].push(item); // Add
        }
        this.saveAll(data);
    },

    deleteItem(key, id) {
        const data = this.getAll();
        data[key] = data[key].filter(i => i.id != id);
        this.saveAll(data);
    },
    
    getItemById(key, id) {
        const data = this.getAll();
        return data[key].find(i => i.id == id);
    }
};

/**
 * 3. VIEW RENDERER
 * Chịu trách nhiệm tạo chuỗi HTML (Pure function render)
 */
const ViewRenderer = {
    serviceCard(service) {
        return `
            <div class="col-md-6 col-lg-4">
                <div class="bg-white p-5 text-center border rounded-1 h-100 shadow-sm-hover transition-hover position-relative group-action">
                    <div class="d-inline-flex align-items-center justify-content-center bg-success text-white rounded-1 mb-4" style="width: 50px; height: 50px;">
                        <i class="bi ${service.icon} fs-3"></i>
                    </div>
                    <h4 class="fw-bold text-secondary mb-3">${service.title}</h4>
                    <p class="text-muted small mb-0">${service.desc}</p>
                </div>
            </div>`;
    },

    testimonialItem(t, index) {
        return `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="testimonial-item text-center">
                        <div class="p-4 rounded-3 mb-4 position-relative bg-white shadow-sm">
                            <p class="fst-italic mb-0 text-secondary">
                                <i class="bi bi-quote fs-3 text-success me-2"></i>
                                ${t.quote}
                                <i class="bi bi-quote fs-3 text-success ms-2"></i>
                            </p>
                        </div>
                        <img src="${t.img}" alt="${t.name}" 
                             class="rounded-circle border border-4 border-white shadow-sm mb-3" 
                             width="90" height="90" 
                             onerror="this.src='https://via.placeholder.com/90'">
                        <h5 class="fw-bold text-secondary mb-1">${t.name}</h5>
                        <span class="text-muted small text-uppercase">${t.role}</span>
                    </div>
                </div>
            </div>
        </div>`;
    },

    adminListItem(item, type, titleProp, subProp, imgProp = null) {
        const imgHtml = imgProp ? `<img src="${item[imgProp]}" class="rounded-circle me-3" width="40" height="40" style="object-fit:cover;">` : 
                                  `<div class="bg-light rounded p-2 me-3"><i class="bi ${item.icon} fs-5 text-success"></i></div>`;
        
        return `
            <div class="list-group-item d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    ${imgHtml}
                    <div>
                        <strong>${item[titleProp]}</strong><br>
                        ${subProp ? `<small class="text-muted">${item[subProp]}</small>` : ''}
                    </div>
                </div>
                <div>
                    <button class="btn btn-sm btn-warning me-1" onclick="App.handleEdit('${type}', ${item.id})"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="App.handleDelete('${type}', ${item.id})"><i class="bi bi-trash"></i></button>
                </div>
            </div>`;
    },

    iconGrid(filterText = "") {
        const filtered = CONFIG.ICONS.filter(icon => icon.includes(filterText.toLowerCase()));
        if (!filtered.length) return '<p class="text-center w-100 text-muted">Không tìm thấy icon nào.</p>';
        
        return filtered.map(icon => `
            <div class="icon-option" onclick="App.handleSelectIcon('${icon}')">
                <i class="bi ${icon}"></i>
                <div style="font-size: 10px; overflow: hidden; text-overflow: ellipsis;">${icon.replace('bi-', '')}</div>
            </div>
        `).join('');
    },

    // HTML cho Admin Panel (Static)
    adminPanelHtml() {
        return `
        <div id="cmsWrapper">
            <div class="position-fixed bottom-0 end-0 p-4" style="z-index: 9999">
                <button class="btn bg-white text-success rounded-circle shadow border border-3 border-success d-flex align-items-center justify-content-center p-0" 
                        data-bs-toggle="modal" data-bs-target="#cmsModal"
                        style="width: 60px; height: 60px; transition: all 0.3s ease;">
                    <i class="bi bi-gear-fill fs-3"></i>
                </button>
            </div>

            <div class="modal fade" id="cmsModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header bg-success text-white">
                            <h5 class="modal-title">Quản Trị Nội Dung</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <ul class="nav nav-tabs mb-3" role="tablist">
                                <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-services">Dịch vụ (Services)</button></li>
                                <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-testimonials">Khách hàng (Testimonials)</button></li>
                            </ul>
                            
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="tab-services">
                                    <form id="form-services" class="mb-4 border p-3 rounded bg-light" onsubmit="App.handleFormSubmit(event, 'services')">
                                        <h6>Thêm/Sửa Service</h6>
                                        <input type="hidden" name="id">
                                        <div class="row g-2">
                                            <div class="col-md-6"><input type="text" name="title" class="form-control" placeholder="Tiêu đề" required></div>
                                            <div class="col-md-6">
                                                <div class="input-group">
                                                    <span class="input-group-text" id="selected-icon-preview"><i class="bi bi-box"></i></span>
                                                    <input type="text" name="icon" id="input-icon-display" class="form-control" placeholder="Chọn icon..." readonly required style="background-color: white;">
                                                    <button class="btn btn-outline-secondary" type="button" data-bs-toggle="modal" data-bs-target="#iconPickerModal">Chọn</button>
                                                </div>
                                            </div>
                                            <div class="col-md-12"><textarea name="desc" class="form-control" placeholder="Mô tả" rows="2" required></textarea></div>
                                        </div>
                                        <div class="mt-2 text-end">
                                            <button type="button" class="btn btn-secondary btn-sm" onclick="App.resetForm('services')">Hủy</button>
                                            <button type="submit" class="btn btn-success btn-sm">Lưu</button>
                                        </div>
                                    </form>
                                    <div class="list-group" id="admin-services-list" style="max-height: 300px; overflow-y:auto"></div>
                                </div>

                                <div class="tab-pane fade" id="tab-testimonials">
                                    <form id="form-testimonials" class="mb-4 border p-3 rounded bg-light" onsubmit="App.handleFormSubmit(event, 'testimonials')">
                                        <h6>Thêm/Sửa Testimonial</h6>
                                        <input type="hidden" name="id">
                                        <div class="row g-2">
                                            <div class="col-md-6"><input type="text" name="name" class="form-control" placeholder="Tên khách hàng" required></div>
                                            <div class="col-md-6"><input type="text" name="role" class="form-control" placeholder="Chức danh" required></div>
                                            <div class="col-md-12"><input type="text" name="img" class="form-control" placeholder="Link ảnh (vd: Img/c1.jpg)" required></div>
                                            <div class="col-md-12"><textarea name="quote" class="form-control" placeholder="Trích dẫn" rows="2" required></textarea></div>
                                        </div>
                                        <div class="mt-2 text-end">
                                            <button type="button" class="btn btn-secondary btn-sm" onclick="App.resetForm('testimonials')">Hủy</button>
                                            <button type="submit" class="btn btn-success btn-sm">Lưu</button>
                                        </div>
                                    </form>
                                    <div class="list-group" id="admin-testimonials-list" style="max-height: 300px; overflow-y:auto"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="iconPickerModal" tabindex="-1" style="z-index: 10000;">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Chọn Icon</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <input type="text" id="icon-search-input" class="form-control mb-3" placeholder="Tìm kiếm icon (vd: wifi, user...)">
                            <div class="icon-grid" id="icon-grid-container"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }
};

/**
 * 4. MAIN APP CONTROLLER
 * Điều phối logic
 */
const App = {
    init() {
        this.renderAdminLayout();
        this.bindEvents();
        this.loadAndRenderAll();
    },

    // 1. Khởi tạo Layout
    renderAdminLayout() {
        const existing = document.getElementById('cmsWrapper');
        if (existing) existing.remove();
        document.body.insertAdjacentHTML('beforeend', ViewRenderer.adminPanelHtml());
        
        // Render lưới icon ban đầu
        this.renderIconGrid();
    },

    // 2. Binding Events (Lắng nghe sự kiện)
    bindEvents() {
        // Lắng nghe sự kiện thay đổi data để render lại UI
        document.addEventListener('cmsDataUpdated', () => this.loadAndRenderAll());

        // Search Icon
        const searchInput = document.getElementById('icon-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.renderIconGrid(e.target.value));
        }
    },

    // 3. Render Dữ liệu ra màn hình (Public & Admin)
    loadAndRenderAll() {
        const data = StorageService.getAll();
        
        // Render Public Services
        const svContainer = document.getElementById('services-container');
        if (svContainer) svContainer.innerHTML = data.services.map(ViewRenderer.serviceCard).join('');

        // Render Public Testimonials
        const tmContainer = document.getElementById('testimonials-container');
        const tmIndicators = document.getElementById('testimonial-indicators');
        if (tmContainer && tmIndicators) {
            tmContainer.innerHTML = data.testimonials.map(ViewRenderer.testimonialItem).join('');
            tmIndicators.innerHTML = data.testimonials.map((_, idx) => `
                <button type="button" data-bs-target="#testimonialCarousel" data-bs-slide-to="${idx}" 
                class="${idx === 0 ? 'active' : ''}"></button>
            `).join('');
        }

        // Render Admin Lists
        const adminSvList = document.getElementById('admin-services-list');
        if (adminSvList) {
            adminSvList.innerHTML = data.services.map(s => ViewRenderer.adminListItem(s, 'services', 'title', 'desc')).join('');
        }
        
        const adminTmList = document.getElementById('admin-testimonials-list');
        if (adminTmList) {
            adminTmList.innerHTML = data.testimonials.map(t => ViewRenderer.adminListItem(t, 'testimonials', 'name', 'role', 'img')).join('');
        }
    },

    renderIconGrid(filter = "") {
        const container = document.getElementById('icon-grid-container');
        if (container) container.innerHTML = ViewRenderer.iconGrid(filter);
    },

    // --- ACTIONS (Xử lý hành động từ người dùng) ---

    // Xử lý chung cho Submit Form (Services & Testimonials)
    handleFormSubmit(event, type) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const item = Object.fromEntries(formData.entries()); // Chuyển FormData thành Object

        // Xử lý ID (nếu rỗng -> new item, nếu có -> update)
        if (item.id) {
            item.id = parseInt(item.id); // Ép kiểu về số vì value input là string
        } else {
            delete item.id; // Xóa key id rỗng để StorageService tự tạo
        }

        StorageService.upsertItem(type, item);
        this.resetForm(type);
    },

    handleEdit(type, id) {
        const item = StorageService.getItemById(type, id);
        if (!item) return;

        const form = document.getElementById(`form-${type}`);
        if (!form) return;

        // Tự động điền dữ liệu vào form dựa trên `name` attribute
        Object.keys(item).forEach(key => {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) input.value = item[key];
        });

        // Xử lý riêng cho icon preview nếu là services
        if (type === 'services') this.updateIconPreview(item.icon);
    },

    handleDelete(type, id) {
        if (confirm('Bạn có chắc chắn muốn xóa mục này?')) {
            StorageService.deleteItem(type, id);
        }
    },

    handleSelectIcon(iconClass) {
        const input = document.getElementById('input-icon-display');
        if (input) {
            input.value = iconClass;
            this.updateIconPreview(iconClass);
        }
        // Đóng modal bootstrap
        const modalEl = document.getElementById('iconPickerModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
    },

    updateIconPreview(iconClass) {
        const preview = document.getElementById('selected-icon-preview');
        if (preview) preview.innerHTML = `<i class="bi ${iconClass}"></i>`;
    },

    resetForm(type) {
        const form = document.getElementById(`form-${type}`);
        if (form) {
            form.reset();
            form.querySelector('[name="id"]').value = ""; // Xóa hidden ID
            if (type === 'services') this.updateIconPreview('bi-box');
        }
    }
};

// Khởi chạy ứng dụng khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => App.init());