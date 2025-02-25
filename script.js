// عند تحميل الصفحة، تحميل البيانات وعرض صفحة تسجيل الدخول
window.onload = function() {
    loadData(); // تحميل البيانات من localStorage
    showPage('loginPage');
};

// تحميل البيانات من localStorage
function loadData() {
    const savedUsers = localStorage.getItem('users');
    const savedRequests = localStorage.getItem('requests');

    if (savedUsers) {
        users = JSON.parse(savedUsers); // تحميل المستخدمين
    }

    if (savedRequests) {
        requests = JSON.parse(savedRequests); // تحميل الطلبات
    }
}

// حفظ البيانات في localStorage
function saveData() {
    localStorage.setItem('users', JSON.stringify(users)); // حفظ المستخدمين
    localStorage.setItem('requests', JSON.stringify(requests)); // حفظ الطلبات
}

// بيانات المستخدمين والطلبات
let users = [];
let requests = [];
let currentUser = null;

// تسجيل الدخول
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('loginId').value;
    const password = document.getElementById('loginPassword').value;

    if (id === "admin" && password === "admin") {
        showPage('adminPage'); // توجيه المدير إلى واجهة المدير
    } else {
        const user = users.find(u => u.id === id && u.password === password);
        if (user) {
            currentUser = user;
            document.getElementById('username').textContent = user.id;
            showPage('userPage'); // توجيه المستخدم إلى واجهة المستخدم
        } else {
            alert("رقم الهوية أو كلمة السر غير صحيحة");
        }
    }
});

// إنشاء حساب
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('registerId').value;
    const password = document.getElementById('registerPassword').value;
    const phone = document.getElementById('registerPhone').value;
    const nationality = document.getElementById('registerNationality').value;
    const birthdate = document.getElementById('registerBirthdate').value;
    const identifier = document.getElementById('registerIdentifier').value;

    if (users.some(u => u.id === id)) {
        alert("رقم الهوية مسجل مسبقًا");
    } else {
        users.push({ id, password, phone, nationality, birthdate, identifier });
        saveData(); // حفظ البيانات بعد إنشاء حساب
        alert("تم إنشاء الحساب بنجاح");
        showPage('loginPage'); // العودة إلى صفحة تسجيل الدخول
    }
});

// إنشاء طلب
document.getElementById('requestForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const identifier = document.getElementById('requestIdentifier').value;
    const details = document.getElementById('requestDetails').value;
    const files = document.getElementById('fileUpload').files;
    const requestId = requests.length + 1;

    if (!identifier) {
        alert("يرجى إدخال رقم التعريف");
        return;
    }

    requests.push({
        id: requestId,
        userId: currentUser.id,
        identifier,
        details,
        files,
        status: "قيد المراجعة"
    });

    saveData(); // حفظ البيانات بعد إنشاء طلب
    alert("تم إرسال الطلب بنجاح");
    showPage('myRequestsPage');
    displayUserRequests();
});

// عرض طلبات المستخدم
function displayUserRequests() {
    const userRequests = requests.filter(req => req.userId === currentUser.id);
    const requestsList = document.getElementById('requestsList');
    requestsList.innerHTML = userRequests.map(req => `
        <div>
            <p>رقم الطلب: ${req.id}</p>
            <p>حالة الطلب: ${req.status}</p>
        </div>
    `).join('');
}

// بحث المدير
function searchRequests() {
    const searchTerm = document.getElementById('searchInput').value;
    const filteredRequests = requests.filter(req => 
        req.userId.includes(searchTerm) || req.id.toString().includes(searchTerm)
    );
    const adminRequestsList = document.getElementById('adminRequestsList');
    adminRequestsList.innerHTML = filteredRequests.map(req => `
        <div>
            <p>رقم الطلب: ${req.id}</p>
            <p>رقم الهوية: ${req.userId}</p>
            <p>حالة الطلب: ${req.status}</p>
            <button onclick="deleteRequest(${req.id})">حذف الطلب</button>
        </div>
    `).join('');
}

// حذف الطلب (للمدير)
function deleteRequest(requestId) {
    if (confirm("هل أنت متأكد من حذف هذا الطلب؟")) {
        requests = requests.filter(req => req.id !== requestId);
        saveData(); // حفظ البيانات بعد الحذف
        searchRequests(); // تحديث القائمة
    }
}

// تبديل الصفحات
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}

// فتح/إغلاق الشريط الجانبي
document.querySelector('.sidebar-toggle').addEventListener('click', function() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar.style.width === '250px') {
        sidebar.style.width = '0';
    } else {
        sidebar.style.width = '250px';
    }
});
