/* =============================================
   SMART RESTO v3.0 — Main Script
   ============================================= */

// ===== USERS =====
const USERS = [
    { username: "admin",  password: "admin123", role: "Manager", name: "Alex Manager" },
    { username: "waiter", password: "1234",      role: "Waiter",  name: "Sam Waiter"   },
];

// ===== MENU DATA =====
const MENU = {
    "🥗 Starters": [
        { name: "Garlic Bread",        price: 6  },
        { name: "Caesar Salad",        price: 9  },
        { name: "Crispy Calamari",     price: 13 },
        { name: "Buffalo Wings",       price: 14 },
        { name: "Mozzarella Sticks",   price: 10 },
        { name: "Tomato Soup",         price: 8  },
        { name: "Shrimp Cocktail",     price: 16 },
        { name: "Bruschetta",          price: 8  },
    ],
    "🍔 Burgers & Sandwiches": [
        { name: "Classic Burger",       price: 12 },
        { name: "BBQ Bacon Burger",     price: 16 },
        { name: "Mushroom Swiss Burger",price: 15 },
        { name: "Veggie Burger",        price: 13 },
        { name: "Spicy Chicken Burger", price: 14 },
        { name: "Club Sandwich",        price: 13 },
        { name: "BLT Sandwich",         price: 11 },
        { name: "Grilled Cheese",       price: 9  },
    ],
    "🍕 Pizza": [
        { name: "Margherita Pizza",     price: 15 },
        { name: "Pepperoni Pizza",      price: 17 },
        { name: "BBQ Chicken Pizza",    price: 18 },
        { name: "Four Cheese Pizza",    price: 19 },
        { name: "Vegetarian Pizza",     price: 16 },
        { name: "Meat Lovers Pizza",    price: 20 },
        { name: "Hawaiian Pizza",       price: 17 },
    ],
    "🍝 Pasta & Mains": [
        { name: "Pasta Alfredo",        price: 14 },
        { name: "Spaghetti Bolognese",  price: 15 },
        { name: "Penne Arrabbiata",     price: 13 },
        { name: "Lasagna",              price: 16 },
        { name: "Grilled Salmon",       price: 24 },
        { name: "NY Strip Steak",       price: 34 },
        { name: "Ribeye Steak",         price: 38 },
        { name: "Chicken Parmesan",     price: 18 },
        { name: "Fish & Chips",         price: 16 },
        { name: "Beef Ribs",            price: 28 },
        { name: "Lamb Chops",           price: 32 },
        { name: "Duck Breast",          price: 29 },
    ],
    "🥤 Drinks": [
        { name: "Iced Lemon Tea",       price: 4 },
        { name: "Fresh Orange Juice",   price: 5 },
        { name: "Espresso",             price: 3 },
        { name: "Cappuccino",           price: 5 },
        { name: "Latte",                price: 5 },
        { name: "Lemonade",             price: 4 },
        { name: "Sparkling Water",      price: 3 },
        { name: "Still Water",          price: 2 },
        { name: "Classic Coke",         price: 3 },
        { name: "Diet Coke",            price: 3 },
        { name: "Chocolate Milkshake",  price: 7 },
        { name: "Mango Smoothie",       price: 7 },
        { name: "Strawberry Smoothie",  price: 7 },
        { name: "Iced Coffee",          price: 5 },
    ],
    "🍰 Desserts": [
        { name: "Chocolate Lava Cake",  price: 9  },
        { name: "New York Cheesecake",  price: 8  },
        { name: "Ice Cream (2 scoops)", price: 6  },
        { name: "Tiramisu",             price: 9  },
        { name: "Crème Brûlée",         price: 10 },
        { name: "Brownie Sundae",       price: 8  },
        { name: "Panna Cotta",          price: 8  },
        { name: "Fruit Tart",           price: 7  },
    ],
};

const STATUS_FLOW   = ["Pending", "Preparing", "Ready", "Served"];
const STATUS_COLORS = {
    Pending:  "#4a9eff",
    Preparing:"#f0a500",
    Ready:    "#2ecc71",
    Served:   "#666",
};

const TAX_RATE = 0.10;
const TABLE_COUNT = 20;

// ===== STATE =====
let currentUser = null;
let editingId   = null;

let orders = [
    { id: 1024, table: "3",  item: "Classic Burger",     qty: 2, price: 12, notes: "No pickles",   status: "Preparing", time: new Date(Date.now() - 600000)  },
    { id: 1025, table: "12", item: "Pasta Alfredo",      qty: 1, price: 14, notes: "No cream",      status: "Pending",   time: new Date(Date.now() - 300000)  },
    { id: 1026, table: "7",  item: "Margherita Pizza",   qty: 1, price: 15, notes: "",              status: "Ready",     time: new Date(Date.now() - 900000)  },
    { id: 1027, table: "3",  item: "Iced Lemon Tea",     qty: 3, price: 4,  notes: "Extra ice",     status: "Served",    time: new Date(Date.now() - 1200000) },
    { id: 1028, table: "5",  item: "NY Strip Steak",     qty: 2, price: 34, notes: "Medium rare",   status: "Preparing", time: new Date(Date.now() - 420000)  },
    { id: 1029, table: "5",  item: "Caesar Salad",       qty: 2, price: 9,  notes: "",              status: "Served",    time: new Date(Date.now() - 780000)  },
    { id: 1030, table: "9",  item: "BBQ Chicken Pizza",  qty: 1, price: 18, notes: "Extra cheese",  status: "Pending",   time: new Date(Date.now() - 120000)  },
];

// ===== DOM READY =====
document.addEventListener("DOMContentLoaded", () => {
    setupLogin();
    setupApp();
    updateClock();
    setInterval(updateClock, 1000);
});

// ===========================
// LOGIN
// ===========================
function setupLogin() {
    document.getElementById("loginForm").addEventListener("submit", handleLogin);

    document.getElementById("togglePass").addEventListener("click", () => {
        const input = document.getElementById("loginPass");
        const icon  = document.getElementById("togglePass");
        if (input.type === "password") {
            input.type = "text";
            icon.classList.replace("fa-eye", "fa-eye-slash");
        } else {
            input.type = "password";
            icon.classList.replace("fa-eye-slash", "fa-eye");
        }
    });
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById("loginUser").value.trim();
    const password = document.getElementById("loginPass").value;
    const user = USERS.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = user;
        document.getElementById("loginError").classList.add("hidden");
        document.getElementById("loginPage").classList.add("hidden");
        document.getElementById("mainApp").classList.remove("hidden");

        // Populate user info
        const initials = user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
        document.getElementById("userAvatar").textContent  = initials;
        document.getElementById("userName").textContent    = user.name;
        document.getElementById("userRole").textContent    = user.role;
        document.getElementById("topbarRole").textContent  = user.role;

        initApp();
    } else {
        document.getElementById("loginError").classList.remove("hidden");
        document.getElementById("loginPass").value = "";
        document.getElementById("loginPass").focus();
    }
}

function logout() {
    if (!confirm("Are you sure you want to sign out?")) return;
    currentUser = null;
    document.getElementById("mainApp").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");
    document.getElementById("loginForm").reset();
    document.getElementById("loginUser").focus();
}

// ===========================
// APP SETUP
// ===========================
function setupApp() {
    // Nav
    document.querySelectorAll(".nav-item").forEach(item => {
        item.addEventListener("click", e => {
            e.preventDefault();
            navigateTo(item.dataset.section);
            document.getElementById("sidebar").classList.remove("open");
        });
    });

    // Logout
    document.getElementById("logoutBtn").addEventListener("click", logout);

    // Mobile sidebar toggle
    document.getElementById("menuToggle").addEventListener("click", () => {
        document.getElementById("sidebar").classList.toggle("open");
    });

    // Close sidebar when clicking outside on mobile
    document.getElementById("modalBackdrop").addEventListener("click", () => {
        document.getElementById("billModal").classList.add("hidden");
    });

    // Order form
    document.getElementById("orderForm").addEventListener("submit", handleOrderSubmit);
    document.getElementById("menuCategory").addEventListener("change", onCategoryChange);
    document.getElementById("orderItem").addEventListener("change", updatePricePreview);
    document.getElementById("orderQty").addEventListener("input", updatePricePreview);
    document.getElementById("cancelEdit").addEventListener("click", resetForm);

    // Filters
    document.getElementById("filterStatus").addEventListener("change", renderOrders);
    document.getElementById("filterTable").addEventListener("input", renderOrders);

    // Bill modal
    document.getElementById("closeBill").addEventListener("click",  () => document.getElementById("billModal").classList.add("hidden"));
    document.getElementById("closeBill2").addEventListener("click", () => document.getElementById("billModal").classList.add("hidden"));
}

function initApp() {
    populateCategoryDropdown();
    renderMenu();
    navigateTo("dashboard");
}

// ===========================
// NAVIGATION
// ===========================
function navigateTo(section) {
    document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
    const navEl = document.querySelector(`[data-section="${section}"]`);
    if (navEl) navEl.classList.add("active");

    document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
    const secEl = document.getElementById(`section-${section}`);
    if (secEl) secEl.classList.remove("hidden");

    const titles = {
        "dashboard": "Dashboard",
        "orders":    "Live Orders",
        "new-order": "New Order",
        "tables":    "Tables Overview",
        "menu":      "Full Menu",
    };
    document.getElementById("topbarTitle").textContent = titles[section] || section;

    if (section === "dashboard") renderDashboard();
    if (section === "orders")    renderOrders();
    if (section === "tables")    renderTables();

    updateNavBadge();
}

function updateNavBadge() {
    const active = orders.filter(o => o.status === "Pending" || o.status === "Preparing").length;
    const badge = document.getElementById("navBadge");
    badge.textContent = active;
    badge.style.display = active > 0 ? "inline-block" : "none";
}

// ===========================
// DASHBOARD
// ===========================
function renderDashboard() {
    const total     = orders.length;
    const pending   = orders.filter(o => o.status === "Pending").length;
    const preparing = orders.filter(o => o.status === "Preparing").length;
    const done      = orders.filter(o => o.status === "Ready" || o.status === "Served").length;
    const revenue   = orders.reduce((s, o) => s + o.price * o.qty, 0);

    // Occupied tables (unique tables with non-served orders)
    const occupiedTables = new Set(
        orders.filter(o => o.status !== "Served").map(o => o.table)
    ).size;

    document.getElementById("statTotal").textContent   = total;
    document.getElementById("statPending").textContent = pending;
    document.getElementById("statPreparing").textContent = preparing;
    document.getElementById("statDone").textContent    = done;
    document.getElementById("statRevenue").textContent = `$${revenue.toFixed(2)}`;
    document.getElementById("statTables").textContent  = `${occupiedTables} / ${TABLE_COUNT}`;

    // Recent activity
    const activity = document.getElementById("recentActivity");
    const recent = [...orders].sort((a, b) => b.time - a.time).slice(0, 10);

    if (!recent.length) {
        activity.innerHTML = `<div class="activity-item"><span style="color:var(--muted)">No activity yet.</span></div>`;
        return;
    }

    activity.innerHTML = recent.map(o => `
        <div class="activity-item">
            <div class="act-dot" style="background:${STATUS_COLORS[o.status]}"></div>
            <div class="act-text">
                Table <strong>${o.table}</strong> — ${o.item} ×${o.qty}
                ${o.notes ? `<span style="color:var(--muted);font-size:0.78rem"> · ${o.notes}</span>` : ""}
            </div>
            <span class="badge ${o.status.toLowerCase()}">${o.status}</span>
            <div class="act-time">${timeAgo(o.time)}</div>
        </div>
    `).join("");
}

// ===========================
// ORDERS TABLE
// ===========================
function renderOrders() {
    const statusFilter = document.getElementById("filterStatus").value;
    const tableFilter  = document.getElementById("filterTable").value.trim().toLowerCase();

    let filtered = orders;
    if (statusFilter) filtered = filtered.filter(o => o.status === statusFilter);
    if (tableFilter)  filtered = filtered.filter(o => o.table.toLowerCase().includes(tableFilter));

    // Sort: active first, then by time desc
    filtered.sort((a, b) => {
        const si = (s) => ["Pending","Preparing","Ready","Served"].indexOf(s);
        if (si(a.status) !== si(b.status)) return si(a.status) - si(b.status);
        return b.time - a.time;
    });

    const body = document.getElementById("ordersBody");

    if (!filtered.length) {
        body.innerHTML = `
            <tr>
                <td colspan="9" style="text-align:center;padding:48px;color:var(--muted)">
                    <i class="fas fa-receipt" style="font-size:2rem;display:block;margin-bottom:10px;opacity:0.3"></i>
                    No orders found
                </td>
            </tr>`;
        return;
    }

    body.innerHTML = filtered.map(o => {
        const total     = (o.price * o.qty).toFixed(2);
        const nextIdx   = STATUS_FLOW.indexOf(o.status) + 1;
        const nextStatus = STATUS_FLOW[nextIdx];

        return `
        <tr>
            <td class="order-id">#${o.id}</td>
            <td class="table-num">T-${o.table.padStart(2,"0")}</td>
            <td class="item-name">${o.item}</td>
            <td>${o.qty}</td>
            <td class="order-notes" title="${o.notes || ""}">${o.notes || "—"}</td>
            <td class="order-total">$${total}</td>
            <td><span class="badge ${o.status.toLowerCase()}">${o.status}</span></td>
            <td class="order-time">${timeAgo(o.time)}</td>
            <td>
                <div class="action-btns">
                    ${nextStatus ? `
                        <button class="btn-icon advance" onclick="advanceStatus(${o.id})" title="Mark as ${nextStatus}">
                            <i class="fas fa-arrow-right"></i> ${nextStatus}
                        </button>` : ""}
                    <button class="btn-icon edit-btn" onclick="startEdit(${o.id})" title="Edit">
                        <i class="fas fa-pen"></i>
                    </button>
                    <button class="btn-icon del-btn" onclick="deleteOrder(${o.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>`;
    }).join("");

    updateNavBadge();
}

function advanceStatus(id) {
    const order = orders.find(o => o.id === id);
    if (!order) return;
    const idx = STATUS_FLOW.indexOf(order.status);
    if (idx < STATUS_FLOW.length - 1) {
        order.status = STATUS_FLOW[idx + 1];
        renderOrders();
        if (document.getElementById("section-dashboard").classList.contains("active") === false) {
            updateNavBadge();
        }
        renderTables();
        showToast(`Order #${id} → <strong>${order.status}</strong>`);
    }
}

function deleteOrder(id) {
    if (!confirm("Remove this order permanently?")) return;
    orders = orders.filter(o => o.id !== id);
    renderOrders();
    renderTables();
    showToast("Order removed");
}

// ===========================
// NEW ORDER FORM
// ===========================
function populateCategoryDropdown() {
    const cat = document.getElementById("menuCategory");
    cat.innerHTML = `<option value="">Select category...</option>`;
    Object.keys(MENU).forEach(c => {
        const opt = document.createElement("option");
        opt.value = c;
        opt.textContent = c;
        cat.appendChild(opt);
    });
}

function onCategoryChange() {
    const cat    = document.getElementById("menuCategory").value;
    const itemSel = document.getElementById("orderItem");
    itemSel.innerHTML = `<option value="">Select item...</option>`;

    if (cat && MENU[cat]) {
        MENU[cat].forEach(item => {
            const opt        = document.createElement("option");
            opt.value        = item.name;
            opt.dataset.price = item.price;
            opt.textContent  = `${item.name} — $${item.price}`;
            itemSel.appendChild(opt);
        });
    }
    updatePricePreview();
}

function updatePricePreview() {
    const itemSel = document.getElementById("orderItem");
    const selected = itemSel.options[itemSel.selectedIndex];
    const qty      = parseInt(document.getElementById("orderQty").value) || 1;
    const preview  = document.getElementById("pricePreview");

    if (selected && selected.dataset.price) {
        const price = parseFloat(selected.dataset.price);
        const total = (price * qty).toFixed(2);
        preview.innerHTML = `<i class="fas fa-tag"></i> ${selected.value} × ${qty} = <strong style="color:var(--gold-lt)">$${total}</strong>`;
        preview.classList.add("active");
    } else {
        preview.innerHTML = `<i class="fas fa-tag"></i> Select an item to see price`;
        preview.classList.remove("active");
    }
}

function handleOrderSubmit(e) {
    e.preventDefault();

    const table = document.getElementById("tableNumber").value.trim();
    const itemSel = document.getElementById("orderItem");
    const selectedOpt = itemSel.options[itemSel.selectedIndex];
    const item  = itemSel.value;
    const qty   = parseInt(document.getElementById("orderQty").value) || 1;
    const notes = document.getElementById("orderNotes").value.trim();
    const price = parseFloat(selectedOpt?.dataset.price) || 0;

    if (!item) { showToast("Please select a menu item!"); return; }
    if (!table || parseInt(table) < 1 || parseInt(table) > TABLE_COUNT) {
        showToast(`Table number must be between 1 and ${TABLE_COUNT}`);
        return;
    }

    if (editingId) {
        const order = orders.find(o => o.id === editingId);
        if (order) {
            order.table = table;
            order.item  = item;
            order.qty   = qty;
            order.notes = notes;
            order.price = price;
        }
        showToast("Order updated successfully!");
        editingId = null;
    } else {
        const newOrder = {
            id:     Math.floor(Math.random() * 9000) + 1000,
            table, item, qty, price, notes,
            status: "Pending",
            time:   new Date(),
        };
        orders.push(newOrder);
        showToast("Order sent to kitchen! 🍳");
    }

    resetForm();
    renderTables();
    updateNavBadge();
}

function startEdit(id) {
    const order = orders.find(o => o.id === id);
    if (!order) return;
    editingId = id;

    // Find category of item
    let orderCat = "";
    for (const [cat, items] of Object.entries(MENU)) {
        if (items.find(i => i.name === order.item)) { orderCat = cat; break; }
    }

    document.getElementById("tableNumber").value  = order.table;
    document.getElementById("menuCategory").value = orderCat;
    onCategoryChange();

    // Need slight delay for select to populate
    setTimeout(() => {
        const itemSel = document.getElementById("orderItem");
        for (const opt of itemSel.options) {
            if (opt.value === order.item) { opt.selected = true; break; }
        }
        updatePricePreview();
    }, 50);

    document.getElementById("orderQty").value   = order.qty;
    document.getElementById("orderNotes").value  = order.notes;
    document.getElementById("submitBtn").innerHTML = `<i class="fas fa-save"></i> Update Order`;
    document.getElementById("formTitle").textContent = `Edit Order #${id}`;
    document.getElementById("cancelEdit").classList.remove("hidden");

    navigateTo("new-order");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetForm() {
    editingId = null;
    document.getElementById("orderForm").reset();
    document.getElementById("orderItem").innerHTML  = `<option value="">Select item...</option>`;
    document.getElementById("pricePreview").innerHTML = `<i class="fas fa-tag"></i> Select an item to see price`;
    document.getElementById("pricePreview").classList.remove("active");
    document.getElementById("submitBtn").innerHTML  = `<i class="fas fa-paper-plane"></i> Send to Kitchen`;
    document.getElementById("formTitle").textContent = "New Order";
    document.getElementById("cancelEdit").classList.add("hidden");
}

// ===========================
// TABLES VIEW
// ===========================
function renderTables() {
    const grid = document.getElementById("tablesGrid");
    let html   = "";

    for (let t = 1; t <= TABLE_COUNT; t++) {
        const tableOrders  = orders.filter(o => parseInt(o.table) === t && o.status !== "Served");
        const occupied     = tableOrders.length > 0;
        const totalAmount  = tableOrders.reduce((s, o) => s + o.price * o.qty, 0);
        const orderCount   = tableOrders.length;

        const statusSummary = occupied
            ? tableOrders.map(o => `<span class="badge ${o.status.toLowerCase()}" style="font-size:0.6rem;padding:2px 7px">${o.status}</span>`).slice(0, 3).join(" ")
            : "";

        html += `
        <div class="table-card ${occupied ? "occupied" : ""}">
            <div class="tc-dot"></div>
            <div class="tc-number">${String(t).padStart(2, "0")}</div>
            <div class="tc-label">${occupied ? "Occupied" : "Free"}</div>
            <div class="tc-details">
                ${occupied
                    ? `<div>${orderCount} order${orderCount > 1 ? "s" : ""} active</div>
                       <div>Bill: <strong>$${totalAmount.toFixed(2)}</strong></div>
                       <div style="margin-top:6px;display:flex;gap:3px;flex-wrap:wrap;justify-content:center">${statusSummary}</div>`
                    : `<div style="color:var(--dim)">Available</div>`
                }
            </div>
            ${occupied ? `<button class="btn-bill" onclick="showBill(${t})"><i class="fas fa-file-invoice"></i> View Bill</button>` : ""}
        </div>`;
    }

    grid.innerHTML = html;
}

// ===========================
// BILL MODAL
// ===========================
function showBill(tableNum) {
    const tableOrders = orders.filter(o => parseInt(o.table) === tableNum);
    const modal   = document.getElementById("billModal");
    const content = document.getElementById("billContent");

    if (!tableOrders.length) {
        showToast("No orders for this table");
        return;
    }

    const subtotal = tableOrders.reduce((s, o) => s + o.price * o.qty, 0);
    const tax      = subtotal * TAX_RATE;
    const total    = subtotal + tax;
    const now      = new Date().toLocaleString("en-US", {
        year: "numeric", month: "short", day: "numeric",
        hour: "2-digit", minute: "2-digit"
    });

    content.innerHTML = `
        <div class="bill-header">
            <div class="bill-table-num">Table ${tableNum}</div>
            <div class="bill-meta">${now} &nbsp;·&nbsp; SmartResto</div>
        </div>
        <div class="bill-items">
            ${tableOrders.map(o => `
            <div class="bill-item">
                <div class="bill-item-left">
                    <div class="bill-item-name">${o.item}</div>
                    ${o.notes ? `<div class="bill-item-note">${o.notes}</div>` : ""}
                    <span class="badge ${o.status.toLowerCase()}" style="margin-top:4px">${o.status}</span>
                </div>
                <div class="bill-item-right">
                    <div class="bill-item-qty">×${o.qty} @ $${o.price.toFixed(2)}</div>
                    <div class="bill-item-price">$${(o.price * o.qty).toFixed(2)}</div>
                </div>
            </div>`).join("")}
        </div>
        <hr class="bill-divider">
        <div class="bill-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
        <div class="bill-row"><span>Tax (10%)</span><span>$${tax.toFixed(2)}</span></div>
        <hr class="bill-divider">
        <div class="bill-row total"><span>TOTAL</span><span>$${total.toFixed(2)}</span></div>
        <div class="bill-footer">
            <i class="fas fa-heart" style="color:var(--gold);margin-right:6px"></i>
            Thank you for dining with us!
        </div>
    `;

    modal.classList.remove("hidden");
}

// ===========================
// MENU DISPLAY
// ===========================
function renderMenu() {
    const container = document.getElementById("menuDisplay");
    container.innerHTML = Object.entries(MENU).map(([cat, items]) => `
        <div class="menu-category">
            <div class="menu-cat-title">${cat}</div>
            <div class="menu-items-grid">
                ${items.map(item => `
                <div class="menu-item-card">
                    <span class="menu-item-name">${item.name}</span>
                    <span class="menu-item-price">$${item.price}</span>
                </div>`).join("")}
            </div>
        </div>
    `).join("");
}

// ===========================
// UTILITIES
// ===========================
function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.innerHTML = msg;
    toast.classList.remove("hidden");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.add("hidden"), 3200);
}

function updateClock() {
    const el = document.getElementById("clock");
    if (el) {
        el.textContent = new Date().toLocaleTimeString([], {
            hour: "2-digit", minute: "2-digit", second: "2-digit"
        });
    }
}

function timeAgo(date) {
    const diff = Math.floor((Date.now() - date) / 1000);
    if (diff < 60)   return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
}
