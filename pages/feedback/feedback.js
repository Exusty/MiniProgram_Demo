// pages/feedback/feedback.js
Page({
  data: {
    feedbackTypes: ['功能建议', '问题反馈', '内容错误', '其他'],
    selectedType: null,
    feedbackContent: '',
    contact: ''
  },

  onTypeChange(e) {
    this.setData({ selectedType: e.detail.value });
  },

  onContentInput(e) {
    this.setData({ feedbackContent: e.detail.value });
  },

  onContactInput(e) {
    this.setData({ contact: e.detail.value });
  },

  submitFeedback() {
    const { selectedType, feedbackContent, contact, feedbackTypes } = this.data;
    
    if (selectedType === null) {
      wx.showToast({
        title: '请选择反馈类型',
        icon: 'none'
      });
      return;
    }
    
    if (!feedbackContent.trim()) {
      wx.showToast({
        title: '请输入问题描述',
        icon: 'none'
      });
      return;
    }

    // 模拟提交反馈
    wx.showLoading({ title: '提交中...' });
    
    setTimeout(() => {
      wx.hideLoading();
      wx.showModal({
        title: '提交成功',
        content: '感谢您的反馈！我们会认真处理您的建议。',
        showCancel: false,
        confirmText: '确定',
        success: () => {
          // 清空表单
          this.setData({
            selectedType: null,
            feedbackContent: '',
            contact: ''
          });
        }
      });
    }, 1000);
  },

  onShareAppMessage() {
    return {
      title: '鱼子山村 - 我们期待您的反馈',
      path: '/pages/feedback/feedback'
    };
  }
});