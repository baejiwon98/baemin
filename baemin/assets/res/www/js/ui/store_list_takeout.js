/**
 * @file :
 * @author :
 * @date :
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var page = {
    els: {
      $categoryChange: null,
      $store1:null,
      $userInfoBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$categoryChange = $('#delivery-category-change');
      this.els.$store1 = $('#store1');
      this.els.$userInfoBtn = $('#userInfo-btn');
    },
    initView: function initView() {
      var self = this;
      // 화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$userInfoBtn.on('click', function () {
        M.page.html({
          url: './eunjin_userInfo_info_member.html',
        });
      });
      this.els.$categoryChange.on('click', function () {
        M.page.replace('./jiwon_storelist_delivery.html');
      });
      this.els.$store1.on('click', function() {
        M.page.html('./jiwon_store_menulist.html');
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