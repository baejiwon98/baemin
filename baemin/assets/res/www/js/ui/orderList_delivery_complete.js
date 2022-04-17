/**
 * @file : orderList_delivery_complete.js
 * @author : 배지원
 * @date : 2022-04-17
 */

// 페이지 단위 모듈
(function ($, M, window) {
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
        $.sendHttp({
          path: "/api/payment/paymentAllDelivery",
          data: {
            "deliveryNum": M.data.global('deliveryNum');
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
              if (item.orderStatus == "조리 완료") {
                items += "<span style='font-weight:bold;'>배달 매칭 대기중</span>>";
              } else {
                items += "<span style='font-weight:bold;'>" + item.orderStatus + "</span>>";
              }
              items += "</div>";
              items += "</div>";
              items += "</div>";
              items += "<div class='orderList-object-img'>";
              items += "<img class='orderList-object-img-detail' src='../img/delivery_default.png' alt='' />";
              items += "</div>";
              items += "<div class='orderList-object-name' style='padding-top: 0.5em;'>";
              items += "<strong style='padding: 0;'>" + item.storeName + "</strong>";
              items += "<br/><br/></div>";
              items += "<div class='orderList-object-price' style='padding-top: 8px;'>";
              items += "<div style='padding-right: 3em; margin-bottom: 1em;'>" + item.memAddress + "</div>";
              items += "</div>";
              items += "</div>";
              items += "</li>";
            });
            $("#card").append(items);
          },
          error: function (data) {
            console.log(data);
            alert("배달 요청 목록을 가져오지 못했습니다.");
          },

        });
      }, // end initView

      initEvent: function initEvent() {
        // Dom Event 바인딩
        this.els.$backBtn.on('click', function () {
          M.page.back();
        });

        this.els.$topBtn.on('click', function () {
          $('html, body').scrollTop(0);
        });

        $('#card').on('click', '.myOrderList', function () {
          orderNum = $(this).attr('id');
          M.data.global('orderNum', orderNum);
          M.page.html({
            url: './eunjin_userInfo_orderDetail_delivery_all.html',
          });
        });
      }
  }; // end page
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