import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'
import geren from '../../asset/images/svg/geren.svg'
import dianzan from '../../asset/images/svg/dianzan.svg'
import jilu from '../../asset/images/svg/jilu.svg'
import { wxRequestFn, } from '../common/common.js'
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
    // wx.getSystemInfo({
    //   success: function (z) {
    //     console.warn(11111111, z);
    //   }
    // })

    wxRequestFn({
      method: 'get',
      url: 'http://88c13f5a.ngrok.io/',
      data: null
    }, res => {
      if (res) {
        console.warn(res);
        wx.hideLoading();
        wx.showToast({
          title: '请求成功',
          icon: 'none'
        });
      }
    })
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
        // wx.saveImageToPhotosAlbum(e);
        const photoList = [...this.state.photoList,...e.tempFilePaths];
        wx.setStorageSync('photoList', photoList);
        this.setState({
          photoList,
        });
      }
    })
  }
  getUserInfo = (res) => {
    console.log(111, res);
    // app.globalData.userInfo = res.userInfo;
    // this.setState({
    //   userInfo: res.userInfo,
    //   hasUserInfo: true
    // })
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
    const { photoList, userInfo, } = this.state;
    return (
      <div className='index'>
        <div className="head">
          <div className="image-box">
            <div>
              <div>
                <p className="name"></p>
                <a className="user-type">游客</a>
              </div>
              <p className="fws">分享者</p>
            </div>
          </div>
          <div className="money-box">
            <div>
              <p>总数</p>
              <p>2</p>
            </div>
            <div>
              <p>已上传</p>
              <p>2</p>
            </div>
            <div>
              <p>被点赞</p>
              <p>0</p>
            </div>
          </div>
        </div>
        <div className="entry">
          <div>
            <p>搜索</p>
            <input name="keyword" placeholder="请输入" />
          </div>
          <a>确定</a>
        </div>
        <div className="menu">
          <View
            onClick={this.getInfo}
          >
            <image src={geren}></image>
            <p>个人上传</p>
          </View>
          <View>
            <image src={dianzan}></image>
            <p>我的喜好</p>
          </View>
          <View>
            <image src={jilu}></image>
            <p>分类1</p>
          </View>
          <View>
            <image src={jilu}></image>
            <p>分类2</p>
          </View>
          <View>
            <image src={jilu}></image>
            <p>分类3</p>
          </View>
        </div>
        <Button open-type="getUserInfo" bindgetuserinfo={this.getUserInfo}>获取授权</Button>
        <Button
          onClick={this.upload}
          className="vip-btn"
        >
          上传
        </Button>
      </div>
    )
  }
}

