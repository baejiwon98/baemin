/**
 * @file : store_reviewlist.js
 * @author : 배지원
 * @date : 2022-04-14
 */

// 페이지 단위 모듈
(function ($, M, window) {
  var page = {
    els: {
      $backBtn: null,
      $storeMenulistBtn: null,
      $storeDetailBtn: null,
      $goShoppingBtn: null,
      $callBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$backBtn = $('#backBtn');
      this.els.$storeMenulistBtn = $('#store-menulist-btn');
      this.els.$storeDetailBtn = $('#store-detail-btn');
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

      $.sendHttp({
        path: "/api/review/liststore",
        data: {
          "storeNum": M.data.global('storeNum'), //임시로 넣고, 나중에 parameter로 확인
        },
        succ: function (data) {
          console.log(data);
          var items = "";
          $.each(data.list, function (index, item) {
            items += "<li id='" + item.orderNum + "'>";
            items += "<div class='arrow_box'>";
            items += "<div class='review-info'>";
            items += "<div class='review-user-img'>";
            items += "<button type='button' class='btn-user'>usericon</button>";
            items += "</div>";
            items += "<div class='review-user-info'>";
            items += "<div class='review-name'>";
            items += "<strong>" + item.memberNickname + "</strong>";
            items += "</div>";
            items += "<div class='review-detail'>";
            items += "<div class='fa review-counting-stars' style='margin-left: 1rem;' >";
            for (var i = 1; i <= item.reviewScore; i++) {
              items += "<div class='fa fa-star checked' id='stars'></div>";
            }
            for (var j = 1; j <= 5 - item.reviewScore; j++) {
              items += "<div class='fa fa-star-o' id='stars'></div>";
            }
            items += "</div>";
            items += "<div class='fa review-date'>" + item.reviewDate + "</div>";
            items += "</div>";
            items += "</div>";
            items += "</div>";
            items += "<div class='review-content'>";
            if (item.reviewImage != null) {
              items += "<div class='review-user-img'>";
              items += "<img src='" + "http://192.168.0.50:8080/view/review/upload/" + item.reviewImage + "' alt='' style='width:300px; height:300px; border-radius:20px; display: table;' />";
              items += "</div>";
            }
            if (item.reviewContent != null) {
              var brContent = item.reviewContent;
              brContent = brContent.replace(/\r\n/ig, '<br>');
              brContent = brContent.replace(/\\n/ig, '<br>');
              brContent = brContent.replace(/\n/ig, '<br>');
              items += "<div class='review-user-content'>";
              items += "<p>" + brContent + "</p>";
              items += "</div>";
            }
            items += "</div>";

            if (item.storeReview != null) {
              var storeReviewContent = item.storeReview;
              storeReviewContent = storeReviewContent.replace(/\r\n/ig, '<br>');
              storeReviewContent = storeReviewContent.replace(/\\n/ig, '<br>');
              storeReviewContent = storeReviewContent.replace(/\n/ig, '<br>');
              items += "<div class='arrow_box1'>";
              items += "<div class='review-info'>";
              items += "<div class='review-user-img'>";
              items += "<button type='button' class='btn-employee'>";
              items += "employeeicon";
              items += "</button>";
              items += "</div>";
              items += "<div class='review-employee-info'>";
              items += "<div class='review-employee-name'>";
              items += "<strong>";
              items += "사장님";
              items += "</strong>";
              items += "</div>";
              items += "</div>";
              items += "</div>";
              items += "<div class='review-content'>";
              items += "<div class='review-employee-content'>";
              items += "<p>" + storeReviewContent + "</p>";
              items += "</div>";
              items += "</div>";
              items += "</div>";
            }
            items += "</div>";
            items += "</li>";
          });
          $("#card").append(items);
        },
        error: function (data) {
          console.log(data);
          alert("리뷰 목록을 가져오지 못했습니다.");
        },
      });
    },

    initEvent: function initEvent() {
      // Dom Event 바인딩
      this.els.$backBtn.on('click', function () {
        M.page.back();
      });
      this.els.$storeMenulistBtn.on('click', function () {
        M.page.back();
      });
      this.els.$storeDetailBtn.on('click', function () {
        M.page.replace('jiwon_store_detail.html');
      });
      this.els.$goShoppingBtn.on('click', function () {
        M.page.replace('./jiwon_cart.html');
      });
      this.els.$callBtn.on('click', function () {
        M.sys.call(phone);
      })

    }
  };
  window.__page__ = page;
})(jQuery, M, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);