/**
 * @file : orderDetail_employee_all.js
 * @author : 배지원
 * @date : 2022-04-17
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var status;
  var pickUpStatus;
  var page = {
    els: {
      $backBtn: null,
      $callBtn: null,
      $okBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$backBtn = $('#backBtn');
      this.els.$callBtn = $('#call-btn');
      this.els.$okBtn = $('#okBtn');
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
          } else {
            pickUpStatus = 'Y';
          }
          confirm = data.memAddress;
          if (data.orderStatus == '주문 완료') {
            $('#orderStatus').text("주문 확인 중입니다.");
            $('#btnName').text("'지금 들어온 주문'에서 주문 승인을 해주세요");
            $('#okBtn').attr("disabled", "disabled");
          } else if (data.orderStatus == '주문 취소') {
            $('#orderStatus').text("주문이 취소되었어요.");
            $('#btnName').text("주문취소");
            $('#okBtn').attr("disabled", "disabled");
          } else if (data.orderStatus == '조리 중') {
            $('#orderStatus').text("주문이 승인되었습니다. 조리중이에요.");
            $('#btnName').text("조리완료");
          } else if (data.orderStatus == '조리 완료') {
            $('#orderStatus').text("조리가 완료되었어요.");
            $('#btnName').text("라이더님과의 매칭을 기다리는 중이에요.");
            $('#okBtn').attr("disabled", "disabled");
          } else if (data.orderStatus == '배달대기중') {
            $('#orderStatus').text("라이더님이 픽업하고 있어요.");
            $('#btnName').text("라이더님이 픽업하셨나요?");
          } else if (data.orderStatus == '배달 중') {
            $('#orderStatus').text("라이더님이 배달하고 있어요.");
            $('#btnName').text("라이더님이 배달중입니다.");
            $('#okBtn').attr("disabled", "disabled");
          } else if (data.orderStatus == '배달 완료') {
            $('#orderStatus').text("배달이 완료되었습니다.");
            $('#btnName').text("배달이 완료되었습니다.");
            $('#okBtn').attr("disabled", "disabled");
          } else if (data.orderStatus == '픽업대기중') {
            $('#orderStatus').text("준비가 완료되었습니다. 픽업 가능합니다.");
            $('#btnName').text("고객님이 픽업하셨나요?");
          } else if (data.orderStatus == '픽업 완료') {
            $('#orderStatus').text("픽업이 완료되었습니다.");
            $('#btnName').text("픽업이 완료되었습니다.");
            $('#okBtn').attr("disabled", "disabled");
          }
          $('#orderStoreName').text(data.storeName);
          $('#orderNum').text(data.orderNum);
          $('#totalOrderPrice').text(data.orderTotalPrice - data.deliveryPrice + " 원");
          $('#deliveryTip').text(data.deliveryPrice + " 원");
          $('#totalPaymentPrice').text(data.orderTotalPrice + " 원");
          $('#memberPhone').text(data.memPhone);
          if (data.storeRequest != null) {
            $('#storeRequest').text(data.storeRequest);
          } else {
            $('#storeRequest').text(' 매장 요청사항 없음 ');
          }
          if (data.paymentCategory == "smart") {
            $('#paymentWay').text("간편 결제");
          } else if (data.paymentCategory == "card") {
            $('#paymentWay').text("카드 결제");
          } else {
            $('#paymentWay').text("현금 결제");
          }
          $('#orderDate').text(data.orderTime.substring(0, 4) + '년 ' + data.orderTime.substring(5, 7) + "월 " + data.orderTime.substring(8, ) + "일");
          var items = "";
          $.each(data.list, function (index, item) {
            items += "<h3><span style='font-size:15px;font-weight:bold;'>" + item.objectName + "</span><span style=' float: right;font-size: 15px;'>" + item.menuPrice + " 원</span><span style='margin-right:30px;float:right; font-size:15px;font-weight:bold;color: #666;'>" + item.menuQty + " 개</span></h3>";
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

      this.els.$backBtn.on('click', function () {
        M.page.back();
      });
      this.els.$callBtn.on('click', function () {
        M.sys.call(phone);
      });
      this.els.$okBtn.on('click', function () {
        if (status == '조리 중') {
          if (pickUpStatus != 'Y') {
            self.complete();
          } else {
            self.pickReady();
          }
        } else if (status == '조리 완료') {
          self.deliveryReady();
        } else if (status == '픽업대기중') {
          self.pickComplete();
        } else if (status == '배달대기중') {
          self.deliveryStart();
        }
      });
    },
    complete: function () {
      var self = this;
      $.sendHttp({
        path: "/api/payment/statusCookEnd",
        data: {
          'orderNum': M.data.global('orderNum')
        },
        succ: function (data) {
          console.log(data);
          M.page.replace({
            path: "./eunjin_userInfo_orderDetail_employee_all.html"
          });
        },
        error: function (data) {
          alert("조리 완료 처리에 실패했습니다. 다시 시도해주세요.");
        }
      });
    },
    pickReady: function () {
      var self = this;
      $.sendHttp({
        path: "/api/payment/statusPickUpWait",
        data: {
          'orderNum': M.data.global('orderNum')
        },
        succ: function (data) {
          console.log(data);
          M.page.replace({
            path: "./eunjin_userInfo_orderDetail_employee_all.html"
          });
        },
        error: function (data) {
          alert("픽업 대기중 처리에 실패했습니다. 다시 시도해주세요.");
        }
      });
    },
    deliveryReady: function () {
      var self = this;
      $.sendHttp({
        path: "/api/payment/statusDeliveryWait",
        data: {
          'orderNum': M.data.global('orderNum')
        },
        succ: function (data) {
          console.log(data);
          M.page.replace({
            path: "./eunjin_userInfo_orderDetail_employee_all.html"
          });
        },
        error: function (data) {
          alert("라이더 매칭 요청에 실패했습니다. 다시 시도해주세요.");
        }
      });
    },
    pickComplete: function () {
      var self = this;
      $.sendHttp({
        path: "/api/payment/statusPickUpEnd",
        data: {
          'orderNum': M.data.global('orderNum')
        },
        succ: function (data) {
          console.log(data);
          M.page.replace({
            path: "./eunjin_userInfo_orderDetail_employee_all.html"
          });
        },
        error: function (data) {
          alert("픽업 완료 처리에 실패했습니다. 다시 시도해주세요.");
        }
      });
    },
    deliveryStart: function () {
      var self = this;
      $.sendHttp({
        path: "/api/payment/statusDeliverying",
        data: {
          'orderNum': M.data.global('orderNum')
        },
        succ: function (data) {
          console.log(data);
          M.page.replace({
            path: "./eunjin_userInfo_orderDetail_employee_all.html"
          });
        },
        error: function (data) {
          alert("배달 시작 처리에 실패했습니다. 다시 시도해주세요.");
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