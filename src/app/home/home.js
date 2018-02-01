import React, {Component} from 'react';
import {Accordion, List, Tabs, Toast} from 'antd-mobile';
import API from '../../api/api';
import './home.scss';

const Item = List.Item;
const Brief = Item.Brief;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    background: '#fff'
  },
  main: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    paddingTop: '44px'
  }
};

export class Main extends Component {
  constructor() {
    super();
    this.state = {
      dataList: [],
      jokelist: {page: 1},
      jokeImg: {page: 1}
    }
  }

  /*渲染tab展示*/
  renderContent(tab) {
    switch (tab.id) {
      case 0:
        return <div>
          <Accordion accordion openAnimation={{}}>
            {
              this.state.dataList.map((item, index) => {
                return <Accordion.Panel key={index} header={item.title}>
                  <div className='panel'>
                    {item.digest}
                    <p><span>来源：</span><span>{item.source}</span></p>
                  </div>
                </Accordion.Panel>
              })
            }
          </Accordion>
          <div className='loadingMore' onClick={this.nextPage.bind(this, 'jokeList')}>点击加载更多...</div>
        </div>;
        break;
      case 1:
        return <div className='imgBox'>
          {
            this.state.dataList.map((item, index) => {
              return <div key={index} className='imgBox-item'>
                <img src={item.img} alt=""/>
                <p>{item.title}</p>
              </div>
            })
          }
          <div className='change' onClick={this.nextPage.bind(this, 'jokeImg')}>点击加载更多...</div>
        </div>
        break;
      case 2:
        return <div className='imgBox'>
          {
            this.state.dataList.map((item, index) => {
              return <div key={index} className='imgBox-item'>
                  <img src={item.url} alt=""/>
                <p>{item.title}</p>
              </div>
            })
          }
          <div className='change' onClick={this.nextPage.bind(this, 'huaban')}>点击加载更多...</div>
        </div>
        break;
    }

  }

  /*tabs切换获取数据*/
  changeTab(tab) {
    this.setState({dataList: []});
    switch (tab.id) {
      case 0:
        this.getJokeList();
        break;
      case 1:
        this.getJokeImg();
        break;
      case 2:
        this.getHuaBan();
        break;
    }
  }

  nextPage(id) {
    switch (id) {
      case 'jokeList':
        this.setState({jokelist: {page: this.state.jokelist.page + 1}});
        this.getJokeList();
        break;
      case 'jokeImg':
        this.setState({jokeImg: {page: this.state.jokeImg.page + 1}});
        this.getJokeImg();
        break;
      case 'huaban':
        this.getHuaBan();
        break;
    }
  }

  async getJokeImg() {
    try {
      Toast.loading('努力加载中...', 10000);
      let res = await API.getJokeImg({page: this.state.jokeImg.page});
      if (this.state.jokeImg.page > 1) {
        this.setState({dataList: this.state.dataList.concat(res)});
      } else {
        this.setState({dataList: res});
      }
      Toast.hide();
    } catch (err) {
      this.setState({dataList: []});
      Toast.offline(err.msg, 2);
    }
  }

  async getHuaBan() {
    try {
      Toast.loading('努力加载中...', 10000);
      let res = await API.getHuaBan();
      this.setState({dataList: this.state.dataList.concat(res)});
      Toast.hide();
    } catch (err) {
      this.setState({dataList: []});
      Toast.offline(err.msg, 2);
    }
  }

  async getJokeList() {
    try {
      Toast.loading('努力加载中...', 10000);
      let res = await API.getJokeList({page: this.state.jokelist.page});
      if (this.state.jokelist.page > 1) {
        this.setState({dataList: this.state.dataList.concat(res)});
      } else {
        this.setState({dataList: res});
      }
      Toast.hide();
    } catch (err) {
      this.setState({dataList: []});
      Toast.offline(err.msg, 2);
    }
  }

  componentWillMount() {
    this.getJokeList();
  }

  render() {
    const tabs = [
      {
        title: '搞笑段子',
        id: 0
      }, {
        title: '搞笑图片',
        id: 1
      }, {
        title: '美图欣赏',
        id: 2
      }
    ];
    return (
      <div
        style={styles.container}>
        <main
          style={styles.main}>
          <Tabs
            tabs={tabs}
            swipeable={false}
            prerenderingSiblingsNumber={0}
            onChange={this.changeTab.bind(this)}
          >
            {this.renderContent.bind(this)}
          </Tabs>
        </main>
      </div>
    );
  }
}
