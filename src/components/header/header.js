import React, {Component} from 'react';
import {NavBar, Icon} from 'antd-mobile';

import './header.scss';

export class Header extends Component {
  render() {
    return (
      <header>
        <NavBar mode="light" rightContent={[<Icon key="1" type="ellipsis"/>]}>首页</NavBar>
      </header>
    );
  }
}
