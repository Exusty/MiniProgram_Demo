// pages/activity/activity.js
Page({
  data: {
    // 分类数据
    categories: [
      { id: 'all', name: '全部', icon: '/images/icons/all.png', count: 0 },
      { id: 'culture', name: '文化节庆', icon: '/images/icons/culture.png', count: 0 },
      { id: 'study', name: '研学项目', icon: '/images/icons/study.png', count: 0 },
      { id: 'outdoor', name: '户外探险', icon: '/images/icons/outdoor.png', count: 0 },
      { id: 'family', name: '亲子活动', icon: '/images/icons/family.png', count: 0 }
    ],
    currentCategory: 'all',
    
    // 活动数据
    activitiesList: [
      {
        id: 1,
        title: '红色研学一日游',
        desc: '走进鱼子山抗战纪念馆，聆听革命故事，传承红色精神',
        image: '/images/activities/red-study.jpg',
        category: 'study',
        categoryName: '研学项目',
        price: 168,
        duration: '1天',
        location: '鱼子山村',
        participants: 256,
        rating: 4.8,
        nextDate: '1月20日',
        status: 'available',
        statusText: '可报名',
        isHot: true,
        tags: ['红色教育', '历史文化', '团队建设']
      },
      {
        id: 2,
        title: '亲子露营体验',
        desc: '在山谷中搭帐篷，观星空，享受亲子时光',
        image: '/images/activities/camping.jpg',
        category: 'family',
        categoryName: '亲子活动',
        price: 298,
        duration: '2天1夜',
        location: '与子·山谷',
        participants: 128,
        rating: 4.9,
        nextDate: '1月25日',
        status: 'available',
        statusText: '可报名',
        isHot: false,
        tags: ['露营', '户外', '亲子互动']
      },
      {
        id: 3,
        title: '农家乐采摘',
        desc: '体验农耕乐趣，品尝新鲜果蔬，感受田园生活',
        image: '/images/activities/picking.jpg',
        category: 'culture',
        categoryName: '文化节庆',
        price: 88,
        duration: '半天',
        location: '鱼子山果园',
        participants: 89,
        rating: 4.5,
        nextDate: '每周末',
        status: 'available',
        statusText: '可报名',
        isHot: false,
        tags: ['采摘', '农家乐', '有机食品']
      },
      {
        id: 4,
        title: '峡谷徒步探险',
        desc: '挑战京东大峡谷徒步路线，欣赏壮美自然风光',
        image: '/images/activities/hiking.jpg',
        category: 'outdoor',
        categoryName: '户外探险',
        price: 128,
        duration: '4小时',
        location: '京东大峡谷',
        participants: 67,
        rating: 4.6,
        nextDate: '1月22日',
        status: 'full',
        statusText: '已满员',
        isHot: false,
        tags: ['徒步', '探险', '自然风光']
      },
      {
        id: 5,
        title: '传统手工艺体验',
        desc: '学习剪纸、编织等传统手工艺，感受非遗文化魅力',
        image: '/images/activities/handicraft.jpg',
        category: 'culture',
        categoryName: '文化节庆',
        price: 98,
        duration: '2小时',
        location: '村文化中心',
        participants: 45,
        rating: 4.7,
        nextDate: '1月28日',
        status: 'available',
        statusText: '可报名',
        isHot: false,
        tags: ['手工艺', '非遗', '文化传承']
      }
    ],
    filteredActivities: [],
    
    // 筛选和排序
    currentSort: 'default',
    currentSortName: '综合排序',
    sortOptions: [
      { id: 'default', name: '综合排序' },
      { id: 'price_low', name: '价格从低到高' },
      { id: 'price_high', name: '价格从高到低' },
      { id: 'rating', name: '评分最高' },
      { id: 'participants', name: '人气最高' },
      { id: 'newest', name: '最新发布' }
    ],
    
    // 筛选弹窗
    showFilterModal: false,
    showSortModal: false,
    hasActiveFilters: false,
    
    // 筛选条件
    selectedPriceRange: '',
    selectedTimeRange: '',
    selectedTags: [],
    
    priceRanges: [
      { id: '', label: '不限' },
      { id: 'low', label: '100元以下' },
      { id: 'mid', label: '100-200元' },
      { id: 'high', label: '200元以上' }
    ],
    
    timeRanges: [
      { id: '', label: '不限' },
      { id: 'today', label: '今天' },
      { id: 'tomorrow', label: '明天' },
      { id: 'weekend', label: '本周末' },
      { id: 'week', label: '本周' }
    ],
    
    allTags: ['红色教育', '亲子互动', '户外运动', '文化体验', '自然风光', '团队建设', '手工艺', '美食品尝']
  },

  onLoad(options) {
    console.log('特色活动页面加载');
    this.initPageData();
  },

  onShow() {
    this.updateFilteredActivities();
  },

  // 初始化页面数据
  initPageData() {
    this.updateCategoryCounts();
    this.setData({
      filteredActivities: this.data.activitiesList
    });
  },

  // 更新分类计数
  updateCategoryCounts() {
    const categories = this.data.categories.map(category => {
      if (category.id === 'all') {
        category.count = this.data.activitiesList.length;
      } else {
        category.count = this.data.activitiesList.filter(activity => 
          activity.category === category.id
        ).length;
      }
      return category;
    });
    
    this.setData({ categories });
  },

  // 分类切换
  onCategoryChange(e) {
    const categoryId = e.currentTarget.dataset.id;
    this.setData({ currentCategory: categoryId });
    this.updateFilteredActivities();
  },

  // 更新筛选后的活动列表
  updateFilteredActivities() {
    let filtered = this.data.activitiesList;
    
    // 按分类筛选
    if (this.data.currentCategory !== 'all') {
      filtered = filtered.filter(activity => 
        activity.category === this.data.currentCategory
      );
    }
    
    // 按价格筛选
    if (this.data.selectedPriceRange) {
      filtered = filtered.filter(activity => {
        switch (this.data.selectedPriceRange) {
          case 'low':
            return activity.price < 100;
          case 'mid':
            return activity.price >= 100 && activity.price <= 200;
          case 'high':
            return activity.price > 200;
          default:
            return true;
        }
      });
    }
    
    // 按标签筛选
    if (this.data.selectedTags.length > 0) {
      filtered = filtered.filter(activity => 
        this.data.selectedTags.some(tag => activity.tags.includes(tag))
      );
    }
    
    // 排序
    filtered = this.sortActivities(filtered);
    
    this.setData({ 
      filteredActivities: filtered,
      hasActiveFilters: this.data.selectedPriceRange || 
                       this.data.selectedTimeRange || 
                       this.data.selectedTags.length > 0
    });
  },

  // 活动排序
  sortActivities(activities) {
    const sortedActivities = [...activities];
    
    switch (this.data.currentSort) {
      case 'price_low':
        return sortedActivities.sort((a, b) => a.price - b.price);
      case 'price_high':
        return sortedActivities.sort((a, b) => b.price - a.price);
      case 'rating':
        return sortedActivities.sort((a, b) => b.rating - a.rating);
      case 'participants':
        return sortedActivities.sort((a, b) => b.participants - a.participants);
      case 'newest':
        return sortedActivities.sort((a, b) => b.id - a.id);
      default:
        // 综合排序：热门活动在前，然后按评分排序
        return sortedActivities.sort((a, b) => {
          if (a.isHot && !b.isHot) return -1;
          if (!a.isHot && b.isHot) return 1;
          return b.rating - a.rating;
        });
    }
  },

  // 活动项点击
  onActivityTap(e) {
    const activityId = e.currentTarget.dataset.id;
    console.log('点击活动:', activityId);
    
    wx.navigateTo({
      url: `/pages/activity/detail/detail?id=${activityId}`
    });
  },

  // 显示筛选弹窗
  showFilterModal() {
    this.setData({ showFilterModal: true });
  },

  // 隐藏筛选弹窗
  hideFilterModal() {
    this.setData({ showFilterModal: false });
  },

  // 显示排序弹窗
  showSortModal() {
    this.setData({ showSortModal: true });
  },

  // 隐藏排序弹窗
  hideSortModal() {
    this.setData({ showSortModal: false });
  },

  // 阻止事件冒泡
  stopPropagation() {},

  // 选择价格范围
  selectPriceRange(e) {
    const rangeId = e.currentTarget.dataset.id;
    this.setData({ selectedPriceRange: rangeId });
  },

  // 选择时间范围
  selectTimeRange(e) {
    const rangeId = e.currentTarget.dataset.id;
    this.setData({ selectedTimeRange: rangeId });
  },

  // 切换标签选择
  toggleTag(e) {
    const tag = e.currentTarget.dataset.tag;
    let selectedTags = [...this.data.selectedTags];
    
    if (selectedTags.includes(tag)) {
      selectedTags = selectedTags.filter(t => t !== tag);
    } else {
      selectedTags.push(tag);
    }
    
    this.setData({ selectedTags });
  },

  // 应用筛选
  applyFilters() {
    this.setData({ showFilterModal: false });
    this.updateFilteredActivities();
  },

  // 重置筛选
  resetFilters() {
    this.setData({
      selectedPriceRange: '',
      selectedTimeRange: '',
      selectedTags: [],
      currentCategory: 'all',
      showFilterModal: false
    });
    this.updateFilteredActivities();
  },

  // 选择排序方式
  selectSort(e) {
    const sortId = e.currentTarget.dataset.id;
    const sortName = this.data.sortOptions.find(item => item.id === sortId)?.name || '综合排序';
    
    this.setData({
      currentSort: sortId,
      currentSortName: sortName,
      showSortModal: false
    });
    
    this.updateFilteredActivities();
  },

  // 下拉刷新
  onPullDownRefresh() {
    console.log('下拉刷新活动列表');
    // 模拟刷新数据
    setTimeout(() => {
      this.updateFilteredActivities();
      wx.stopPullDownRefresh();
    }, 1000);
  },

  // 上拉加载更多
  onReachBottom() {
    console.log('加载更多活动');
    // 这里可以实现分页加载
    wx.showToast({
      title: '暂无更多数据',
      icon: 'none'
    });
  },

  // 分享功能
  onShareAppMessage() {
    return {
      title: '鱼子山村特色活动 - 丰富多彩等你来',
      desc: '红色研学、亲子露营、户外探险，精彩活动任你选择',
      path: '/pages/activity/activity',
      imageUrl: '/images/share/share-activity.jpg'
    };
  }
}); 