/**
 * @file : store_reviewlist.js
 * @author : 배지원
 * @date : 2022-04-14
 */

// 페이지 단위 모듈
(function ($, M, window) {
  var page = {
    els: {
        $backBtn : null,
        $storeMenulistBtn : null,
        $storeDetailBtn : null,
        $storeReviewBtn : null,
        $goShoppingBtn : null,
    },
    data: {},
    init: function init() {
        this.els.$backBtn = $('#backBtn');
        this.els.$storeMenulistBtn = $('#store-menulist-btn');
        this.els.$storeDetailBtn = $('#store-detail-btn');
        this.els.$storeReviewBtn = $('#store-review-btn');
        this.els.$goShoppingBtn = $('#go-shopping-btn');
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
                $('.store-star-score').text(data.reviewScore);
                $('.store-main-title').text(data.storeName);
                $('#leastPrice').text(data.leastPrice);
                $('#store-title').text(data.storeName);
                $('#storeAddr').text(data.storeAddr);
                $('#orderArea').text(data.orderArea);
                $('#employeeName').text(data.employeeName);
                $('#employeeNum').text(data.employeeNum);

                phone = data.storePhone;
                for (var i = 1; i <= data.reviewScore.substring(0); i++) {
                  items += "<div class='fa fa-star checked' id='stars'></div>";
                }
                if (data.reviewScore.slice(-1) == '0' || data.reviewScore.slice(-1) == '1' || data.reviewScore.slice(-1) == '2' || data.reviewScore.slice(-1) == '3' || data.reviewScore.slice(-1) == '8' || data.reviewScore.slice(-1) == '9') {
                  items += "<div class='fa fa-star-o' id='stars'></div>";
                }
                if (data.reviewScore.slice(-1) == '4' || data.reviewScore.slice(-1) == '5' || data.reviewScore.slice(-1) == '6' || data.reviewScore.slice(-1) == '7') {
                  items += "<div class='fa fa-star-half-o' id='stars'></div>";
                }
                for (var i = 1; i <= 5-data.reviewScore.substring(0); i++) {
                  items += "<div class='fa fa-star-o' id='stars'></div>";
                }
                items += "<div class='fa store-star-score'><strong>"+data.reviewScore+"</strong></div>"
                $(".store-star-ratings").append(items);


                $('#deliveryTip').text(data.deliveryPrice);
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
                  items += "<div class='fa review-counting-stars' >";
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
                    items += "<img src='" + "http://localhost:8080/view/review/upload/" + item.reviewImage + "' alt='' />";
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
        M.page.html('jiwon_store_menulist.html');
      });
      this.els.$storeDetailBtn.on('click', function () {
        M.page.html('jiwon_store_detail.html');
      });
      this.els.$storeReviewBtn.on('click', function () {
        M.page.html('jiwon_store_reviewlist.html');
      });
      this.els.$goShoppingBtn.on('click', function () {
        M.page.html('./jiwon_cart.html');
      });


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