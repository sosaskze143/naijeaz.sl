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
