// تفاعلات بسيطة: قائمة متحركة، سنة تلقائية، روابط تواصل
document.addEventListener('DOMContentLoaded', function () {
  // سنة في الفوتر
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // تبديل القائمة على الشاشات الصغيرة
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      mainNav.style.display = expanded ? '' : 'block';
    });
  }

  // روابط التواصل (مثال: افتح تطبيقات خارجية)
  const insta = document.getElementById('instagram');
  const wa = document.getElementById('whatsapp');
  if (insta) insta.addEventListener('click', function (e) {
    e.preventDefault();
    window.open('https://instagram.com/', '_blank', 'noopener');
  });
  if (wa) wa.addEventListener('click', function (e) {
    e.preventDefault();
    window.open('https://wa.me/', '_blank', 'noopener');
  });

  // نموذج الاتصال: هنا يمكنك ربطه بخدمة فعلية أو API
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // جمع البيانات
      const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim()
      };
      // تحقق بسيط
      if (!data.name || !data.email || !data.message) {
        alert('يرجى ملء جميع الحقول');
        return;
      }
      // مؤقت محاكاة إرسال
      alert('تم استلام رسالتك. شكراً!');
      form.reset();
    });
  }
});
