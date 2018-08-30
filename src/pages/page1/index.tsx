import Taro, { Component, Config } from '@tarojs/taro'
import {View, Text, Image, Label} from '@tarojs/components'
import './index.less'
import * as React from "react";
import img1 from '../../asset/images/0db9b112632762d05f180bfaacec08fa513dc62c.jpg'

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () {
    console.log(111111111111111111,window);
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <div className='index'>
        <div>
          <Label className="iconfont icon-shiliangzhinengduixiang1"></Label>
          <Image className="image" src={img1}/>
        </div>
      </div>
    )
  }
}

