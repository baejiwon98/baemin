/**
 * @file : userInfo_reviewlist_employee.js
 * @author : 배지원
 * @date : 2022-04-14
 */

// 페이지 단위 모듈
(function ($, M, window) {
  var page = {
    els: {
      $backBtn: null,
      $plusBtn: null,
      $topBtn: null
    },
    data: {},
    init: function init() {
      this.els.$backBtn = $('#backBtn');
      this.els.$plusBtn = $('.btn-plus');
      this.els.$topBtn = $('#top-btn');
    }, // end init

    initView: function initView() {
      var self = this;
      $.sendHttp({
        path: "/api/review/liststore",
        data: {
          "storeNum": M.data.global('storeNum'),
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
            items += "<div class='fa review-counting-stars' style='margin-left: 1rem;'>";
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
              items += "<img src='" + "http://http://192.168.0.50:8080/view/review/upload/" + item.reviewImage + "' alt='' />";
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
              items += "<div class='employee-review-buttons'>";
              items += "<a id='" + item.orderNum + "' class='modifyBtn'>수정</a>";
              items += "&nbsp|&nbsp";
              items += "<a id='" + item.orderNum + "' class='deleteBtn'>삭제</a>";
              items += "</div>";
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
            } else {
              items += "<div>";
              items += "<div class='plus-icon'>";
              items += "<button type='button' id='" + item.orderNum + "' class='btn-plus'>plus</button>";
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
          alert("내 리뷰 목록을 가져오지 못했습니다.");
        },
      });
    },

    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$backBtn.on('click', function () {
        M.page.back();
      });

      this.els.$plusBtn.on('click', function () {
        M.page.html('./eunjin_userInfo_reviewWrite_employee.html');
      });

      this.els.$topBtn.on("click", function () {
        $('.cont-wrap').scrollTop(0);
      });

      $('#card').on('click', '.btn-plus', function () {
        var reviewNum = $(this).attr('id');
        console.log(reviewNum);
        M.page.html({
          url: './eunjin_userInfo_reviewWrite_employee.html',
          param: {
            'orderNum': reviewNum
          },
          action : 'NO_HISTORY',
        });
      });

      $('#card').on('click', '.modifyBtn', function () {
        var reviewNum = $(this).attr('id');
        console.log(reviewNum);
        M.page.html({
          url: './eunjin_userInfo_reviewWrite_employee.html',
          param: {
            'orderNum': reviewNum,
            'modify' : 'Y',
          },
          action : 'NO_HISTORY',
        });
      });

      $('#card').on('click', '.deleteBtn', function () {
        var reviewNum = $(this).attr('id');
        M.pop.alert({
          title: '확인',
          message: '삭제하시겠습니까?',
          buttons: ['확인', '취소'],
          callback: function (index) {
            if (index == 0) {
              self.deleteReview(reviewNum);
            }
          }
        });
      });
    },

    deleteReview: function (reviewNum) {
      var self = this;
      $.sendHttp({
        path: "/api/review/storedelete",
        data: {
          "orderNum": reviewNum,
          "storeNum": M.data.global('storeNum'),
        },
        succ: function (data) {
          console.log(data);
          M.page.replace({
            url: './jiwon_userInfo_reviewlist_employee.html',
          });
        },
        error: function (data) {
          console.log(data);
          alert("리뷰 댓글 삭제에 실패했습니다. 다시 시도해주세요.");
        }
      });
    },

  };
  window.__page__ = page;
})(jQuery, M, window);


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