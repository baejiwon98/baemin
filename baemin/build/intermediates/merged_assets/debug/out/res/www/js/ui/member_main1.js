/**
 * @file : member_main1.js
 * @author : 배지원
 * @date : 2022-04-11
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
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
      this.els.$myAddressBtn = $('#map-title');
      this.els.$takeoutBtn = $('#takeout-btn');
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
          console.log(M.data.global('myAddress'));
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

      this.els.$deliveryBtn.on('click', function () {
        M.page.html({
            url : './saetbyeol_main_member2.html',
            param: { "way": "delivery" },
        });
      });
      this.els.$takeoutBtn.on('click', function () {
        M.page.html({
          url : './saetbyeol_main_member2.html',
          param: { "way": "takeout" },
        });
      });
      this.els.$userInfoBtn.on('click', function () {
        M.page.html({
          url: './eunjin_userInfo_info_member.html',
        });
      });
      this.els.$myAddressBtn.on('click', function () {
        M.page.html('./saetbyeol_map.html');
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