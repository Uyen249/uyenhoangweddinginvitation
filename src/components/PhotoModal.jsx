import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Dùng export default ngay tại chỗ khai báo function
export default function PhotoModal({ photoUrl, onClose, onNext, onPrev, hasNext, hasPrev }) {
    
    // Thêm useEffect để xử lý phím bấm (tăng trải nghiệm)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowRight' && hasNext) {
                onNext();
            } else if (e.key === 'ArrowLeft' && hasPrev) {
                onPrev();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, onNext, onPrev, hasPrev, hasNext]);

    return (
        // Modal Overlay - Đặt z-index cao hơn (z-[9999] an toàn hơn z-50)
        <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-95 p-4"
            onClick={onClose}
        >
            
            {/* Container Ảnh - Ngăn chặn đóng modal khi bấm vào ảnh */}
            <div 
                className="relative max-w-full max-h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()} 
            >
                
                {/* Nút Đóng (X) - Dùng icon X của lucide-react */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white text-3xl z-10 p-3 rounded-full bg-gray-900/50 hover:bg-gray-800 transition-all"
                    aria-label="Đóng"
                >
                    <X className="w-8 h-8" /> 
                </button>

                {/* Nút Prev - Dùng icon ChevronLeft */}
                {hasPrev && (
                    <button
                        onClick={onPrev}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl p-3 rounded-full bg-gray-900/50 hover:bg-gray-800 transition-all z-10"
                        aria-label="Ảnh trước"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>
                )}

                {/* Ảnh Full Size */}
                <img
                    src={photoUrl}
                    alt="Full size wedding photo"
                    // Thay max-h-screen thành max-h-[90vh] để có khoảng cách
                    className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl transition-transform duration-300" 
                />

                {/* Nút Next - Dùng icon ChevronRight */}
                {hasNext && (
                    <button
                        onClick={onNext}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl p-3 rounded-full bg-gray-900/50 hover:bg-gray-800 transition-all z-10"
                        aria-label="Ảnh tiếp theo"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>
                )}
            </div>
        </div>
    );
}


