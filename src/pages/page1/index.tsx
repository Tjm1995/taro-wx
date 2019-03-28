import Taro, { Component, Config } from '@tarojs/taro'
import {View, Text, Image, Label} from '@tarojs/components'
import './index.less'
import * as React from "react";
import img1 from '../../asset/images/0db9b112632762d05f180bfaacec08fa513dc62c.jpg'
import img2 from '../../asset/images/dlQ5-k7hzZtT3cShs-fj.jpg.medium.jpg'

export default class Index extends Component {
  constructor(){
    this.state.photoList = [img1, img2];
  }
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '咩咩子'
  }

  componentWillMount () {
  }

  componentDidMount () {
    this.getData();
  }

  getData = () => {
    const that = this;
    wx.getStorage({
      key: 'photoList',
      success: function(res){
        // success
        console.warn(res);
        if(res && res.data && res.data.length > 0){
          that.setState({
            photoList: that.state.photoList.concat(res.data),
          })
        }
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { photoList, } = this.state;
    return (
      <div className='index'>
        <div>
          {
            photoList && photoList.map((z,i) => {
              const className = 'iconfont icon-shiliangzhinengduixiang'+(i+1);
              return (
                <div>
                  <Label className={className}></Label>
                  <Image mode="aspectFit" src={z}/>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

