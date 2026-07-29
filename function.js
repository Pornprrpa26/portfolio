/* ===================================================
   ฟังก์ชัน Lightbox (สำหรับขยายดูรูปภาพ)
=================================================== */
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (lightbox && lightboxImg) {
        lightboxImg.src = imageSrc;
        lightbox.style.display = 'flex';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
    }
}

/* ===================================================
   ส่วนทำงานหลักเมื่อหน้าเว็บโหลดเสร็จ
=================================================== */
document.addEventListener('DOMContentLoaded', () => {

    /* ---------------------------------------------------
       1. Smooth Scroll เมื่อคลิกเมนู (เลื่อนนุ่มนวล + เว้นระยะ Header)
    --------------------------------------------------- */
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const header = document.querySelector('header');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // คำนวณความสูง Header เพื่อไม่ให้บังหัวข้อ
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ---------------------------------------------------
       2. Scrollspy (ไฮไลท์แถบเมนูตามส่วนที่กำลังดูอยู่)
    --------------------------------------------------- */
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 200; // ระยะล่วงหน้าสำหรับการเปลี่ยนไฮไลท์

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

    /* ---------------------------------------------------
       3. ปุ่ม Back to Top (กลับขึ้นด้านบน)
    --------------------------------------------------- */
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.id = 'backToTopBtn';
    document.body.appendChild(backToTopBtn);

    // แสดงปุ่มเมื่อเลื่อนหน้าลงมาเกิน 300px
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // กดปุ่มเลื่อนกลับขึ้นบนสุด
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});
