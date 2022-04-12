/**
 * @file : userInfo_reviewlist_member.js
 * @author : 배지원
 * @date : 2022-04-12
 */

// 페이지 단위 모듈
(function ($, M, window) {
  M.data.removeGlobal('orderNum');
  var reviewNum;
  var page = {
    els: {
      $backBtn: null,
      $myInfoBtn: null,
      $myOrderListBtn: null,
      $topBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$backBtn = $('#backBtn');
      this.els.$myInfoBtn = $('#myInfo-btn');
      this.els.$myOrderListBtn = $('#myOrderList-btn');
      this.els.$topBtn = $('#top-btn');
    },

    initView: function initView() {
      var self = this;
      $.sendHttp({
        path: "/api/review/mylist",
        data: {
          "memberNum": M.data.global('memberNum'),
        },
        succ: function (data) {
          console.log(data);
          var items = "";
          $.each(data.list, function (index, item) {
            items += "<li id='" + item.orderNum + "'>";
            items += "<div class='arrow_box'>";
            items += "<div class='review-buttons' style='padding-left: 80%;'>";
            items += "<a id='" + item.orderNum + "' class='modifyBtn'>수정</a>";
            items += "|";
            items += "<a id='" + item.orderNum + "' class='deleteBtn'>삭제</a>";
            items += "</div>";
            items += "<div class='review-info'>";
            items += "<div class='review-user-info'>";
            items += "<div class='review-store'>";
            items += "<strong>" + item.storeName + "</strong>";
            items += "</div>";
            items += "<div class='review-detail'>";
            items += "<div class='fa review-counting-stars'>";
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
              items += "<img src='"+"http://localhost:8080/view/review/upload/"+item.reviewImage+"' alt='' />";
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
          alert("내 리뷰 목록을 가져오지 못했습니다.");
        },
      });
    },

    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$topBtn.on('click', function () {
        $('.cont-wrap').scrollTop(0);
      });
      this.els.$backBtn.on('click', function () {
        M.page.back();
      });
      this.els.$myInfoBtn.on('click', function () {
        M.page.back();
      });
      this.els.$myOrderListBtn.on('click', function () {
        M.page.replace('./eunjin_userInfo_myOrderList_member.html');
      });
      $('#card').on('click', '.modifyBtn', function () {
        reviewNum = $(this).attr('id');
        console.log(reviewNum);
        M.data.global('orderNum', reviewNum);
        self.modifyReview();
      });

      $('#card').on('click', '.deleteBtn', function () {
        reviewNum = $(this).attr('id');
        console.log(reviewNum);
        M.pop.alert({
          title: '확인',
          message: '삭제하시겠습니까?',
          buttons: ['확인', '취소'],
          callback: function (index) {
            if (index == 0) {
              self.deleteReview();
            }
          }
        });
      });
    },

    modifyReview: function () {
      var self = this;
      $.sendHttp({
        path: "/api/review/myreviewdetail",
        data: {
          orderNum: M.data.global('orderNum'),
          memberNum: M.data.global('memberNum')
        },
        succ: function (data) {
          console.log(data);
          M.page.replace({
            url: './eunjin_userInfo_reviewWrite_member.html',
            param: {
              "reviewScore": data.reviewScore,
              "reviewContent": data.reviewContent,
              "reviewImage": data.reviewImage,
              "storeNum" : data.storeNum,
              "reviewImage" : data.reviewImage,
              "modify": "Y",
            }
          });
        },
        error: function (data) {
          console.log(data);
          alert('다시 시도해주세요.');
        }
      });
    },

    deleteReview: function () {
      var self = this;
      $.sendHttp({
        path: "/api/review/mydelete",
        data: {
          "orderNum": reviewNum,
        },
        succ: function (data) {
          console.log(data);
          M.data.removeGlobal('orderNum');
          M.page.replace({
            url: './jiwon_userInfo_reviewlist_member.html',
          });
        },
        error: function (data) {
          console.log(data);
          alert("리뷰 삭제에 실패했습니다. 다시 시도해주세요.");
        }
      });
    },
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