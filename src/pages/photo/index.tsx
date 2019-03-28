import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'
const app = getApp();

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页',
  }
  constructor(){
    this.state = {
      photoList:[],
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo')
    }
  }

  componentWillMount () {
  }

  componentDidMount () {
    // wx.getLocation({
    //   success:(e)=>{
    //     console.log(111111111,e)
    //     wx.openLocation({
    //       ...e,
    //       success:(ee)=>{
    //         console.log(222222,ee)
    //       }
    //     })
    //   }
    // });
    // wx.chooseLocation({
    //   success:(e)=>{
    //     console.log(222222,e)
    //   }
    // })
    // wx.login({
    //   success:(e)=>{
    //     console.log(222222,e)
    //   }
    // })
    wx.getSystemInfo({
      success: function (z) {
        console.warn(11111111, z);
      }
    })
    if (app.globalData.userInfo) {
      this.setState({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.state.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setState({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setState({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  getInfo = () => {
    Taro.navigateTo({
      url: '../page1/index'
    })
    Taro.hideLoading()
  }
  upload = () => {
    wx.chooseImage({
      success: (e) => {
        console.log(e.tempFilePaths);
        wx.saveImageToPhotosAlbum(e);
        this.setState({
          photoList: [...this.state.photoList,...e.tempFilePaths]
        })
      }
    })
  }
  getUserInfo= () => {
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo;
        this.setState({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  }
  startRecord= () => {
    wx.scanCode({
      success: res => {
        console.log(res);
      }
    })
  }
  stopRecord= () => {
    wx.stopRecord({
      success: res => {
        console.log(res);
      }
    })
  }

  render () {
    const { photoList,userInfo, } = this.state;
    return (
      <div className='index'>
        <Button
          className="t1"
          onClick={this.getInfo}
        >
          咩咩子
        </Button>
        <Button
          onClick={this.upload}
        >
          上传
        </Button>
        <view class="userinfo">
          {
            userInfo ?
              <block>
                <image class="userinfo-avatar" src={userInfo.avatarUrl} mode="cover"></image>
                <text class="userinfo-nickname">{userInfo.nickName}</text>
              </block> :
              <Button open-type="getUserInfo" onClick={this.getUserInfo}> 获取头像昵称 </Button>
          }
        </view>
        {
          photoList.map((z) => (
            <Image mode="aspectFit" src={z} />
          ))
        }
        <Button onClick={this.startRecord}> 识别二维码 </Button>
        <Button onClick={this.stopRecord}> 结束 </Button>
      </div>
    )
  }
}

