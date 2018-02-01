import httpServer from './httpServer';class API extends httpServer {  /**   *  用途：获取搞笑图片   *  baseUrl:https://api-xcx.herokuapp.com   *  @url /api/joke_img/   *  返回http_code为200表示成功   *  @method get   *  @return {promise}   */  async getJokeImg(params = {}) {    try {      let result = await this.axios('get', `/api/joke_photo/${params.page}`, params);      if (result && result.code === 200) {        return result.data || {};      } else {        throw result;      }    } catch (err) {      throw err;    }  }  /**   *  用途：获取段子列表   *  baseUrl:https://api-xcx.herokuapp.com   *  @url /api/joke_img/   *  返回http_code为200表示成功   *  @method get   *  @return {promise}   */  async getJokeList(params = {}) {    try {      let result = await this.axios('get', `/api/joke_list/${params.page}`, null)      if (result && result.code === 200) {        return result.data || {};      } else {        throw result;      }    } catch (err) {      throw err;    }  }  /**   *  用途：获取花瓣图片   *  baseUrl:https://api-xcx.herokuapp.com   *  @url /api/joke_img/   *  返回http_code为200表示成功   *  @method get   *  @return {promise}   */  async getHuaBan(params = {}) {    try {      let result = await this.axios('get', `/api/huaban`, null)      if (result && result.code === 200) {        return result.data || {};      } else {        throw result;      }    } catch (err) {      throw err;    }  }}export default new API();