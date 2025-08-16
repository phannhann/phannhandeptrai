document.addEventListener('DOMContentLoaded', () => {
  // 1. Gallery interaction với hiệu ứng fade khi đổi ảnh lớn
  const largeImg = document.getElementById('large-image');
  const thumbnails = document.querySelectorAll('.gallery-thumbnails .thumbnail');

  // Đảm bảo ảnh lớn đã được chọn
  if (thumbnails.length > 0) {
    largeImg.src = thumbnails[0].src;
    largeImg.alt = thumbnails[0].alt;
    thumbnails[0].classList.add('active'); // Đánh dấu thumbnail đầu tiên là active
  }

  // Chức năng thay đổi ảnh lớn khi nhấp vào thumbnail
  thumbnails.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      if (thumb === largeImg) return; // Nếu click ảnh đang hiện, bỏ qua

      // Thêm hiệu ứng fade cho ảnh lớn
      largeImg.style.transition = 'opacity 0.3s ease';
      largeImg.style.opacity = '0'; // Fade out ảnh hiện tại

      setTimeout(() => {
        largeImg.src = thumb.src;
        largeImg.alt = thumb.alt;
        largeImg.style.opacity = '1'; // Fade in ảnh mới
      }, 300);

      // Đánh dấu thumbnail đang chọn
      thumbnails.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });
});

  // 2. Scroll effect on header
  const header = document.querySelector('header');
  if (!header) return;

  // Hàm thay đổi class khi cuộn trang
  const onScroll = () => {
    if (window.scrollY > 50) { // Khi cuộn trang xuống hơn 50px
      header.classList.add('scrolled'); // Thêm class 'scrolled' vào header
    } else {
      header.classList.remove('scrolled'); // Xóa class 'scrolled' khi quay lại đầu trang
    }
  };

  window.addEventListener('scroll', onScroll); // Lắng nghe sự kiện cuộn trang
  onScroll(); // Gọi ngay khi tải trang để kiểm tra trạng thái ban đầu
});

  // 3. Features animation với Intersection Observer
  const features = document.querySelectorAll('.feature-item');
  if (features.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Chỉ animate 1 lần
        }
      });
    }, { threshold: 0.3 });

    features.forEach(feature => observer.observe(feature));
  } else {
    // Fallback: Nếu không hỗ trợ IntersectionObserver, hiện luôn tất cả
    features.forEach(feature => feature.classList.add('visible'));
  }
});