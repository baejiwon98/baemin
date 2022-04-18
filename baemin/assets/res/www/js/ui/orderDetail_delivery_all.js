/**
 * @file : orderDetail_delivery_all.js
 * @author : 배지원
 * @date : 2022-04-17
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var phone;
  var status;
  var page = {
    els: {
      $backBtn: null,
      $callBtn: null,
      $okBtn: null,
      $callBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$backBtn = $('#backBtn');
      this.els.$callBtn = $('#call-btn');
      this.els.$okBtn = $('#okBtn');
      this.els.$callBtn = $('#call-btn');
    },

    initView: function initView() {
      var self = this;
      $.sendHttp({
        path: "/api/payment/paymentDetail",
        data: {
          orderNum: M.data.global("orderNum"),
        },
        succ: function (data) {
          console.log(data);
          phone = data.storePhone;
          status = data.orderStatus;
          if (data.memAddress != null) {
            var addr = "";
            addr += "<div style='margin-bottom: 0.5em'><h3 style='font-size:15px;font-weight:bold;'>배달 주소</h3></div>";
            addr += "<span>" + data.memAddress + "</span>";
            $('#addr').append(addr);

            var deliveryRequest = "";
            deliveryRequest += "<div style='margin-bottom: 0.5em'><h3 style='font-size:15px;font-weight:bold;'>라이더에게 요청사항</h3></div>";
            if (data.deliveryRequest != null || data.deliveryRequest != 'null') {
              deliveryRequest += "<span> 라이더 요청사항 없음 </span>"
            } else {
              deliveryRequest += "<span>" + data.deliveryRequest + "</span>"
            }
            $('#deliveryRequest').append(deliveryRequest);
          }
          confirm = data.memAddress;
          if (data.orderStatus == '조리 완료') {
            $('#orderStatus').text("라이더님과의 매칭을 기다리는 중이에요.");
            $('#btnName').text("매칭 승인");
          } else if (data.orderStatus == '배달대기중') {
            $('#orderStatus').text("라이더님을 기다리고 있어요");
            $('#btnName').text("음식을 픽업하셨나요?");
            $('#okBtn').attr("disabled", "disabled");
          } else if (data.orderStatus == '배달 중') {
            $('#orderStatus').text("안전 운행하세요");
            $('#btnName').text("고객님께 음식을 전달하셨나요?");
          } else if (data.orderStatus == '배달 완료') {
            $('#orderStatus').text("배달이 성공적으로 완료되었습니다.");
            $('#btnName').text("배달이 완료되었습니다.");
            $('#okBtn').attr("disabled", "disabled");
          }
          $('#orderStoreName').text(data.storeName);
          $('#orderNum').text(data.orderNum);
          $('#totalOrderPrice').text(data.orderTotalPrice - data.deliveryPrice + " 원");
          $('#deliveryTip').text(data.deliveryPrice + " 원");
          $('#totalPaymentPrice').text(data.orderTotalPrice + " 원");
          $('#memberPhone').text(data.memPhone);
          $('#storeAddr').text(data.storeAddr)
          if (data.storeRequest != null) {
            $('#storeRequest').text(data.storeRequest);
          } else {
            $('#storeRequest').text(' 매장 요청사항 없음 ');
          }
          if (data.paymentCategory == "smart") {
            $('#paymentWay').text("간편결제");
          } else if (data.paymentCategory == "card") {
            $('#paymentWay').text("카드결제");
          } else {
            $('#paymentWay').text("현금결제");
          }
          $('#orderDate').text(data.orderTime.substring(0, 4) + '년 ' + data.orderTime.substring(5, 7) + "월 " + data.orderTime.substring(8, ) + "일");
          var items = "";
          $.each(data.list, function (index, item) {
            items += "<h3><span style='font-size:15px;font-weight:bold;'>" + item.objectName + "</span><span style=' float: right;font-size: 15px;'>" + item.menuPrice + " 원</span><span style='margin-left:10px; font-size:15px;font-weight:bold;color: #666;'>" + item.menuQty + " 개</span></h3>";
          });
          $("#card").append(items);
        },
        error: function (data) {
          console.log(data);
          alert('주문 상세정보를 불러오지 못했습니다. 다시 시도해주세요.');
        }
      });
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;

      this.els.$callBtn.on('click', function () {
        M.sys.call(phone);
      });

      this.els.$backBtn.on('click', function () {
        M.page.back();
      });
      this.els.$callBtn.on('click', function () {
        M.sys.call(phone);
      });
      this.els.$okBtn.on('click', function () {
        if (status == '조리 완료') {
          self.deliveryOk();
        } else if (status == '배달 중') {
          self.deliveryComplete();
        }
      });
    },
    deliveryOk: function () {
      var self = this;
      $.sendHttp({
        path: "/api/payment/statusDeliveryWait",
        data: {
          'orderNum': M.data.global('orderNum'),
          'deliveryNum': M.data.global('deliveryNum')
        },
        succ: function (data) {
          console.log(data);
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);
          M.page.replace({
            path: "./eunjin_orderList_delivery_mine.html"
          });
        },
        error: function (data) {
          alert("배달 매칭 처리에 실패했습니다. 다시 시도해주세요.");
        }
      });
    },
    deliveryComplete: function () {
      var self = this;
      $.sendHttp({
        path: "/api/payment/statusDelvieryEnd",
        data: {
          'orderNum': M.data.global('orderNum'),
          'deliveryNum': M.data.global('deliveryNum')
        },
        succ: function (data) {
          console.log(data);
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);
          M.page.replace({
            path: "./eunjin_orderList_delivery_complete.html"
          });
        },
        error: function (data) {
          alert("배달 완료 처리에 실패했습니다. 다시 시도해주세요.");
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