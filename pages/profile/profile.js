// pages/profile/profile.js
Page({
  data: {
    userInfo: {}
  },

  onLoad() {
    this.loadUserInfo();
  },

  onShow() {
    this.loadUserInfo();
  },

  loadUserInfo() {
    // 从本地存储获取用户信息
    const userInfo = wx.getStorageSync('userInfo') || {};
    this.setData({ userInfo });
  },

  handleLogin() {
    if (this.data.userInfo.nickname) {
      // 已登录，显示用户信息
      wx.showToast({
        title: '您已登录',
        icon: 'none'
      });
      return;
    }

    // 获取用户信息授权
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        console.log('获取用户信息成功:', res);
        const userInfo = res.userInfo;
        
        // 保存用户信息到本地存储
        wx.setStorageSync('userInfo', userInfo);
        
        this.setData({ userInfo });
        
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        });
      },
      fail: (err) => {
        console.error('获取用户信息失败:', err);
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        });
      }
    });
  },

  navigateTo(e) {
    const url = e.currentTarget.dataset.url;
    if (!url) return;
    
    // 检查页面是否存在
    const availablePages = ['/pages/feedback/feedback', '/pages/chat/chat'];
    
    if (availablePages.includes(url)) {
      wx.navigateTo({ url });
    } else {
      wx.showToast({
        title: '功能开发中',
        icon: 'none'
      });
    }
  },

  showAbout() {
    wx.showModal({
      title: '关于鱼子山村',
      content: '鱼子山村智慧文旅小程序\n版本：1.0.0\n\n探寻红色文化，体验乡村美景\n感受智慧旅游的全新体验',
      showCancel: false,
      confirmText: '知道了'
    });
  },

  onShareAppMessage() {
    return {
      title: '鱼子山村 - 智慧文旅小程序',
      path: '/pages/index/index'
    };
  }
});