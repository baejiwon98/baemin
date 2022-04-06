/**
 * @file :
 * @author :
 * @date :
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var SERVER_PATH = CONFIG.SERVER_PATH;
  M.data.removeGlobal('seqNo');
  var seqNo = [];
  var page = {
    els: {
      $myOrderListBtn: null,
      $myReviewBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$myOrderListBtn = $('#myOrderList-btn');
      this.els.$myReviewBtn = $('#myReview-btn');
    },

    initView: function initView() {
      var self = this;
      // 화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;

      this.els.$myOrderListBtn.on('click', function () {
              M.page.html('./eunjin_userInfo_orderList_member.html');
            });
      this.els.$myReviewBtn.on('click', function () {
              M.page.html('./jiwon_userInfo_reviewlist_member.html');
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

  M.onRestore(function () {
    pageFunc.initView();
  });
})(jQuery, M, __page__, window);