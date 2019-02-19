
// projectEnv processPort process.env 变量通过webpack配置返回 DefinePlugin

let config = require(`./${projectEnv}.env`);

let exportEnv = Object.assign({
  shareObj: {
    defaultObj: {
      title: "",
      desc: "",
      imgUrl: "http://cdn.yunjiaxiang.com/upload/20170621/28fd46fcc86641a2a530a4f24b433958",
      link: window.location.origin + window.location.pathname
    }
  }
}, config);

exportEnv.apiBaseUrl = process.env.NODE_ENV === "production" ?
  config.apiBaseUrl : `http://localhost:${processPort}/`;
export default exportEnv;
