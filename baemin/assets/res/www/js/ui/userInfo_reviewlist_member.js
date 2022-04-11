/**
 * @file : userInfo_reviewlist_member.js
 * @author : 배지원
 * @date : 2022-04-11
 */

// 페이지 단위 모듈
(function ($, M, window) {
  var page = {
    els: {
      $backBtn : null,
      $myInfoBtn: null,
      $myOrderListBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$backBtn = $('#backBtn');
      this.els.$myInfoBtn = $('#myInfo-btn');
      this.els.$myOrderListBtn = $('#myOrderList-btn');
    },

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
    },

    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$backBtn.on('click', function () {
        M.page.back();
      });
      this.els.$myInfoBtn.on('click', function () {
        M.page.back();
      });
      this.els.$myOrderListBtn.on('click', function () {
        M.page.replace('./eunjin_userInfo_myOrderList_member.html');
      });
    }
  };
  window.__page__ = page;
})(jQuery, M, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);