/**
 * @file : join4.js
 * @author : 배지원
 * @date : 2022-04-11
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var page = {
    els: {
      $loginBtn: null,

    },
    data: {},
    init: function init() {
      this.els.$loginBtn = $('#loginBtn');

    },

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
    },

    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$loginBtn.on('click', function () {
        M.page.html({
          url: './goeun_login.html',
          actionType: 'CLEAR_TOP',
        });
      });

    },


  };

  window.__page__ = page;
})(jQuery, M, __config__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);