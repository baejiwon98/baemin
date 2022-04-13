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
      $orderList: null,
      $orderTime: null,
      $orderStatus: null,
      $deleteBtn: null,
      $detailBtn: null,
      $objectName: null,
      $buyQty: null,
      $moreBtn: null
    },
    data: {},
    init: function init() {
      this.els.$backBtn = $('.back-btn');
      this.els.$orderList = $('#order-list');
      this.els.$orderTime = $('.orderTime');
      this.els.$orderStatus = $('.orderStatus');
      this.els.$deleteBtn = $('.btn-orderList-delete');
      this.els.$detailBtn = $('.orderDetailBtn');
      this.els.$objectName = $('.orderList-menu-name');
      this.els.$buyQty = $('.buyQty');
      this.els.$moreBtn = $('#more-btn');
    }, // end init

    initView: function initView() {
      // 화면에서 세팅할 동적데이터

      M.data.global('storeNum', 'store10001'); // 임의의 값

      var self = this;
      var num = M.data.global('storeNum');
      //      alert("num " + num);

      // 마이페이지 주문 목록
      $.sendHttp({
        path: "/api/store/orderList",
        data: {
          storeNum: num
        },
        succ: function (data) {
          alert("data.list[1].orderTime = " + data.list[1].orderTime);
          var addCon = "";

           $.each(data.list, function(index, item) {
//            alert('data.list[' + i + '].orderNum = ' + item.orderNum);
            addCon += "<li style='padding-bottom: 2.5em;' class='seq'><div><div style='margin: 0.5em; margin-left: 1em;'>";
            addCon += "<div style='width: auto;'><div style='float: left; padding-right: 2em;' class='orderTime'>" + item.orderTime;
            addCon += "</div><div style='text-align: left; width:auto; '><span style='font-weight:bold;'class='progressStatus'>" + item.progressStatus;
            addCon += "</span><div style='float: right;'><img src='../img/btn-close-black.png' class='btn-orderList-delete' /></div> "
            addCon += "<div style='float: right; ' class='orderDetailBtn'>주문상세</div></div></div></div>"
            addCon += "<div style='padding-bottom: 1em;'><div class='orderList-object-img'><img class='orderList-object-img-detail' src='../img/curry.png'/></div>"
            addCon += "<div class='orderList-menu-name' style='padding-top: 35px;'>" + item.objectName + "</div><div class='orderList-object-price'>"
            addCon += "<div style='padding-right: 3em; float: left;'>수량:</div><div style='float: left;' class='buyQty'>" + item.buyQty;
            addCon += "</div></div></div></div></li>";
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