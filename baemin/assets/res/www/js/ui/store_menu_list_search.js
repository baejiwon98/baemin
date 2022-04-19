/**
 * @file : store_menu_list_search.js
 * @author : 배지원
 * @date : 2022-04-18
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var phone;
  var page = {
    els: {
      $storeDetailBtn: null,
      $storeReviewBtn: null,
      $storeObject: null,
      $backBtn: null,
      $goShoppingBtn: null,
      $callBtn: null,

    },
    data: {},
    init: function init() {
      this.els.$storeDetailBtn = $('#store-detail-btn');
      this.els.$storeReviewBtn = $('#store-review-btn');
      this.els.$storeObject = $('#store-object');
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
          $('#searchTitle').text(M.data.global('searchWord'));
          $('.store-main-title').text(data.storeName);
          $('.store-star-score').text(parseFloat(data.reviewScore).toFixed(1));
          $('.store-main-title').text(data.storeName);
          $('#leastPrice').text(data.leastPrice);
          $('#deliveryTip').text(data.deliveryPrice);
          phone = data.storePhone;
          if (data.reviewScore != null) {

            for (var i = 1; i <= parseFloat(data.reviewScore).toFixed(1).substring(0); i++) {
              items += "<div class='fa fa-star checked' id='stars'></div>";
            }
            if (parseFloat(data.reviewScore).toFixed(1).slice(-1) == '0' || parseFloat(data.reviewScore).toFixed(1).slice(-1) == '1' || parseFloat(data.reviewScore).toFixed(1).slice(-1) == '2' || parseFloat(data.reviewScore).toFixed(1).slice(-1) == '3' || parseFloat(data.reviewScore).toFixed(1).slice(-1) == '8' || parseFloat(data.reviewScore).toFixed(1).slice(-1) == '9') {
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

      $.sendHttp({
        path: "/api/store/storeMenuSearch",
        data: {
          "storeNum": M.data.global('storeNum'),
          "searchWord": M.data.global('searchWord'),
        },
        succ: function (data) {
          var items = "";
          $.each(data.list, function (index, item) {
            items += "<li class = 'store-object' id='" + item.objectNum + "'>";
            items += "<div class='object-container'>";
            items += "<div class='object-imgs'>";
            if (item.objectImage != null) {
              items += "<img align='center' class='object-img' src='" + "http://192.168.0.50:8080/view/object/upload/" + item.objectImage + "' alt='' />";
            } else {
              items += "<img align='center' class='object-img' src='../img/object-default.png' style='width:80%;height:80%;'alt='' />";
            }
            items += "</div>";
            items += "<div class='object-main'>";
            items += "<div class='object-title'>";
            items += "<strong>" + item.objectName + "</strong>";
            items += "</div>";
            items += "<div class='object-content' style='margin: 10px;'>";
            if (item.objectContent == null) {
              items += "<p>내용 없음</p>";
            } else {
              items += "<p>" + item.objectContent + "</p>";
            }
            items += "</div>";
            items += "<div class='object-price'>";
            items += "<strong>" + item.objectPrice + "</strong>";
            items += "</div>";
            items += "</div>";
            items += "</div>";
            items += "</li>";
          });
          $("#card").append(items);
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
      this.els.$storeDetailBtn.on('click', function () {
        M.page.html('./jiwon_store_detail.html');
      });
      this.els.$storeReviewBtn.on('click', function () {
        M.page.html('./jiwon_store_reviewlist.html');
      });
      this.els.$storeObject.on('click', function () {
        M.page.html('./jiwon_object_detail.html');
      });
      this.els.$goShoppingBtn.on('click', function () {
        M.page.html('./jiwon_cart.html');
      });
      this.els.$callBtn.on('click', function () {
        M.sys.call(phone);
      });
      $('#card').on('click', '.store-object', function () {
        var objectNum = $(this).attr('id');
        console.log(objectNum);
        M.page.html({
          url: './jiwon_object_detail.html',
          param: {
            "objectNum": objectNum
          }
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

})(jQuery, M, __page__, window);