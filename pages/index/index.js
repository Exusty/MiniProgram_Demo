// pages/index/index.js
Page({
  data: {
    // 轮播图数据
    bannerList: [
      {
        id: 1,
        image: '/images/banner/canyon.jpg',
        title: '京东大峡谷',
        desc: '天然氧吧，壮美峡谷风光',
        link: '/pages/places/detail/detail?id=canyon'
      },
      {
        id: 2,
        image: '/images/banner/power-station.jpg',
        title: '电站美术馆',
        desc: '工业遗产，见证时代变迁',
        link: '/pages/places/detail/detail?id=power-station'
      },
      {
        id: 3,
        image: '/images/banner/art-gallery.jpg',
        title: '大讲堂',
        desc: '艺术与自然的完美融合',
        link: '/pages/places/detail/detail?id=art-gallery'
      },
      {
        id: 4,
        image: '/images/banner/lecture-hall.jpg',
        title: '文化大讲堂',
        desc: '传承文化，启迪智慧',
        link: '/pages/places/detail/detail?id=lecture-hall'
      },
      {
        id: 5,
        image: '/images/banner/restaurant.jpg',
        title: '山谷餐厅',
        desc: '品味地道乡村美食',
        link: '/pages/places/detail/detail?id=restaurant'
      },
      {
        id: 6,
        image: '/images/banner/creative-studio.jpg',
        title: '创造力教室',
        desc: '激发创意，释放想象',
        link: '/pages/places/detail/detail?id=creative-studio'
      }
    ],
    
    // 快捷入口数据
    quickEntries: [
      {
        id: 1,
        title: '与子·山谷',
        icon: '/images/icons/valley.png',
        path: '/pages/service/detail/detail?type=valley'
      },
      {
        id: 2,
        title: '红色记忆',
        icon: '/images/icons/red-memory.png',
        path: '/pages/culture/memory/memory'
      },
      {
        id: 3,
        title: '美食&住宿',
        icon: '/images/icons/food-hotel.png',
        path: '/pages/service/service?tab=food'
      },
      {
        id: 4,
        title: '村选好物',
        icon: '/images/icons/shop.png',
        path: '/pages/service/service?tab=shop'
      },
      {
        id: 5,
        title: '场地预约',
        icon: '/images/icons/venue.png',
        path: '/pages/service/service?tab=venue'
      },
      {
        id: 6,
        title: '研学体验',
        icon: '/images/icons/study.png',
        path: '/pages/activity/activity?category=study'
      }
    ],
    

    
    // 热门景点数据
    hotspots: [
      {
        id: 1,
        title: '鱼子山抗战纪念馆',
        desc: '缅怀革命先烈，传承红色精神',
        image: '/images/spots/spot1.jpg',
        tags: ['红色教育', '历史文化']
      },
      {
        id: 2,
        title: '京东大峡谷',
        desc: '北京东部的天然氧吧',
        image: '/images/spots/spot2.jpg',
        tags: ['自然风光', '避暑胜地']
      }
    ],
    
    // 特色美食数据
    specialFoods: [
      {
        id: 1,
        name: '农家炖菜',
        restaurant: '山里人家',
        image: '/images/foods/food1.jpg'
      },
      {
        id: 2,
        name: '烤全羊',
        restaurant: '草原人家',
        image: '/images/foods/food2.jpg'
      },
      {
        id: 3,
        name: '山野菜',
        restaurant: '绿色餐厅',
        image: '/images/foods/food3.jpg'
      },
      {
        id: 4,
        name: '柴鸡蛋',
        restaurant: '农家院',
        image: '/images/foods/food4.jpg'
      }
    ],
    
    // 村庄动态数据
    newsList: [
      {
        id: 1,
        title: '鱼子山村获评"美丽乡村示范村"',
        summary: '我村在美丽乡村建设中成绩突出，获得市级表彰...',
        time: '2024-01-15',
        views: 1580,
        image: '/images/news/news1.jpg'
      },
      {
        id: 2,
        title: '春季踏青活动即将开启',
        summary: '阳春三月，万物复苏，村里的踏青活动即将开始...',
        time: '2024-01-10',
        views: 950
      }
    ]
  },

  onLoad() {
    console.log('首页加载');
    this.loadPageData();
  },

  onShow() {
    console.log('首页显示');
  },

  onPullDownRefresh() {
    console.log('下拉刷新');
    this.loadPageData();
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 1000);
  },

  // 加载页面数据
  loadPageData() {
    wx.showLoading({ title: '加载中...' });
    
    // 模拟API调用
    setTimeout(() => {
      // 这里可以调用真实的API接口
      // this.loadBannerData();
      // this.loadQuickEntries();
      
      wx.hideLoading();
    }, 1000);
  },



  // 轮播图点击事件
  onBannerTap(e) {
    const item = e.currentTarget.dataset.item;
    console.log('点击轮播图:', item);
    
    if (item.link) {
      wx.navigateTo({
        url: item.link
      });
    }
  },

  // 快捷入口点击事件
  onQuickEntryTap(e) {
    const path = e.currentTarget.dataset.path;
    console.log('点击快捷入口:', path);
    
    wx.navigateTo({
      url: path
    });
  },



  // 热门景点点击事件
  onHotspotTap(e) {
    const id = e.currentTarget.dataset.id;
    console.log('点击热门景点:', id);
    
    wx.navigateTo({
      url: `/pages/guide/detail/detail?id=${id}`
    });
  },

  // 特色美食点击事件
  onFoodTap(e) {
    const id = e.currentTarget.dataset.id;
    console.log('点击特色美食:', id);
    
    wx.navigateTo({
      url: `/pages/service/detail/detail?id=${id}&type=food`
    });
  },

  // 村庄动态点击事件
  onNewsTap(e) {
    const id = e.currentTarget.dataset.id;
    console.log('点击村庄动态:', id);
    
    wx.navigateTo({
      url: `/pages/news/detail/detail?id=${id}`
    });
  },



  // 导航到导览页面
  navigateToGuide() {
    wx.switchTab({
      url: '/pages/guide/guide'
    });
  },

  // 导航到美食页面
  navigateToFood() {
    wx.navigateTo({
      url: '/pages/service/service?tab=food'
    });
  },

  // 打开客服
  openCustomerService() {
    console.log('打开客服');
    wx.navigateTo({
      url: '/pages/chat/chat'
    });
  },

  // 分享给朋友
  onShareAppMessage() {
    return {
      title: '鱼子山村 - 智慧文旅小程序',
      desc: '探寻红色文化，体验乡村美景',
      path: '/pages/index/index',
      imageUrl: '/images/share/share-index.jpg'
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '鱼子山村 - 智慧文旅小程序',
      imageUrl: '/images/share/share-index.jpg'
    };
  }
}); 