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
      $deliveryBtn: null,
      $userInfoBtn: null,
      $myAddressBtn: null,
      $takeoutBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$deliveryBtn = $('#delivery-btn');
      this.els.$userInfoBtn = $('#userInfo-btn');
      this.els.$myAddressBtn = $('#myAddress');
      this.els.$takeoutBtn = $('#takeout-btn');
    },

    initView: function initView() {
      var self = this;
      // 화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;

      this.els.$deliveryBtn.on('click', function () {
        M.page.html('./saetbyeol_main_member2.html');
      });
      this.els.$userInfoBtn.on('click', function () {
        M.page.html('./eunjin_userInfo_info_member.html');
      });

      this.els.$myAddressBtn.on('click', function () {
        M.page.html('./saetbyeol_map.html');
      });

      this.els.$takeoutBtn.on('click', function () {
        M.page.html('./saetbyeol_main_member2.html');
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