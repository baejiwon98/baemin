/**
 * @file : main_member.js
 * @author : 배지원
 * @date : 2022-04-11
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  M.data.global('pickupStatus', 'N');
  M.data.global('deliveryStatus', 'N');
  var page = {
    els: {
      $menuKorea: null,
      $menuChina: null,
      $menuAmerica: null,
      $menuJapan: null,
      $menuSnack: null,
      $backBtn: null,
      $userInfoBtn: null,
      $myAddressBtn: null,
      $searchBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$menuKorea = $('#memu-korea');
      this.els.$menuChina = $('#memu-china');
      this.els.$menuAmerica = $('#memu-america');
      this.els.$menuJapan = $('#memu-japan');
      this.els.$menuSnack = $('#memu-snack');
      this.els.$backBtn = $('#backBtn');
      this.els.$userInfoBtn = $('#userInfo-btn');
      this.els.$myAddressBtn = $('#map-title');
      this.els.$searchIpt = $('#search');
      this.els.$searchBtn = $('.btn-search');
    },
    initView: function initView() {
      var self = this;
      var id = M.data.global('myId');
      $.sendHttp({
        path: "/api/member/info",
        data: {
          "memberId": M.data.global('myId'),
        },
        succ: function (data) {
          console.log(data);
          M.data.global('phone', data.memberPhone);
          M.data.global('grade', 'member');
          M.data.global('memberNum', data.memberNum);
          M.data.global('myAddress', data.memberAddr);
          M.data.global('myAddressDetail', data.memberAddrDetail);
          const element = document.getElementById('map-title');
          element.innerHTML = '<strong>' + M.data.global('myAddress') + ' ' + M.data.global('myAddressDetail') + '</strong>';
        },
        error: function (data) {
          console.log(data);
          alert("유저 정보를 가져오지 못했습니다.");
        }
      });
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;

      this.els.$userInfoBtn.on('click', function () {
        M.page.html({
          url: './eunjin_userInfo_info_member.html',
        });
      });
      this.els.$myAddressBtn.on('click', function () {
        M.page.html({
          url: './saetbyeol_map.html',
        });
      });

      this.els.$menuKorea.on('click', function () {
        M.data.global('storeCategoryNum', 'korea');
        M.page.html({
          url: './jiwon_storelist_delivery.html',
        });
      });
      this.els.$menuChina.on('click', function () {
        M.data.global('storeCategoryNum', 'china');
        M.page.html({
          url: './jiwon_storelist_delivery.html',
        });
      });
      this.els.$menuAmerica.on('click', function () {
        M.data.global('storeCategoryNum', 'america');
        M.page.html({
          url: './jiwon_storelist_delivery.html',
        });
      });
      this.els.$menuJapan.on('click', function () {
        M.data.global('storeCategoryNum', 'japan');
        M.page.html({
          url: './jiwon_storelist_delivery.html',
        });
      });
      this.els.$menuSnack.on('click', function () {
        M.data.global('storeCategoryNum', 'snack');
        M.page.html({
          url: './jiwon_storelist_delivery.html',
        });
      });
      this.els.$searchBtn.on('click', function () {
        var search = self.els.$searchIpt.val().trim();
        M.data.global('searchWord', search);
        M.page.html({
          url: './jiwon_storelist_delivery_search.html',
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
  M.onRestore(function () {
    pageFunc.initView();
  });

})(jQuery, M, __page__, window);