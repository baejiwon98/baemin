/**
 * @file : storelist_delivery_takeout.js
 * @author : 강샛별, 배지원
 * @date : 2022-04-15
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var page = {
    els: {
      $categoryChange: null,
      $userInfoBtn: null,
      $topBtn: null,

    },
    data: {},
    init: function init() {
      this.els.$categoryChange = $('#delivery-category-change');
      this.els.$userInfoBtn = $('#userInfo-btn');
      this.els.$topBtn = $('#top-btn');
    },
    initView: function initView() {
      $.sendHttp({
        path: "/api/store/storeList/takeout",
        data: {
          storeCategoryNum: M.data.global('storeCategoryNum'),
          pickupStatus: M.data.global('pickupStatus')
        },
        succ: function (data) {
          console.log(data);
          var items = "";
          $.each(data.list, function (index, item) {
            items += "<li class='storelist' id='"+ item.storeNum+"'>";
            items += "<div class='storelistbox'>";
            items += "<div class='store-info'>";
            items += "<div class='store-info-one'>";
            items += "<div class='store-name'>";
            items += "<strong>"+ item.storeName +"</strong>";
            items += "</div>";
            items += "<div class='review-detail'>";
            if( item.reviewScore != null) {
              items += "<div class='fa fa-star checked' id='Allstars'></div>";
              items += "<strong>"+ item.reviewScore +"</strong>";
            }
            if ( item.objectName != null) {
             items += "<strong class='object-Repre'>"+ item.objectName +"</strong>";
            }
            items += "</div>";
            items += "<div class='review-detail'>";
            items += "<strong class='store-least'>최소주문금액&nbsp;</strong>";
            items += "<strong class='store-leastPrice'>" + item.leastPrice + "원&nbsp;</strong>";
            items += "<strong class='store-delivery'>배달팁&nbsp;</strong>";
            items += "<strong class='store-deliveryTip'>"+ item.deliveryPrice +"원</strong>";
            items += "</div>";
            items += "</div>";
            items += "</div>";
            items += "</div>";
            items += "</li>";
          });
          $("#card").append(items);
        },
        error: function (data) {
          console.log(data);
          alert("주문 목록을 가져오지 못했습니다.");
        },
      });

    }, // end initView
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$userInfoBtn.on('click', function () {
        M.page.html({
          url: './eunjin_userInfo_info_member.html',
        });
      });

      this.els.$categoryChange.on('click', function () {
        M.data.global('deliveryStatus','Y');
        M.data.global('pickupStatus','N');
        M.page.replace('./jiwon_storelist_delivery.html');
      });

      $('#card').on('click', '.storelist', function () {
      var storeNum = $(this).attr('id');
      console.log(storeNum);
      M.data.global('storeNum', storeNum);
        M.page.html({
          url: './jiwon_store_menulist.html',
        });
      });

      // top
      this.els.$topBtn.on('click', function () {
      $('html, body').scrollTop(0);
      });

    }, // end initEvent
  }; // end page
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