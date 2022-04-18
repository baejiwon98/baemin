/**
 * @file : userInfo_orderList_member.js
 * @author : 배지원
 * @date : 2022-04-12
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var orderNum;
  M.data.removeGlobal('orderNum');
  var page = {
    els: {
      $myReviewBtn: null,
      $myInfoBtn: null,
      $backBtn: null,
      $topBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$myInfoBtn = $('#myInfo-btn');
      this.els.$myReviewBtn = $('#myReview-btn');
      this.els.$backBtn = $('#backBtn');
      this.els.$topBtn = $('#top-btn');
    },

    initView: function initView() {
      var self = this;
      $.sendHttp({
        path: "/api/payment/paymentAllMember",
        data: {
          "memberNum": M.data.global('memberNum'),
        },
        succ: function (data) {
          console.log(data);
          var items = "";
          $.each(data.list, function (index, item) {
            items += "<li class='myOrderList' id='" + item.orderNum + "' name='" + item.storeNum + "'>";
            items += "<div>";
            items += "<div style='padding: 0.5 em; padding-left: 1em;'>";
            items += "<div style='padding-bottom: 0 px;'>";
            items += "<div style='float: left;padding-right: 2em;'>" + item.orderTime.substring(0, 10) + "</div>";
            items += "<div style='text-align:left;width: auto;'>";
            items += "<span style='font-weight:bold;'>" + item.orderStatus + "</span>";
            items += "<div style='float:right; margin-right:1rem;'>";
            items += "<img src='../img/btn-close-black.png' class='btn-orderList-delete' name='" + item.orderNum + "'/>";
            items += "</div>";
            items += "</div>";
            items += "</div>";
            items += "</div>";
            items += "<div class='orderList-object-img'>";
            items += "<img class='orderList-object-img-detail' src='../img/orderlist-default.png' alt='' />";
            items += "</div>";
            items += "<div class='orderList-object-name' style='padding-top: 0.5em;'>";
            items += "<strong style='padding: 0;'>" + item.storeName + "</strong>";
            items += "<br/><br/></div>";
            items += "<div class='orderList-object-price' style='padding-top: 8px;'>";
            items += "<div style='padding-right: 3em; margin-bottom: 1em;'>" + item.objectName + "</div>";
            items += "<div class='orderList-object-qty' style='margin-top:-3px;'>";
            items += "<img src='../img/btn-review.png' style='width: 1.4em; height: 1.4em;' class='reviewWrite' id='" + item.storeNum + "' name='" + item.orderNum + "'/>";
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
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$backBtn.on('click', function () {
        M.page.back();
      });
      this.els.$myInfoBtn.on('click', function () {
        M.page.back();
      });
      this.els.$myReviewBtn.on('click', function () {
        M.page.replace('./jiwon_userInfo_reviewlist_member.html');
      });
      this.els.$topBtn.on('click', function () {
        $('.cont-wrap').scrollTop(0);
      });
      $('#card').on('click', '.myOrderList', function () {
        orderNum = $(this).attr('id');
        storeNum = $(this).attr('name');
        console.log(orderNum);
        console.log(storeNum);
        M.data.global('orderNum', orderNum);
        M.data.global('storeNum', storeNum);
        M.page.html({
          url: './eunjin_userInfo_orderDetail_member.html',
        });
      });
      $('#card').on('click', '.btn-orderList-delete', function (e) {
        e.stopPropagation();
        orderNum = $(this).attr('name');
        console.log(orderNum);
        M.data.global('orderNum', orderNum);
        M.pop.alert({
          title: '확인',
          message: '삭제하시겠습니까?',
          buttons: ['확인', '취소'],
          callback: function (index) {
            if (index == 0) {
              self.deleteOrderList();
            }
          }
        });
      });
      $('#card').on('click', '.reviewWrite', function (e) {
        e.stopPropagation();
        orderNum = $(this).attr('name');
        var storeNum = $(this).attr('id');
        console.log(orderNum);
        console.log(storeNum);
        M.data.global('orderNum', orderNum);
        M.page.html({
          url: './eunjin_userInfo_reviewWrite_member.html',
          param: {
            "storeNum": storeNum
          },
        });
      });
    },
    deleteOrderList: function () {
      var self = this;
      console.log(M.data.global('orderNum'));
      console.log(M.data.global('memberNum'));
      $.sendHttp({
        path: "/api/payment/paymentDelete",
        data: {
          orderNum: M.data.global('orderNum'),
          memberNum: M.data.global('memberNum'),
        },
        succ: function (data) {
          console.log(data);
          M.data.removeGlobal('orderNum');
          M.page.replace({
            url: './eunjin_userInfo_myOrderList_member.html',
          });
        },
        error: function (data) {
          console.log(data);
          alert('다시 시도해주세요.');
        }
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