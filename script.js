// Dateninitialisierung
let products = [
    {name: 'Sportschuhe', price: 450, stock: 10},
    {name: 'Handtasche', price: 320, stock: 5}
];

let users = [
    {name: 'Ali Rezaei', email: 'ali@example.com', role: 'Benutzer'},
    {name: 'Zahra Karimi', email: 'zahra@example.com', role: 'Admin'}
];

let orders = [
    {id: 1001, customer: 'Ali Rezaei', total: 770, status: 'Bezahlt'},
    {id: 1002, customer: 'Zahra Karimi', total: 450, status: 'Ausstehend'}
];

// DOM-Elemente
const productTable = document.querySelector('#productTable tbody');
const userTable = document.querySelector('#userTable tbody');
const orderTable = document.querySelector('#orderTable tbody');
const searchProduct = document.querySelector('#searchProduct');
const addProductBtn = document.querySelector('#addProduct');
const toggleDarkBtn = document.querySelector('#toggleDark');

// LocalStorage
function saveData() {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('orders', JSON.stringify(orders));
}

function loadData() {
    if(localStorage.getItem('products')) products = JSON.parse(localStorage.getItem('products'));
    if(localStorage.getItem('users')) users = JSON.parse(localStorage.getItem('users'));
    if(localStorage.getItem('orders')) orders = JSON.parse(localStorage.getItem('orders'));
}

// Rendering
function renderProducts(filter='') {
    productTable.innerHTML = '';
    products.filter(p => p.name.includes(filter)).forEach((p,i) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${p.name}</td><td>${p.price} €</td><td>${p.stock}</td><td><button onclick='editProduct(${i})'>Bearbeiten</button> <button onclick='deleteProduct(${i})'>Löschen</button></td>`;
        productTable.appendChild(row);
    });
}

function renderUsers() {
    userTable.innerHTML = '';
    users.forEach(u => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${u.name}</td><td>${u.email}</td><td>${u.role}</td>`;
        userTable.appendChild(row);
    });
}

function renderOrders() {
    orderTable.innerHTML = '';
    orders.forEach(o => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${o.id}</td><td>${o.customer}</td><td>${o.total} €</td><td>${o.status}</td>`;
        orderTable.appendChild(row);
    });
}

// CRUD für Produkte
function addProduct() {
    const name = prompt('Produktname:');
    const price = parseInt(prompt('Preis:'));
    const stock = parseInt(prompt('Lagerbestand:'));
    if(name && price && stock != null) {
        products.push({name, price, stock});
        saveData();
        renderProducts();
    }
}

function editProduct(i) {
    const p = products[i];
    const name = prompt('Produktname:', p.name);
    const price = parseInt(prompt('Preis:', p.price));
    const stock = parseInt(prompt('Lagerbestand:', p.stock));
    products[i] = {name, price, stock};
    saveData();
    renderProducts();
}

function deleteProduct(i) {
    if(confirm('Sind Sie sicher?')) {
        products.splice(i,1);
        saveData();
        renderProducts();
    }
}

// Dark Mode
toggleDarkBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Produktsuche
searchProduct.addEventListener('input', e => {
    renderProducts(e.target.value);
});

// Produkt hinzufügen
addProductBtn.addEventListener('click', addProduct);

// Sales Chart
const ctx = document.getElementById('salesChart').getContext('2d');
const salesChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: orders.map(o => o.customer),
        datasets: [{
            label: 'Bestellbetrag',
            data: orders.map(o => o.total),
            backgroundColor: 'rgba(75, 192, 192, 0.6)'
        }]
    },
    options: { responsive:true, maintainAspectRatio:false }
});

// Initialisierung
loadData();
renderProducts();
renderUsers();
renderOrders();
