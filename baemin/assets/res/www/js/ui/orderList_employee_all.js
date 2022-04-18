/**
 * @file : orderList_employee_all.js
 * @author : 배지원
 * @date : 2022-04-17
 */

// 페이지 단위 모듈
(function ($, M, window) {
  var page = {
    els: {
      $backBtn: null,
      $changeBtn: null,
      $topBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$backBtn = $('#backBtn');
      this.els.$changeBtn = $('#current-category-change');
      this.els.$topBtn = $('#top-btn');
    }, // end init

    initView: function initView() {
      $.sendHttp({
        path: "/api/payment/paymentAllStore",
        data: {
          "storeNum": M.data.global('storeNum'),
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
            if (item.orderStatus == "주문 완료") {
              items += "<span style='font-weight:bold;'>주문 승인 대기중</span>>";
            } else {
              items += "<span style='font-weight:bold;'>" + item.orderStatus + "</span>>";
            }
            items += "</div>";
            items += "</div>";
            items += "</div>";
            items += "<div class='orderList-object-img'>";
            if (item.objectImg != null) { // 메뉴중 사진있는 것의 첫번째사진이 나와야함.
              //              if (!item.objectImg.test(',')) {
              //                items += "<img class='orderList-object-img-detail' src='" + "http://localhost:8080/view/review/upload/" + item.reviewImage.substring(img) + "' alt='' />";
              //              } else {
              //                var img = item.reviewImage.IndexOf(',') + 1;
              //                items += "<img class='orderList-object-img-detail' src='" + "http://localhost:8080/view/review/upload/" + item.reviewImage + "' alt='' />";
              //              }
            } else {
              items += "<img class='orderList-object-img-detail' src='../img/orderlist-default.png' alt='' />";
            }
            items += "</div>";
            items += "<div class='orderList-object-name' style='padding-top: 0.5em;'>";
            items += "<strong style='padding: 0;'>" + item.storeName + "</strong>";
            items += "<br/><br/></div>";
            items += "<div class='orderList-object-price' style='padding-top: 8px;'>";
            items += "<div style='padding-right: 3em; margin-bottom: 1em;'>" + item.objectName + "</div>";
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
      this.els.$backBtn.on('click', function () {
        M.page.back();
      });

      this.els.$changeBtn.on('click', function () {
        M.page.replace({
          url: "./eunjin_orderList_employee_current.html",
        });
      });

      this.els.$topBtn.on('click', function () {
        $('html, body').scrollTop(0);
      });

      $('#card').on('click', '.myOrderList', function () {
        orderNum = $(this).attr('id');
        M.data.global('orderNum', orderNum);
        M.page.html({
          url: './eunjin_userInfo_orderDetail_employee_all.html',
        });
      });
    }
  }; // end page
  window.__page__ = page;
})(jQuery, M, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  // 화면에 리소스가 로딩을 끝내고 정상적으로 동작할 수 있는 시점에 대한 콜백
  // window.onload 와 비슷함.
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);