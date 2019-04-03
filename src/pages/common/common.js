const appid = '';

export function wxRequestFn(obj, callback, start = false, end = false, fh) {
  if (!start) {
    wx.showLoading({
      mask: true
    })
  }

  wx.request({
    method: obj.method,
    // url: `http://192.168.0.149:8080/api/v1/teacher${obj.url}`, // 本地dev
    // url: `http://tcw.weyouedu.com${obj.url}`, // 线上测试
    // url: `https://cw.weyouedu.com${obj.url}`, // 生产
    url: obj.url, // 生产
    header: {
      'content-type': obj['content-type'] ? obj['content-type'] : 'application/json',
      // appid,
      // openid,
      // accessToken: token,
      // schoolId,
      // userId: id
    },
    data: obj.data ? obj.data : {},
    success(res) {
      let { status, msg, data } = res.data
      if (status) {
        if (!data) {//如果接口调用成功且不需要返回数据时，直接返回true
          callback(true) // 回调
        } else {
          callback(data) // 回调
        }

      } else {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: msg ? msg : '未知错误',
          showCancel: false,
          confirmColor: '#0076FF'
        })
      }
    },
    fail() {
      wx.showModal({
        title: '提示',
        content: '网络异常',
        showCancel: false,
        confirmColor: '#0076FF'
      })
    },
    complete(res) {
      if (!end) {
        wx.hideLoading()
      }
      if (fh) {  //如果有请求完成回调则执行
        fh(res.status)
      }
    }
  })
}
