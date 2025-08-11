// pages/guide/guide.js
Page({
  data: {
    // 地图相关
    mapCenter: {
      longitude: 117.3242, // 鱼子山村经度
      latitude: 40.4567    // 鱼子山村纬度
    },
    mapScale: 15,
    markers: [],
    
    // 筛选相关
    currentFilter: 'all',
    currentFilterName: '全部景点',
    filterOptions: [
      { id: 'all', name: '全部', icon: '/images/icons/all.png' },
      { id: 'scenic', name: '景点', icon: '/images/icons/scenic.png' },
      { id: 'hotel', name: '住宿', icon: '/images/icons/hotel.png' },
      { id: 'restaurant', name: '餐饮', icon: '/images/icons/restaurant.png' },
      { id: 'service', name: '服务', icon: '/images/icons/service.png' },
      { id: 'culture', name: '文化', icon: '/images/icons/culture.png' }
    ],
    
    // 景点数据
    spotsList: [
      {
        id: 1,
        title: '鱼子山抗战纪念馆',
        desc: '缅怀革命先烈，传承红色精神的重要教育基地',
        image: '/images/spots/memorial.jpg',
        category: 'culture',
        categoryName: '红色文化',
        tags: ['红色教育', '历史文化', '爱国主义'],
        rating: 4.8,
        distance: 0.5,
        openTime: '08:00-17:00',
        price: '免费',
        longitude: 117.3240,
        latitude: 40.4570,
        address: '鱼子山村村北'
      },
      {
        id: 2,
        title: '京东大峡谷',
        desc: '北京东部的天然氧吧，壮美的峡谷风光',
        image: '/images/spots/canyon.jpg',
        category: 'scenic',
        categoryName: '自然景观',
        tags: ['自然风光', '避暑胜地', '徒步'],
        rating: 4.6,
        distance: 2.1,
        openTime: '07:00-18:00',
        price: '68元',
        longitude: 117.3280,
        latitude: 40.4520,
        address: '平谷区鱼子山村东'
      },
      {
        id: 3,
        title: '与子·山谷',
        desc: '诗意栖居的乡村民宿，感受慢生活的美好',
        image: '/images/spots/valley.jpg',
        category: 'hotel',
        categoryName: '精品民宿',
        tags: ['民宿', '度假', '亲子'],
        rating: 4.9,
        distance: 1.2,
        openTime: '全天',
        price: '580元/晚',
        longitude: 117.3220,
        latitude: 40.4580,
        address: '鱼子山村山谷内'
      },
      {
        id: 4,
        title: '山里人家农家乐',
        desc: '地道的农家菜，体验乡村美食文化',
        image: '/images/spots/farmhouse.jpg',
        category: 'restaurant',
        categoryName: '农家餐饮',
        tags: ['农家菜', '柴火鸡', '有机蔬菜'],
        rating: 4.5,
        distance: 0.8,
        openTime: '10:00-21:00',
        price: '人均80元',
        longitude: 117.3250,
        latitude: 40.4560,
        address: '鱼子山村中心'
      }
    ],
    filteredSpots: [],
    
    // 视图模式
    viewMode: 'list', // list | grid
    
    // 搜索相关
    showSearch: false,
    searchKeyword: '',
    searchHistory: []
  },

  onLoad(options) {
    console.log('村庄导览页面加载');
    this.initPageData();
    this.loadUserLocation();
  },

  onShow() {
    this.updateFilteredSpots();
  },

  onReady() {
    // 获取地图上下文
    this.mapCtx = wx.createMapContext('village-map');
  },

  // 初始化页面数据
  initPageData() {
    this.setData({
      filteredSpots: this.data.spotsList
    });
    this.generateMapMarkers();
  },

  // 生成地图标记点
  generateMapMarkers() {
    const markers = this.data.spotsList.map((spot, index) => {
      let iconPath = '/images/markers/default.png';
      
      // 根据分类设置不同的标记图标
      switch(spot.category) {
        case 'culture':
          iconPath = '/images/markers/culture.png';
          break;
        case 'scenic':
          iconPath = '/images/markers/scenic.png';
          break;
        case 'hotel':
          iconPath = '/images/markers/hotel.png';
          break;
        case 'restaurant':
          iconPath = '/images/markers/restaurant.png';
          break;
        default:
          iconPath = '/images/markers/default.png';
      }
      
      return {
        id: spot.id,
        latitude: spot.latitude,
        longitude: spot.longitude,
        iconPath: iconPath,
        width: 40,
        height: 40,
        title: spot.title,
        callout: {
          content: spot.title,
          color: '#000',
          fontSize: 14,
          borderRadius: 8,
          bgColor: '#fff',
          padding: 8,
          display: 'ALWAYS'
        }
      };
    });
    
    this.setData({ markers });
  },

  // 获取用户位置
  loadUserLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log('用户位置:', res);
        // 计算景点距离
        this.calculateDistances(res.latitude, res.longitude);
      },
      fail: (err) => {
        console.error('获取位置失败:', err);
        wx.showToast({
          title: '获取位置失败',
          icon: 'none'
        });
      }
    });
  },

  // 计算景点距离
  calculateDistances(userLat, userLng) {
    const spotsList = this.data.spotsList.map(spot => {
      const distance = this.getDistance(userLat, userLng, spot.latitude, spot.longitude);
      return {
        ...spot,
        distance: distance.toFixed(1)
      };
    });
    
    this.setData({ spotsList });
    this.updateFilteredSpots();
  },

  // 计算两点间距离（公里）
  getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // 地球半径（公里）
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  },

  // 地图标记点击事件
  onMarkerTap(e) {
    const markerId = e.detail.markerId;
    console.log('点击标记:', markerId);
    
    // 跳转到景点详情页
    wx.navigateTo({
      url: `/pages/guide/detail/detail?id=${markerId}`
    });
  },

  // 地图区域变化事件
  onRegionChange(e) {
    if (e.type === 'end') {
      console.log('地图区域变化:', e.detail);
    }
  },

  // 筛选条件改变
  onFilterChange(e) {
    const filterId = e.currentTarget.dataset.id;
    const filterName = this.data.filterOptions.find(item => item.id === filterId)?.name || '全部景点';
    
    this.setData({
      currentFilter: filterId,
      currentFilterName: filterName
    });
    
    this.updateFilteredSpots();
  },

  // 更新筛选后的景点列表
  updateFilteredSpots() {
    let filteredSpots = this.data.spotsList;
    
    if (this.data.currentFilter !== 'all') {
      filteredSpots = this.data.spotsList.filter(spot => 
        spot.category === this.data.currentFilter
      );
    }
    
    // 按距离排序
    filteredSpots.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    
    this.setData({ filteredSpots });
    
    // 更新地图标记点
    this.updateMapMarkers();
  },

  // 更新地图标记点
  updateMapMarkers() {
    const visibleSpotIds = this.data.filteredSpots.map(spot => spot.id);
    const markers = this.data.markers.map(marker => ({
      ...marker,
      iconPath: visibleSpotIds.includes(marker.id) ? marker.iconPath : '/images/markers/gray.png'
    }));
    
    this.setData({ markers });
  },

  // 切换视图模式
  switchViewMode(e) {
    const mode = e.currentTarget.dataset.mode;
    this.setData({ viewMode: mode });
  },

  // 景点项点击事件
  onSpotTap(e) {
    const spotId = e.currentTarget.dataset.id;
    console.log('点击景点:', spotId);
    
    wx.navigateTo({
      url: `/pages/guide/detail/detail?id=${spotId}`
    });
  },

  // 地图控制 - 定位到用户
  centerToUser() {
    this.mapCtx.moveToLocation();
  },

  // 地图控制 - 放大
  zoomIn() {
    const newScale = Math.min(this.data.mapScale + 2, 20);
    this.setData({ mapScale: newScale });
  },

  // 地图控制 - 缩小
  zoomOut() {
    const newScale = Math.max(this.data.mapScale - 2, 5);
    this.setData({ mapScale: newScale });
  },

  // 显示搜索弹窗
  showSearchDialog() {
    this.setData({ showSearch: true });
  },

  // 隐藏搜索弹窗
  hideSearchDialog() {
    this.setData({ showSearch: false });
  },

  // 阻止事件冒泡
  stopPropagation() {},

  // 搜索输入
  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value });
  },

  // 执行搜索
  doSearch() {
    const keyword = this.data.searchKeyword.trim();
    if (!keyword) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      });
      return;
    }

    // 搜索景点
    const filteredSpots = this.data.spotsList.filter(spot => 
      spot.title.includes(keyword) || 
      spot.desc.includes(keyword) ||
      spot.tags.some(tag => tag.includes(keyword))
    );

    this.setData({ 
      filteredSpots,
      showSearch: false,
      currentFilter: 'all',
      currentFilterName: `搜索"${keyword}"`
    });

    // 保存搜索历史
    this.saveSearchHistory(keyword);
  },

  // 保存搜索历史
  saveSearchHistory(keyword) {
    let history = this.data.searchHistory;
    
    // 去重
    history = history.filter(item => item !== keyword);
    // 添加到最前面
    history.unshift(keyword);
    // 最多保留10条
    history = history.slice(0, 10);
    
    this.setData({ searchHistory: history });
    
    // 保存到本地存储
    wx.setStorageSync('search_history', history);
  },

  // 选择搜索历史
  selectSearchHistory(e) {
    const keyword = e.currentTarget.dataset.keyword;
    this.setData({ searchKeyword: keyword });
    this.doSearch();
  },

  // 显示路线规划
  showRouteDialog() {
    wx.showToast({
      title: '路线规划功能开发中',
      icon: 'none'
    });
  },

  // 显示图层选择
  showLayersDialog() {
    wx.showToast({
      title: '图层功能开发中',
      icon: 'none'
    });
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadUserLocation();
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 1000);
  },

  // 分享功能
  onShareAppMessage() {
    return {
      title: '鱼子山村导览 - 发现身边的美景',
      desc: '查看景点分布，规划完美路线',
      path: '/pages/guide/guide',
      imageUrl: '/images/share/share-guide.jpg'
    };
  }
}); 