/**
 * @file : member_main2.js
 * @author : 배지원
 * @date : 2022-04-11
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var seqNo = [];
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
    },

    initView: function initView() {
      var self = this;
      const element = document.getElementById('map-title');
      element.innerHTML = '<strong>' + M.data.global('myAddress') + '</strong>';
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$backBtn.on('click', function () {
        M.page.back();
      });
      this.els.$userInfoBtn.on('click', function () {
        M.page.html({
          url: './eunjin_userInfo_info_member.html',
        });
      });
      this.els.$myAddressBtn.on('click', function () {
        M.page.html('./saetbyeol_map.html');
      });

      if (M.data.param('way') == 'delivery') {
        this.els.$menuKorea.on('click', function () {
          M.page.html('./jiwon_storelist_delivery.html');
        });
        this.els.$menuChina.on('click', function () {
          M.page.html('./jiwon_storelist_delivery.html');
        });
        this.els.$menuAmerica.on('click', function () {
          M.page.html('./jiwon_storelist_delivery.html');
        });
        this.els.$menuJapan.on('click', function () {
          M.page.html('./jiwon_storelist_delivery.html');
        });
        this.els.$menuSnack.on('click', function () {
          M.page.html('./jiwon_storelist_delivery.html');
        });
      } else if (M.data.param('way') == 'takeout') {
        this.els.$menuKorea.on('click', function () {
          M.page.html('./jiwon_storelist_takeout.html');
        });
        this.els.$menuChina.on('click', function () {
          M.page.html('./jiwon_storelist_takeout.html');
        });
        this.els.$menuAmerica.on('click', function () {
          M.page.html('./jiwon_storelist_takeout.html');
        });
        this.els.$menuJapan.on('click', function () {
          M.page.html('./jiwon_storelist_takeout.html');
        });
        this.els.$menuSnack.on('click', function () {
          M.page.html('./jiwon_storelist_takeout.html');
        });
      }

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