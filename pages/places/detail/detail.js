// pages/places/detail/detail.js
Page({
  data: {
    placeId: '',
    placeInfo: {},
    placesData: {
      'canyon': {
        id: 'canyon',
        name: '京东大峡谷',
        subtitle: '天然氧吧，壮美峡谷风光',
        images: [
          '/images/places/canyon/canyon1.jpg',
          '/images/places/canyon/canyon2.jpg',
          '/images/places/canyon/canyon3.jpg'
        ],
        description: '京东大峡谷位于鱼子山村东部，是一处集自然风光与地质奇观于一体的旅游胜地。峡谷全长约3公里，两岸悬崖峭壁，谷底溪水潺潺，形成了独特的自然生态环境。',
        features: [
          '天然氧吧，负氧离子含量极高',
          '奇峰异石，地质构造独特',
          '四季景色各异，春花夏绿秋叶冬雪',
          '多种珍稀动植物栖息地'
        ],
        openTime: '8:00-18:00',
        address: '鱼子山村东部3公里处',
        phone: '010-12345678',
        ticketPrice: '成人票：50元/人，学生票：25元/人',
        hasVideo: true,
        videoUrl: '/videos/canyon-intro.mp4'
      },
      'power-station': {
        id: 'power-station',
        name: '历史电站',
        subtitle: '工业遗产，见证时代变迁',
        images: [
          '/images/places/power-station/station1.jpg',
          '/images/places/power-station/station2.jpg',
          '/images/places/power-station/station3.jpg'
        ],
        description: '建于1950年代的水力发电站，是新中国成立初期重要的工业建设项目之一。经过修缮改造，现已成为展示当地工业发展历史的文化遗产保护区。',
        features: [
          '保存完整的50年代工业设备',
          '展示水力发电原理和历史',
          '工业遗产保护典型案例',
          '红色工业文化教育基地'
        ],
        openTime: '9:00-17:00（周一闭馆）',
        address: '鱼子山村北部河谷地带',
        phone: '010-12345679',
        ticketPrice: '免费参观（需提前预约）',
        hasVideo: true,
        videoUrl: '/videos/power-station-history.mp4'
      },
      'art-gallery': {
        id: 'art-gallery',
        name: '乡村美术馆',
        subtitle: '艺术与自然的完美融合',
        images: [
          '/images/places/art-gallery/gallery1.jpg',
          '/images/places/art-gallery/gallery2.jpg',
          '/images/places/art-gallery/gallery3.jpg'
        ],
        description: '依山而建的现代化美术馆，展示本土艺术家作品及乡村文化主题展览。建筑设计融合传统与现代元素，与周围自然环境和谐统一。',
        features: [
          '本土艺术家作品常设展',
          '乡村文化主题特展',
          '艺术创作体验工坊',
          '山景观景台与咖啡厅'
        ],
        openTime: '10:00-18:00（周二闭馆）',
        address: '鱼子山村文化艺术区',
        phone: '010-12345680',
        ticketPrice: '成人票：30元/人，学生票：15元/人',
        hasVideo: true,
        videoUrl: '/videos/art-gallery-tour.mp4'
      },
      'lecture-hall': {
        id: 'lecture-hall',
        name: '文化大讲堂',
        subtitle: '传承文化，启迪智慧',
        images: [
          '/images/places/lecture-hall/hall1.jpg',
          '/images/places/lecture-hall/hall2.jpg',
          '/images/places/lecture-hall/hall3.jpg'
        ],
        description: '可容纳300人的多功能文化讲堂，定期举办文化讲座、学术交流、艺术表演等活动。采用先进的音响灯光设备，为各类文化活动提供专业场地。',
        features: [
          '300人座位的现代化礼堂',
          '专业音响灯光设备',
          '多媒体投影系统',
          '无障碍通道设计'
        ],
        openTime: '根据活动安排开放',
        address: '鱼子山村文化中心',
        phone: '010-12345681',
        ticketPrice: '活动票价根据具体安排',
        hasVideo: true,
        videoUrl: '/videos/lecture-hall-intro.mp4'
      },
      'restaurant': {
        id: 'restaurant',
        name: '山谷餐厅',
        subtitle: '品味地道乡村美食',
        images: [
          '/images/places/restaurant/restaurant1.jpg',
          '/images/places/restaurant/restaurant2.jpg',
          '/images/places/restaurant/restaurant3.jpg'
        ],
        description: '以本地食材为主的特色餐厅，提供正宗的山村农家菜。餐厅环境优雅，可同时容纳100人用餐，是体验当地饮食文化的最佳选择。',
        features: [
          '本地有机食材制作',
          '传统农家菜系',
          '山景用餐环境',
          '私人定制菜单'
        ],
        openTime: '11:00-14:00, 17:00-21:00',
        address: '鱼子山村美食街',
        phone: '010-12345682',
        ticketPrice: '人均消费：80-120元',
        hasVideo: true,
        videoUrl: '/videos/restaurant-food.mp4'
      },
      'creative-studio': {
        id: 'creative-studio',
        name: '创造力教室',
        subtitle: '激发创意，释放想象',
        images: [
          '/images/places/creative-studio/studio1.jpg',
          '/images/places/creative-studio/studio2.jpg',
          '/images/places/creative-studio/studio3.jpg'
        ],
        description: '面向儿童和青少年的创意空间，提供手工制作、绘画、陶艺、科学实验等多种创作体验。配备专业导师，激发孩子们的创造力和想象力。',
        features: [
          '多种手工创作项目',
          '专业导师指导',
          '亲子互动体验',
          '作品展示与收藏'
        ],
        openTime: '9:00-17:00',
        address: '鱼子山村教育体验区',
        phone: '010-12345683',
        ticketPrice: '体验课程：50-100元/次',
        hasVideo: true,
        videoUrl: '/videos/creative-studio-activities.mp4'
      }
    }
  },

  onLoad(options) {
    const placeId = options.id;
    console.log('场所详情页加载，ID:', placeId);
    
    if (placeId && this.data.placesData[placeId]) {
      this.setData({
        placeId: placeId,
        placeInfo: this.data.placesData[placeId]
      });
      
      // 设置页面标题
      wx.setNavigationBarTitle({
        title: this.data.placesData[placeId].name
      });
    } else {
      wx.showToast({
        title: '场所信息未找到',
        icon: 'none'
      });
    }
  },

  onShow() {
    console.log('场所详情页显示');
  },

  // 图片预览
  previewImages(e) {
    const current = e.currentTarget.dataset.src;
    const urls = this.data.placeInfo.images;
    
    wx.previewImage({
      current: current,
      urls: urls
    });
  },

  // 播放介绍视频
  playVideo() {
    if (this.data.placeInfo.hasVideo) {
      wx.showToast({
        title: '正在加载视频...',
        icon: 'loading'
      });
      
      // 这里可以实现视频播放逻辑
      // 比如跳转到视频播放页面或使用视频组件
      setTimeout(() => {
        wx.showToast({
          title: '视频功能开发中',
          icon: 'none'
        });
      }, 1000);
    }
  },

  // 电话联系
  makePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: this.data.placeInfo.phone
    });
  },

  // 导航到场所
  openLocation() {
    wx.showToast({
      title: '正在定位...',
      icon: 'loading'
    });
    
    // 这里可以集成真实的地图导航
    setTimeout(() => {
      wx.showToast({
        title: '导航功能开发中',
        icon: 'none'
      });
    }, 1000);
  },

  // 分享场所
  onShareAppMessage() {
    const placeInfo = this.data.placeInfo;
    return {
      title: placeInfo.name + ' - ' + placeInfo.subtitle,
      desc: placeInfo.description.substring(0, 50) + '...',
      path: `/pages/places/detail/detail?id=${this.data.placeId}`,
      imageUrl: placeInfo.images[0]
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    const placeInfo = this.data.placeInfo;
    return {
      title: placeInfo.name + ' - ' + placeInfo.subtitle,
      imageUrl: placeInfo.images[0]
    };
  }
});
