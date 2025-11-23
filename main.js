// Danh sách icon Bootstrap Icons có thể sử dụng
const iconList = [
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
];
// Dữ liệu mẫu mặc định
const defaultData = {
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
};


// Controller quản lý dữ liệu
const DataCtrl = {
    getData: function () {
        const data = localStorage.getItem('cmsData');
        return data ? JSON.parse(data) : (this.saveData(defaultData), defaultData);
    },
    saveData: function (data) {
        localStorage.setItem('cmsData', JSON.stringify(data));
        document.dispatchEvent(new Event('dataUpdated'));
    },
    addItem: function (type, item) {
        const data = this.getData();
        item.id = Date.now();
        data[type].push(item);
        this.saveData(data);
    },
    updateItem: function (type, updatedItem) {
        const data = this.getData();
        const index = data[type].findIndex(i => i.id == updatedItem.id);
        if (index !== -1) {
            data[type][index] = updatedItem;
            this.saveData(data);
        }
    },
    deleteItem: function (type, id) {
        const data = this.getData();
        data[type] = data[type].filter(i => i.id != id);
        this.saveData(data);
    }
};
// Controller quản lý giao diện người dùng
const UICtrl = {
    renderServices: function (services) {
        const container = document.getElementById('services-container');
        if (!container) return;

        container.innerHTML = services.map(service => `
            <div class="col-md-6 col-lg-4">
                <div class="bg-white p-5 text-center border rounded-1 h-100 shadow-sm-hover transition-hover position-relative group-action">
                    <div class="d-inline-flex align-items-center justify-content-center bg-success text-white rounded-1 mb-4" style="width: 50px; height: 50px;">
                        <i class="bi ${service.icon} fs-3"></i>
                    </div>
                    <h4 class="fw-bold text-secondary mb-3">${service.title}</h4>
                    <p class="text-muted small mb-0">${service.desc}</p>
                </div>
            </div>
        `).join('');
    },

    // Render testimonials
    renderTestimonials: function (testimonials) {
        const container = document.getElementById('testimonials-container');
        const indicatorsContainer = document.getElementById('testimonial-indicators');

        if (!container || !indicatorsContainer) return;


        container.innerHTML = testimonials.map((t, index) => `
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
                             width="90" height="90">
                        <h5 class="fw-bold text-secondary mb-1">${t.name}</h5>
                        <span class="text-muted small text-uppercase">${t.role}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

        // Render indicators 
        indicatorsContainer.innerHTML = testimonials.map((_, index) => `
        <button type="button" 
                data-bs-target="#testimonialCarousel" 
                data-bs-slide-to="${index}" 
                class="${index === 0 ? 'active' : ''}" 
                aria-current="${index === 0 ? 'true' : 'false'}" 
                aria-label="Slide ${index + 1}"></button>
    `).join('');
    },


    // Khởi tạo giao diện quản trị
    initAdminPanel: function () {

        const oldModal = document.getElementById('cmsWrapper');
        if (oldModal) oldModal.remove();
        // Tạo HTML cho giao diện quản trị
        const html = `
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
                            <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-services">Services</button></li>
                            <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-testimonials">Testimonials</button></li>
                        </ul>
                        
                        <div class="tab-content">
                            <div class="tab-pane fade show active" id="tab-services">
                                <form id="form-service" class="mb-4 border p-3 rounded bg-light">
                                    <h6>Thêm/Sửa Service</h6>
                                    <input type="hidden" id="sv-id">
                                    <div class="row g-2">
                                        <div class="col-md-6"><input type="text" id="sv-title" class="form-control" placeholder="Tiêu đề" required></div>
                                        
                                        <div class="col-md-6">
                                            <div class="input-group">
                                                <span class="input-group-text" id="selected-icon-preview"><i class="bi bi-box"></i></span>
                                                <input type="text" id="sv-icon" class="form-control" placeholder="Chọn icon..." readonly required style="background-color: white;">
                                                <button class="btn btn-outline-secondary" type="button" data-bs-toggle="modal" data-bs-target="#iconPickerModal">Chọn</button>
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-12"><textarea id="sv-desc" class="form-control" placeholder="Mô tả" rows="2" required></textarea></div>
                                    </div>
                                    <div class="mt-2 text-end">
                                        <button type="button" class="btn btn-secondary btn-sm" onclick="App.resetForm('service')">Hủy</button>
                                        <button type="submit" class="btn btn-success btn-sm">Lưu Service</button>
                                    </div>
                                </form>
                                <div class="list-group" id="admin-services-list" style="max-height: 300px; overflow-y:auto"></div>
                            </div>

                            <div class="tab-pane fade" id="tab-testimonials">
                                <form id="form-testimonial" class="mb-4 border p-3 rounded bg-light">
                                    <h6>Thêm/Sửa Testimonial</h6>
                                    <input type="hidden" id="tm-id">
                                    <div class="row g-2">
                                        <div class="col-md-6"><input type="text" id="tm-name" class="form-control" placeholder="Tên khách hàng" required></div>
                                        <div class="col-md-6"><input type="text" id="tm-role" class="form-control" placeholder="Chức danh" required></div>
                                        <div class="col-md-12"><input type="text" id="tm-img" class="form-control" placeholder="Link ảnh (vd: Img/c1.jpg)" required></div>
                                        <div class="col-md-12"><textarea id="tm-quote" class="form-control" placeholder="Trích dẫn" rows="2" required></textarea></div>
                                    </div>
                                    <div class="mt-2">
                                        <button type="submit" class="btn btn-success btn-sm">Lưu</button>
                                        <button type="button" class="btn btn-secondary btn-sm" onclick="App.resetForm('testimonial')">Hủy</button>
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
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input type="text" id="icon-search-input" class="form-control mb-3" placeholder="Tìm kiếm icon (vd: wifi, user...)">
                        <div class="icon-grid" id="icon-grid-container"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

        document.body.insertAdjacentHTML('beforeend', html);
    },


    // Render danh sách quản trị
    renderAdminLists: function (data) {
        // 1. Render List Services
        const svList = document.getElementById('admin-services-list');
        if (svList) {
            svList.innerHTML = data.services.map(s => `
            <div class="list-group-item d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <div class="bg-light rounded p-2 me-3"><i class="bi ${s.icon} fs-5 text-success"></i></div>
                    <div><strong>${s.title}</strong></div>
                </div>
                <div>
                    <button class="btn btn-sm btn-warning me-1" onclick="App.editItem('services', ${s.id})"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="App.deleteItem('services', ${s.id})"><i class="bi bi-trash"></i></button>
                </div>
            </div>
        `).join('');
        }

        // 2. Render List Testimonials
        const tmList = document.getElementById('admin-testimonials-list');
        if (tmList) {
            tmList.innerHTML = data.testimonials.map(t => `
            <div class="list-group-item d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <img src="${t.img}" class="rounded-circle me-3" width="40" height="40" style="object-fit:cover;">
                    <div>
                        <strong>${t.name}</strong><br>
                        <small class="text-muted">${t.role}</small>
                    </div>
                </div>
                <div>
                    <button class="btn btn-sm btn-warning me-1" onclick="App.editItem('testimonials', ${t.id})"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="App.deleteItem('testimonials', ${t.id})"><i class="bi bi-trash"></i></button>
                </div>
            </div>
        `).join('');
        }
    },
    //  Hiển thị lưới icon với chức năng tìm kiếm
    renderIconGrid: function (filterText = "") {
        const container = document.getElementById('icon-grid-container');
        if (!container) return;

        // Lọc danh sách icon
        const filteredIcons = iconList.filter(icon => icon.includes(filterText.toLowerCase()));

        if (filteredIcons.length === 0) {
            container.innerHTML = '<p class="text-center w-100 text-muted">Không tìm thấy icon nào.</p>';
            return;
        }

        container.innerHTML = filteredIcons.map(icon => `
            <div class="icon-option" onclick="App.selectIcon('${icon}')">
                <i class="bi ${icon}"></i>
                <div style="font-size: 10px; overflow: hidden; text-overflow: ellipsis;">${icon.replace('bi-', '')}</div>
            </div>
        `).join('');
    },
    // Cập nhật xem trước icon đã chọn
    updateIconPreview: function (iconClass) {
        const preview = document.getElementById('selected-icon-preview');
        const input = document.getElementById('sv-icon');
        if (preview && input) {
            preview.innerHTML = `<i class="bi ${iconClass}"></i>`;
            input.value = iconClass;
        }
    }
};

// Controller chính của ứng dụng
const App = {

    init: function () {
        UICtrl.initAdminPanel();
        UICtrl.renderIconGrid();
        this.loadAndRender();


        document.addEventListener('dataUpdated', () => this.loadAndRender());

        // Thiết lập sự kiện cho tìm kiếm icon
        const searchInput = document.getElementById('icon-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                UICtrl.renderIconGrid(e.target.value);
            });
        }

        // Xử lý gửi form Service
        const formService = document.getElementById('form-service');
        if (formService) {
            formService.addEventListener('submit', (e) => {
                e.preventDefault();
                const id = document.getElementById('sv-id').value;
                const item = {
                    id: id || Date.now(),
                    title: document.getElementById('sv-title').value,
                    icon: document.getElementById('sv-icon').value,
                    desc: document.getElementById('sv-desc').value
                };
                id ? DataCtrl.updateItem('services', item) : DataCtrl.addItem('services', item);
                this.resetForm('service');
            });
        }
        // Xử lý gửi form Testimonial
        // Tìm đoạn xử lý formTestimonial trong App.init và thay thế bằng:
        const formTestimonial = document.getElementById('form-testimonial');
        if (formTestimonial) {
            formTestimonial.addEventListener('submit', (e) => {
                e.preventDefault();

                // Lấy dữ liệu từ form
                const id = document.getElementById('tm-id').value;
                const item = {
                    id: id || Date.now(),
                    name: document.getElementById('tm-name').value,
                    role: document.getElementById('tm-role').value,
                    img: document.getElementById('tm-img').value,
                    quote: document.getElementById('tm-quote').value
                };

                // Lưu dữ liệu
                if (id) {
                    DataCtrl.updateItem('testimonials', item);
                } else {
                    DataCtrl.addItem('testimonials', item);
                }

                // Reset form
                this.resetForm('testimonial');
            });
        }
    },
    // Tải dữ liệu và render lại giao diện
    loadAndRender: function () {
        const data = DataCtrl.getData();
        UICtrl.renderServices(data.services);
        UICtrl.renderTestimonials(data.testimonials);
        UICtrl.renderAdminLists(data);
    },

    // Xử lý chọn icon từ lưới icon
    selectIcon: function (iconClass) {
        UICtrl.updateIconPreview(iconClass);

        // Đóng modal chọn icon
        const modalEl = document.getElementById('iconPickerModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();


    },
    // Chỉnh sửa mục

    editItem: function (type, id) {
        const data = DataCtrl.getData();
        const item = data[type].find(i => i.id == id);
        if (!item) return;

        if (type === 'services') {
            document.getElementById('sv-id').value = item.id;
            document.getElementById('sv-title').value = item.title;
            document.getElementById('sv-desc').value = item.desc;
            UICtrl.updateIconPreview(item.icon);
        }

        else if (type === 'testimonials') {
            document.getElementById('tm-id').value = item.id;
            document.getElementById('tm-name').value = item.name;
            document.getElementById('tm-role').value = item.role;
            document.getElementById('tm-img').value = item.img;
            document.getElementById('tm-quote').value = item.quote;
        }
    },
    // Xóa mục
    deleteItem: function (type, id) {
        if (confirm('Xóa mục này?')) DataCtrl.deleteItem(type, id);
    },
    // Đặt lại form
    resetForm: function (type) {
        document.getElementById(`form-${type}`).reset();
        document.getElementById(type === 'service' ? 'sv-id' : 'tm-id').value = '';
        if (type === 'service') UICtrl.updateIconPreview('bi-box'); // Reset về icon mặc định
    }
};


document.addEventListener('DOMContentLoaded', () => App.init());
