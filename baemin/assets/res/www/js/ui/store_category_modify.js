/**
 * @file : store_category_modify.js
 * @author : 배지원
 * @date : 2022-04-15
 */

(function ($, M, window, CONFIG) {
  var page = {
    els: {
      $backBtn: null,
      $topBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$backBtn = $('#backBtn');
      this.els.$topBtn = $('#top-btn');
    }, // end init

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
          $('.store-star-score').text(data.reviewScore);
          $('.store-main-title').text(data.storeName);
          $('#leastPrice').text(data.leastPrice);
          $('#deliveryTip').text(data.deliveryPrice);
          if (data.reviewScore != null) {
            for (var i = 1; i <= data.reviewScore.substring(0); i++) {
              items += "<div class='fa fa-star checked' id='stars'></div>";
            }
            if (data.reviewScore.slice(-1) == '0' || data.reviewScore.slice(-1) == '1' || data.reviewScore.slice(-1) == '2' || data.reviewScore.slice(-1) == '3' || data.reviewScore.slice(-1) == '8' || data.reviewScore.slice(-1) == '9') {
              items += "<div class='fa fa-star-o' id='stars'></div>";
            }
            if (data.reviewScore.slice(-1) == '4' || data.reviewScore.slice(-1) == '5' || data.reviewScore.slice(-1) == '6' || data.reviewScore.slice(-1) == '7') {
              items += "<div class='fa fa-star-half-o' id='stars'></div>";
            }
            for (var i = 1; i <= 5 - data.reviewScore.substring(0); i++) {
              items += "<div class='fa fa-star-o' id='stars'></div>";
            }
            items += "<div class='fa store-star-score'><strong>" + data.reviewScore + "</strong></div>";
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
      this.els.$backBtn.on('click', function () {
        M.page.back();
      });
      this.els.$topBtn.on('click', function () {
        $('html, body').scrollTop(0);
      });
    }
  };
  window.__page__ = page;
})(jQuery, M, window, __config__);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);