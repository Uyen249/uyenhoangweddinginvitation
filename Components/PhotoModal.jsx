function PhotoModal({ photoUrl, onClose, onNext, onPrev, hasNext, hasPrev }) {
  return (
    // Modal Overlay - Đặt fixed để che toàn bộ màn hình
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
      onClick={onClose} // Đóng modal khi bấm vào nền đen
    >
      
      {/* Container Ảnh - Ngăn chặn đóng modal khi bấm vào ảnh */}
      <div 
        className="relative max-w-full max-h-full"
        onClick={(e) => e.stopPropagation()} 
      >
        
        {/* Nút Đóng (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl z-10 p-2 opacity-75 hover:opacity-100 transition"
          aria-label="Close"
        >
          {/* Thay thế bằng Icon Đóng (ví dụ: FaTimes) nếu có */}
          &times; 
        </button>

        {/* Nút Prev */}
        {hasPrev && (
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 z-10"
            aria-label="Previous photo"
          >
            {/* Thay thế bằng Icon Mũi Tên Trái (ví dụ: FaChevronLeft) */}
            &#10094; 
          </button>
        )}

        {/* Ảnh Full Size */}
        <img
          src={photoUrl}
          alt="Full size wedding photo"
          className="max-w-full max-h-screen object-contain"
          // Có thể thêm hiệu ứng chuyển động nếu cần
        />

        {/* Nút Next */}
        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 z-10"
            aria-label="Next photo"
          >
            {/* Thay thế bằng Icon Mũi Tên Phải (ví dụ: FaChevronRight) */}
            &#10095; 
          </button>
        )}
      </div>
    </div>
  );
}