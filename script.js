function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}

document.querySelector('.sidebar-toggle').addEventListener('click', function() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar.style.width === '250px') {
        sidebar.style.width = '0';
    } else {
        sidebar.style.width = '250px';
    }
});

document.getElementById('requestForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('تم إرسال الطلب بنجاح!');
    // يمكنك هنا إضافة كود لإرسال البيانات إلى الخادم
});
