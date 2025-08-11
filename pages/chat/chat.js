// pages/chat/chat.js
Page({
  data: {
    messages: [
      {
        id: 1,
        type: 'bot',
        content: '您好！我是鱼子山村智能客服，有什么可以帮助您的吗？',
        time: '10:00'
      }
    ],
    quickQuestions: [
      '开放时间',
      '门票价格', 
      '交通路线',
      '预订咨询'
    ],
    inputText: ''
  },

  onInput(e) {
    this.setData({ inputText: e.detail.value });
  },

  sendMessage() {
    const content = this.data.inputText.trim();
    if (!content) return;

    // 添加用户消息
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: content,
      time: this.getCurrentTime()
    };

    this.setData({
      messages: [...this.data.messages, userMessage],
      inputText: ''
    });

    // 模拟AI回复
    setTimeout(() => {
      this.addBotReply(content);
    }, 1000);
  },

  sendQuickQuestion(e) {
    const question = e.currentTarget.dataset.question;
    this.setData({ inputText: question });
    this.sendMessage();
  },

  addBotReply(userInput) {
    let reply = '感谢您的咨询，我会尽快为您解答！';
    
    if (userInput.includes('时间')) {
      reply = '景区开放时间：\n鱼子山抗战纪念馆：8:00-17:00\n京东大峡谷：7:00-18:00';
    } else if (userInput.includes('价格') || userInput.includes('门票')) {
      reply = '门票价格：\n鱼子山抗战纪念馆：免费\n京东大峡谷：68元/人';
    } else if (userInput.includes('路线') || userInput.includes('交通')) {
      reply = '交通路线：\n自驾：导航"鱼子山村"\n公交：可乘坐平谷区内公交到达';
    }

    const botMessage = {
      id: Date.now(),
      type: 'bot',
      content: reply,
      time: this.getCurrentTime()
    };

    this.setData({
      messages: [...this.data.messages, botMessage]
    });
  },

  getCurrentTime() {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
  }
});