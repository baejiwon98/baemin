/**
 * @file :
 * @author :
 * @date :
 */

// 페이지 단위 모듈
(function ($, M, window) {
  //  var ENV = CONFIG.ENV;
  //  var MSG = CONFIG.MSG;
  //  var CONSTANT = CONFIG.CONSTANT;
  //  var SERVER_CODE = CONFIG.SERVER_CODE;
  var page = {
    els: {
      $backBtn: null,
      $orderTime: null,
      $orderStatus: null,
      $deleteBtn: null,
      $detailBtn: null,
      $objectName: null,
      $buyQty: null,
      $moreBtn: null,
      $orderOkBtn: null
    },
    data: {},
    init: function init() {
      this.els.$backBtn = $('#backBtn');
      this.els.$orderTime = $('.orderTime');
      this.els.$progressStatus = $('.progressStatus');
      this.els.$deleteBtn = $('.btn-orderList-delete');
      this.els.$detailBtn = $('.orderDetailBtn');
      this.els.$objectName = $('.objectName');
      this.els.$buyQty = $('.buyQty');
      this.els.$moreBtn = $('#more-btn');
      this.els.$orderOkBtn = $('.orderOk');
    }, // end init

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      // 승인 전 주문 목록
      $.sendHttp({
        path: "/api/delivery/orderList",
        data: {
          progressStatus: '미승인'
        },
        succ: function (data) {
          var addCon = "";
          $.each(data.list, function (index, item) {
            addCon += "<li><div><div style='margin: 0.5em; margin-left: 1em;'><div style='width: auto;'>";
            addCon += "<div style='float: left; padding-right: 2em;' class='orderTime'>" + item.orderTime;
            addCon += "</div><div style='text-align: left; width:auto; '><span style='font-weight:bold;' class='progressStatus'>" + item.progressStatus;
            addCon += "</span><div style='float: right;'><img src='../img/btn-close-black.png' class='btn-orderList-delete'/></div>";
            addCon += "<div style='float: right;'>주문상세</div></div></div></div><div style='padding-bottom: 1em;'><div class='orderList-object-img'>";
            addCon += "<img class='orderList-object-img-detail' src='../img/curry.png'/></div><div class='orderList-menu-name'>" + item.objectName;
            addCon += "</div><div class='orderList-object-price'><div style='padding-right: 3em; float: left;'>수량:</div>";
            addCon += "<div style='float: left;' class='buyQty'>" + item.buyQty + "</div><div class='orderList-object-qty'>";
            addCon += "<img src='../img/ico-order-check.png' style='padding-bottom: 0.7em;' class='orderOk' id='" + item.orderNum + "'/></div></div></div></div></li>";
          });
          $('#add').append(addCon);
        },
        error: function (data) {
          alert('실패 ' + data);
        }
      });
    }, // end initView

    initEvent: function initEvent() {
      // Dom Event 바인딩
      this.els.$backBtn.on('click', function () {
        M.page.back();
      });

      // 주문 승인 하기
      $(document).on("click", ".orderOk", function () { // 동적으로 추가된 코드의 클릭 이벤트
        var num = $(this).attr('id');
        alert("num " + num);

        $.sendHttp({
          path: "/api/delivery/orderCheck",
          data: {
            orderNum: num
          },
          succ: function (data) {
            alert('주문이 승인되었습니다.');
            location.reload();
          },
          error: function (data) {
            alert('실패 ' + data);
          }
        });
      });

      this.els.$moreBtn.on('click', function () {
        $.sendHttp({
          path: "/api/delivery/orderList",
          data: {
            progressStatus: '미승인'
          },
          succ: function (data) {
            var addCon = "";
            $.each(data.list, function (index, item) {
              addCon += "<li><div><div style='margin: 0.5em; margin-left: 1em;'><div style='width: auto;'>";
              addCon += "<div style='float: left; padding-right: 2em;' class='orderTime'>" + item.orderTime;
              addCon += "</div><div style='text-align: left; width:auto; '><span style='font-weight:bold;' class='orderStatus'>" + item.orderStatus;
              addCon += "</span><div style='float: right;'><img src='../img/btn-close-black.png' class='btn-orderList-delete'/></div>";
              addCon += "<div style='float: right;'>주문상세</div></div></div></div><div style='padding-bottom: 1em;'><div class='orderList-object-img'>";
              addCon += "<img class='orderList-object-img-detail' src='../img/curry.png'/></div><div class='orderList-menu-name'>" + item.objectName;
              addCon += "</div><div class='orderList-object-price'><div style='padding-right: 3em; float: left;'>수량:</div>";
              addCon += "<div style='float: left;' class='buyQty'>" + item.buyQty + "</div><div class='orderList-object-qty'>";
              addCon += "<img src='../img/ico-order-check.png' style='padding-bottom: 0.7em;' class='orderOk' id='" + item.orderNum + "'/></div></div></div></div></li>";
            });
            $('#add').append(addCon);
          },
          error: function (data) {
            alert('실패 ' + data);
          }
        });
      });

    } // end initEvent
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