/**
 * @file : userInfo_orderDetail_member.js
 * @author : 배지원
 * @date : 2022-04-11
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var phone;
  var page = {
    els: {
      $backBtn: null,
      $callBtn: null,
      $goStoreBtn: null,
      $deleteBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$backBtn = $('#backBtn');
      this.els.$callBtn = $('#call-btn');
      this.els.$goStoreBtn = $('#goStoreBtn');
      this.els.$deleteBtn = $('#deleteBtn');
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
          if (data.orderStatus == '주문 완료') {
            $('#orderStatus').text("주문 확인 중입니다.");
          } else if (data.orderStatus == '주문 취소') {
            $('#orderStatus').text("주문이 취소되었어요.");
          } else if (data.orderStatus == '조리 중') {
            $('#orderStatus').text("주문이 승인되었습니다. 조리중이에요.");
          } else if (data.orderStatus == '조리 완료') {
            $('#orderStatus').text("조리가 완료되었어요.");
          } else if (data.orderStatus == '배달대기중') {
            $('#orderStatus').text("라이더님이 픽업하고 있어요.");
          } else if (data.orderStatus == '배달완료') {
            $('#orderStatus').text("배달이 완료되었습니다.");
          } else if (data.orderStatus == '픽업대기중') {
            $('#orderStatus').text("준비가 완료되었습니다. 픽업 가능합니다.");
          } else if (data.orderStatus == '픽업대기중') {
            $('#orderStatus').text("픽업이 완료되었습니다.");
          }
          phone = data.storePhone;
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
            items += "<h3><span style='font-size:15px;font-weight:bold;'>" + item.objectName + "</span><span style=' float: right;font-size: 15px;'>" + item.menuPrice + " 원</span><span style='margin-left:10px; font-size:15px;font-weight:bold;color: #666;'>" + item.menuQty + " 개</span></h3>";
          });
          $("#card").append(items);

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
      this.els.$goStoreBtn.on('click', function () {
        M.page.html({
          url: "./jiwon_store_menulist.html",
          param: {
            'storeNum': M.data.global('storeNum')
          }
        })
      });
      this.els.$deleteBtn.on('click', function () {

        M.pop.alert({
          title: '확인',
          message: '삭제하시겠습니까?',
          buttons: ['확인', '취소'],
          callback: function (index) {
            if (index == 0) {
              self.deleteMyorderList();
            }
          }
        });

      })
    },
    deleteMyorderList: function () {
      var self = this;
      $.sendHttp({
        path: "/api/payment/paymentDelete",
        data: {
          'orderNum': M.data.global('orderNum'),
          'memberNum': M.data.global('memberNum')
        },
        succ: function (data) {
          console.log(data);
          M.page.html({
            path: "./eunjin_userInfo_myOrderList_member.html"
          });
        },
        error: function (data) {
          alert("주문목록 삭제에 실패했습니다. 다시 시도해주세요.");
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