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
      $writeBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$backBtn = $('#backBtn');
      this.els.$topBtn = $('#top-btn');
      this.els.$writeBtn = $('#create-store-menu-btn');
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
          $('.store-star-score').text(parseFloat(data.reviewScore).toFixed(1));
          $('.store-main-title').text(data.storeName);
          $('#leastPrice').text(data.leastPrice);
          $('#deliveryTip').text(data.deliveryPrice);
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
        path: "/api/object/readStoreMenu",
        data: {
          "storeNum": M.data.global('storeNum'),
        },
        succ: function (data) {
          var items = "";
          $.each(data.list, function (index, item) {
            items += "<li class = 'store-object' id='" + item.objectNum + "'>";
            items += "<div class='object-container'>";
            items += "<div class='object-imgs'>";
            items += "<img align='center' class='object-img' src='" + "http://localhost:8080/view/object/upload/" + item.objectImage + "' alt='' />";
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
      this.els.$backBtn.on('click', function () {
        M.page.back();
      });
      this.els.$topBtn.on('click', function () {
        $('html, body').scrollTop(0);
      });
      $('#card').on('click', '.store-object', function () {
        var objectNum = $(this).attr('id');
        console.log(objectNum);
        M.data.global('objectNum', objectNum);
        M.page.html({
          url: './jiwon_object_detail_modify.html',
        });
      });
      this.els.$writeBtn.on('click', function () {
        $('html, body').scrollTop(0);
        M.page.html({
          url: './jiwon_store_object_write.html',
        });
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