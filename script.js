let currentSlideIndex = 1;

// 將函式掛載到 window 物件上確保全域可用
window.currentSlide = function(n) {
    console.log('currentSlide called with:', n);
    showSlide(currentSlideIndex = n);
};

// 下一張幻燈片
window.nextSlide = function() {
    console.log('nextSlide called, current index:', currentSlideIndex);
    if (currentSlideIndex < 4) {
        showSlide(currentSlideIndex += 1);
    } else {
        console.log('Already at last slide');
    }
};

// 上一張幻燈片
window.prevSlide = function() {
    console.log('prevSlide called, current index:', currentSlideIndex);
    if (currentSlideIndex > 1) {
        showSlide(currentSlideIndex -= 1);
    } else {
        console.log('Already at first slide');
    }
};

// 顯示幻燈片函式
function showSlide(n) {
    console.log('showSlide called with:', n);
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    console.log('Found slides:', slides.length);
    console.log('Found dots:', dots.length);
    
    // 隱藏所有幻燈片
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // 移除所有點的active類別
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // 顯示當前幻燈片
    const targetSlide = document.getElementById(`slide${n}`);
    if (targetSlide) {
        targetSlide.classList.add('active');
        console.log('Activated slide:', n);
    } else {
        console.error('Could not find slide:', `slide${n}`);
    }
    
    if (dots[n-1]) {
        dots[n-1].classList.add('active');
        console.log('Activated dot:', n-1);
    }
    
    currentSlideIndex = n;
}

// 鍵盤導航
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowRight':
        case ' ':
            nextSlide();
            break;
        case 'ArrowLeft':
            prevSlide();
            break;
        case 'Home':
            currentSlide(1);
            break;
        case 'End':
            currentSlide(4);
            break;
        case 'Escape':
            currentSlide(1);
            break;
    }
});

// 觸控支援
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const threshold = 50; // 最小滑動距離
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > threshold) {
        if (swipeDistance > 0) {
            // 向右滑動 - 上一頁
            prevSlide();
        } else {
            // 向左滑動 - 下一頁
            nextSlide();
        }
    }
}

// 滑鼠滾輪支援
document.addEventListener('wheel', function(event) {
    if (event.deltaY > 0) {
        // 向下滾動 - 下一頁
        nextSlide();
    } else {
        // 向上滾動 - 上一頁
        prevSlide();
    }
    
    // 防止頁面滾動
    event.preventDefault();
}, { passive: false });

// 頁面載入完成後的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // 確保第一頁是顯示的
    showSlide(1);
    
    // 測試函式是否可用
    console.log('nextSlide function:', typeof nextSlide);
    console.log('prevSlide function:', typeof prevSlide);
    console.log('currentSlide function:', typeof currentSlide);
    
    // 添加鍵盤提示
    console.log('鍵盤快捷鍵：');
    console.log('→ 或 空白鍵：下一頁');
    console.log('←：上一頁');
    console.log('Home：回到第一頁');
    console.log('End：跳到最後一頁');
    console.log('Esc：回到第一頁');
    
    // 添加淡入動畫
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease-in';
    }, 100);
});

// 全螢幕功能
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`無法進入全螢幕模式: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// F11 快捷鍵支援全螢幕
document.addEventListener('keydown', function(event) {
    if (event.key === 'F11') {
        event.preventDefault();
        toggleFullscreen();
    }
});

// 自動播放功能（可選）
let autoPlayInterval;
let isAutoPlaying = false;

function startAutoPlay(intervalMs = 10000) {
    if (isAutoPlaying) return;
    
    isAutoPlaying = true;
    autoPlayInterval = setInterval(() => {
        if (currentSlideIndex < 4) {
            nextSlide();
        } else {
            stopAutoPlay();
        }
    }, intervalMs);
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
        isAutoPlaying = false;
    }
}

// 按 'P' 鍵開始/停止自動播放
document.addEventListener('keydown', function(event) {
    if (event.key.toLowerCase() === 'p') {
        if (isAutoPlaying) {
            stopAutoPlay();
            console.log('自動播放已停止');
        } else {
            startAutoPlay();
            console.log('自動播放已開始（10秒間隔）');
        }
    }
});

// 視窗大小改變時的處理
window.addEventListener('resize', function() {
    // 重新計算佈局（如果需要的話）
    showSlide(currentSlideIndex);
});
