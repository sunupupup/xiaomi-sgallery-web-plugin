// 小米云相册快捷删除插件
// 快捷键: Delete 或 Backspace -> 触发删除 + 确认

(function () {
  'use strict';

  // 监听快捷键
  document.addEventListener('keydown', function (e) {
    // Delete 或 Backspace 键触发删除流程
    if (e.key === 'Delete' || e.key === 'Backspace') {
      // 避免在输入框中触发
      const tag = e.target.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      // 第一步: 点击右侧栏的删除按钮 (第三个 div.item-18bd6)
      const deleteBtn = document.querySelector('.rightbar-2nYn8 .delete-36iFX');
      if (deleteBtn) {
        deleteBtn.click();

        // 第二步: 等待弹窗出现, 自动点击确认删除按钮
        waitForConfirmDialog();
      } else {
        console.log('[小米云相册快捷键] 未找到删除按钮，请先选中照片');
      }
    }
  }, true);

  // 等待确认弹窗出现并自动点击删除
  function waitForConfirmDialog() {
    let attempts = 0;
    const maxAttempts = 20; // 最多等待2秒

    const timer = setInterval(function () {
      attempts++;

      // 查找弹窗中的删除确认按钮
      const modal = document.querySelector('.miui-modal-wrap.miui-darkmode-support');
      if (modal) {
        const dangerBtn = modal.querySelector('.miui-btn-danger');
        if (dangerBtn) {
          dangerBtn.click();
          clearInterval(timer);
          console.log('[小米云相册快捷键] 已确认删除');
          return;
        }
      }

      if (attempts >= maxAttempts) {
        clearInterval(timer);
        console.log('[小米云相册快捷键] 等待确认弹窗超时');
      }
    }, 100);
  }

  console.log('[小米云相册快捷键] 插件已加载 - 按 Delete/Backspace 键快速删除照片');
})();
