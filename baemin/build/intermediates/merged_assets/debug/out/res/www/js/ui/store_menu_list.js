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
      $storeDetailBtn: null,
      $storeReviewBtn: null,
      $storeObject:null,
      $backBtn : null
    },
    data: {},
    init: function init() {
      this.els.$storeDetailBtn = $('#store-detail-btn');
      this.els.$storeReviewBtn = $('#store-review-btn');
      this.els.$storeObject = $('#store-object');
      this.els.$backBtn = $('#backBtn');
    },

    initView: function initView() {
      var self = this;
      // 화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;

      this.els.$backBtn.on('click', function () {
        M.page.back();
      });
      this.els.$storeDetailBtn.on('click', function () {
        M.page.html('./jiwon_store_detail.html');
      });
      this.els.$storeReviewBtn.on('click', function () {
        M.page.html('./jiwon_store_reviewlist.html');
      });
      this.els.$storeObject.on('click', function () {
        M.page.html('./jiwon_object_detail.html');
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