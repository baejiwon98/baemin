/**
 * @file : store_detail.js
 * @author : 배지원
 * @date : 2022-04-15
 */

// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var phone;
  var page = {
    els: {
      $storeMenuListBtn: null,
      $storeReviewBtn: null,
      $backBtn: null,
      $goShoppingBtn: null,
      $callBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$storeMenuListBtn = $('#store-menulist-btn');
      this.els.$storeReviewBtn = $('#store-review-btn');
      this.els.$backBtn = $('#backBtn');
      this.els.$goShoppingBtn = $('#go-shopping-btn');
      this.els.$callBtn = $('#call-btn');
    },

    initView: function initView() {
      var self = this;
      $.sendHttp({
        path: "/api/store/storeInfo",
        data: {
          "storeNum": M.data.global('storeNum'),
        },
        succ: function (data) {
          console.log(data);
          var items = "";
          $('#headerStoreName').text(data.storeName);
          $('.store-main-title').text(data.storeName);
          $('.store-star-score').text(parseFloat(data.reviewScore).toFixed(1));
          $('.store-main-title').text(data.storeName);
          $('#leastPrice').text(data.leastPrice);
          $('#store-title').text(data.storeName);
          $('#storeAddr').text(data.storeAddr);
          $('#orderArea').text(data.orderArea);
          $('#employeeName').text(data.employeeName);
          $('#employeeNum').text(data.employeeNum);
          $('#deliveryTip').text(data.deliveryPrice);

          phone = data.storePhone;
          if (data.reviewScore != null) {
            for (var i = 1; i <= parseFloat(data.reviewScore).toFixed(1).substring(0); i++) {
              items += "<div class='fa fa-star checked' id='stars'></div>";
            }
            if (parseFloat(data.reviewScore).toFixed(1).slice(-1) == '1' || parseFloat(data.reviewScore).toFixed(1).slice(-1) == '2' || parseFloat(data.reviewScore).toFixed(1).slice(-1) == '3' || parseFloat(data.reviewScore).toFixed(1).slice(-1) == '8' || parseFloat(data.reviewScore).toFixed(1).slice(-1) == '9') {
              items += "<div class='fa fa-star-o' id='stars'></div>";
            }
            if (parseFloat(data.reviewScore).toFixed(1).slice(-1) == '4' || parseFloat(data.reviewScore).toFixed(1).slice(-1) == '5' || parseFloat(data.reviewScore).toFixed(1).slice(-1) == '6' || parseFloat(data.reviewScore).toFixed(1).slice(-1) == '7') {
              items += "<div class='fa fa-star-half-o' id='stars'></div>";
            }
            for (var i = 1; i <= 5 - parseFloat(data.reviewScore).toFixed(1).substring(0); i++) {
              items += "<div class='fa fa-star-o' id='stars'></div>";
            }
            items += "<div class='fa store-star-score'><strong>" + parseFloat(data.reviewScore).toFixed(1) + "</strong></div>";
          } else {
            items += "<div class='fa fa-star-o' id='stars'></div>";
            items += "<div class='fa fa-star-o' id='stars'></div>";
            items += "<div class='fa fa-star-o' id='stars'></div>";
            items += "<div class='fa fa-star-o' id='stars'></div>";
            items += "<div class='fa fa-star-o' id='stars'></div>";
          }

          $(".store-star-ratings").append(items);
        },
        error: function (data) {
          console.log(data);
          alert("가게 정보를 가져오지 못했습니다.");
        }
      });
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      this.els.$backBtn.on('click', function () {
        M.page.back();
      });
      this.els.$storeMenuListBtn.on('click', function () {
        M.page.back();
      });
      this.els.$storeReviewBtn.on('click', function () {
        M.page.replace('./jiwon_store_reviewlist.html');
      });
      this.els.$goShoppingBtn.on('click', function () {
        M.page.replace('./jiwon_cart.html');
      });
      this.els.$callBtn.on('click', function () {
        M.sys.call(phone);
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