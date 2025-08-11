// pages/service/service.js
Page({
  data: {
    currentTab: 'food',
    tabs: [
      { id: 'food', name: '美食咖啡' },
      { id: 'hotel', name: '精品民宿' },
      { id: 'venue', name: '场地预约' },
      { id: 'shop', name: '村选好物' }
    ],
    
    allServices: {
      food: [
        {
          id: 1,
          name: '山里人家农家乐',
          desc: '地道的农家菜，柴火炖菜香味浓郁',
          image: '/images/services/restaurant1.jpg',
          rating: 4.5,
          address: '鱼子山村中心',
          priceRange: '人均80元',
          tags: ['农家菜', '柴火鸡', '有机蔬菜']
        },
        {
          id: 2,
          name: '山谷咖啡厅',
          desc: '隐藏在山谷中的精品咖啡厅',
          image: '/images/services/cafe1.jpg',
          rating: 4.8,
          address: '与子·山谷内',
          priceRange: '人均50元',
          tags: ['精品咖啡', '手冲咖啡', '环境优美']
        }
      ],
      hotel: [
        {
          id: 3,
          name: '与子·山谷',
          desc: '诗意栖居的乡村民宿，感受慢生活',
          image: '/images/services/hotel1.jpg',
          rating: 4.9,
          address: '鱼子山村山谷内',
          priceRange: '580元/晚',
          tags: ['民宿', '度假', '亲子']
        }
      ],
      venue: [
        {
          id: 4,
          name: '村民大讲堂',
          desc: '可容纳100人的多功能会议厅',
          image: '/images/services/venue1.jpg',
          rating: 4.3,
          address: '村委会大楼',
          priceRange: '500元/天',
          tags: ['会议', '培训', '活动']
        }
      ],
      shop: [
        {
          id: 5,
          name: '鱼子山土特产',
          desc: '当地优质农产品和手工艺品',
          image: '/images/services/shop1.jpg',
          rating: 4.6,
          address: '村口商店',
          priceRange: '10-100元',
          tags: ['土特产', '有机农产品', '手工艺品']
        }
      ]
    },
    
    currentServices: []
  },

  onLoad(options) {
    const tab = options.tab || 'food';
    this.setData({ currentTab: tab });
    this.updateCurrentServices();
  },

  switchTab(e) {
    const tabId = e.currentTarget.dataset.id;
    this.setData({ currentTab: tabId });
    this.updateCurrentServices();
  },

  updateCurrentServices() {
    const services = this.data.allServices[this.data.currentTab] || [];
    this.setData({ currentServices: services });
  },

  onServiceTap(e) {
    const serviceId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/service/detail/detail?id=${serviceId}`
    });
  },

  onShareAppMessage() {
    return {
      title: '鱼子山村旅游服务 - 品质生活从这里开始',
      path: '/pages/service/service'
    };
  }
});