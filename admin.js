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
