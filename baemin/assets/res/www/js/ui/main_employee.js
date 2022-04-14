/**
 * @file :
 * @author :
 * @date :
 */

// 페이지 단위 모듈
(function ($, M, window) {
  var page = {
    els: {
      $storeBtn: null,
      $reviewBtn: null,
      $menuBtn: null
    },
    data: {},
    init: function init() {
      this.els.$storeBtn = $('#store-category-modify');
      this.els.$reviewBtn = $('#store-review-list');
      this.els.$menuBtn = $('#menuBtn');
    }, // end init

    initView: function initView() {
      // 화면에서 세팅할 동적데이터

    }, // end initView

    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$storeBtn.on('click', function () {
        M.page.html('./jiwon_store_category_modify.html');
      });
      this.els.$reviewBtn.on('click', function () {
        M.page.html('./jiwon_userInfo_reviewlist_employee.html');
      });
      this.els.$menuBtn.on('click', function () {
        M.page.html({
          url: "./eunjin_userInfo_Info_employee.html",
        });
      });
    } // end initEvent
  }; // end page
  window.__page__ = page;
})(jQuery, M, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  // 화면에 리소스가 로딩을 끝내고 정상적으로 동작할 수 있는 시점에 대한 콜백
  // window.onload 와 비슷함.
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);