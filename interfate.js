// รอให้ DOM โหลดสมบูรณ์ก่อนทำงาน
document.addEventListener('DOMContentLoaded', () => {

    /* ===================================================
       1. Smooth Scroll เมื่อคลิกเมนู
    =================================================== */
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* ===================================================
       2. Scrollspy (ไฮไลท์เมนูตามส่วนที่กำลังดูอยู่)
    =================================================== */
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 200; // ระยะ offset

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    /* ===================================================
       3. สร้างปุ่ม Back to Top (กลับขึ้นด้านบนแบบอัตโนมัติ)
    =================================================== */
    // สร้าง Element ปุ่มด้วย JS
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.id = 'backToTopBtn';
    document.body.appendChild(backToTopBtn);

    // ตรวจสอบการ สกอร์ล เพื่อซ่อน/แสดงปุ่ม
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // เมื่อกดปุ่มให้เลื่อนขึ้นบนสุด
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});
