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
      $pwBtn: null,
      $out: null,
      $logout: null,
      $updateBtn: null,

      $id: null,
      $nameIpt: null,
      $phoneIpt: null,
      $emailIpt: null,
      $storeNameIpt: null,
      $deliveryStatusIpt: null,
      $pickupStatusIpt: null,
      $storeStartTimeIpt: null,
      $storeEndTimeIpt: null,
      $storePhoneIpt: null,
      $leastPriceIpt: null,
      $storeCategoryNumIpt: null,
      $holidayIpt: null,
      $orderAreaIpt: null,
      $deliveryPriceIpt: null,
      $phoneConBtn: null,
      $emailConBtn: null

    },
    data: {},
    init: function init() {
      this.els.$backBtn = $('#backBtn');
      this.els.$pwBtn = $('#pwUpdate');
      this.els.$out = $('#out');
      this.els.$logout = $('#logout');
      this.els.$updateBtn = $('#updateBtn');

      this.els.$id = $('#employeeId');
      this.els.$nameIpt = $('#employeeName');
      this.els.$phoneIpt = $('#employeePhone');
      this.els.$emailIpt = $('#employeeEmail');
      this.els.$storeNameIpt = $('#storeName');
      this.els.$deliveryStatusIpt = $('#deliveryStatus');
      this.els.$pickupStatusIpt = $('#pickupStatus');
      this.els.$storeStartTimeIpt = $('#storeStartTime');
      this.els.$storeEndTimeIpt = $('#storeEndTime');
      this.els.$storePhoneIpt = $('#storePhone');
      this.els.$leastPriceIpt = $('#leastPrice');
      this.els.$storeCategoryNumIpt = $('#storeCategoryNum');
      this.els.$holidayIpt = $('#holiday');
      this.els.$orderAreaIpt = $('#orderArea');
      this.els.$deliveryPriceIpt = $('#deliveryPrice');

      this.els.$phoneConBtn = $('#phoneConBtn');
      this.els.$emailConBtn = $('#emailConBtn');

    }, // end init

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      var self = this;
      var id = M.data.param('employeeId');

      $.sendHttp({
        path: "/api/store/detailStore",
        data: {
          employeeId: id
        },
        succ: function (data) {
          //                 alert("data.employeeId : " +data.employeeId);
          self.els.$id.val(id);
          self.els.$nameIpt.val(data.employeeName);
          self.els.$phoneIpt.val(data.employeePhone);
          self.els.$emailIpt.val(data.employeeEmail);
          self.els.$storeNameIpt.val(data.storeName);
          self.els.$deliveryStatusIpt.val(data.deliveryStatus);
          self.els.$pickupStatusIpt.val(data.pickupStatus);
          self.els.$storeStartTimeIpt.val(data.storeStartTime);
          self.els.$storeEndTimeIpt.val(data.storeEndTime);
          self.els.$storePhoneIpt.val(data.storePhone);
          self.els.$leastPriceIpt.val(data.leastPrice);
          self.els.$storeCategoryNumIpt.val(data.storeCategoryNum);
          self.els.$holidayIpt.val(data.holiday);
          self.els.$orderAreaIpt.val(data.orderArea);
          self.els.$deliveryPriceIpt.val(data.deliveryPrice);
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

      this.els.$out.on('click', function () {
        M.page.html('./goeun_login.html');
      });

      this.els.$logout.on('click', function () {
        M.page.html('./goeun_login.html');
      });

      this.els.$updateBtn.on('click', function () {
        var self = this;
        var employeeId = M.data.param('employeeId');
        var employeeName = $('#employeeName').val();
        var employeePhone = $('#employeePhone').val();
        var employeeEmail = $('#employeeEmail').val();
        var storeName = $('#storeName').val();
        var deliveryStatus = $('#deliveryStatus').val();
        var pickupStatus = $('#pickupStatus').val();
        var storeStartTime = $('#storeStartTime').val();
        var storeEndTime = $('#storeEndTime').val();
        var storePhone = $('#storePhone').val();
        var leastPrice = $('#leastPrice').val();
        var storeCategoryNum = $('#storeCategoryNum').val();
        var holiday = $('#holiday').val();
        var orderArea = $('#orderArea').val();
        var deliveryPrice = $('#deliveryPrice').val();

        console.log("employeeId " + employeeId);
        console.log("employeeName " + employeeName);
        console.log("employeePhone " + employeePhone);
        console.log("employeeEmail " + employeeEmail);
        console.log("storeName " + storeName);
        console.log("deliveryStatus " + deliveryStatus);
        console.log("pickupStatus " + pickupStatus);
        console.log("storeStartTime " + storeStartTime);
        console.log("storeEndTime " + storeEndTime);
        console.log("storePhone " + storePhone);
        console.log("leastPrice " + leastPrice);
        console.log("storeCategoryNum " + storeCategoryNum);
        console.log("holiday " + holiday);
        console.log("orderArea " + orderArea);
        console.log("deliveryPrice " + deliveryPrice);

        $.sendHttp({
          path: "/store/updateStore",
          data: {
            'employeeId': M.data.param('employeeId'),
            'employeeName': employeeName,
            'employeePhone': employeePhone,
            'employeeEmail': employeeEmail,
            'storeName': storeName,
//            'deliveryStatus': deliveryStatus,
//            'pickupStatus': pickupStatus,
//            'storeStartTime': storeStartTime,
//            'storeEndTime': storeEndTime,
            'storePhone': storePhone,
            'leastPrice': leastPrice,
            'storeCategoryNum': storeCategoryNum,
            'holiday': holiday,
            'orderArea': orderArea,
            'deliveryPrice': deliveryPrice
          },
          succ: function (data) {
            alert('수정 완료');
            M.page.back();
          },
          error: function (data) {
            alert('수정 실패');
          }
        });
      });
      this.els.$pwBtn.on('click', function () {
        M.page.html('./eunjin_userInfo_changePw.html');
      });

      this.els.$phoneConBtn.on('click', function () {
        $.sendHttp({
          path: "/store/phoneCon",
          data: {
            employeeId: M.data.param('employeeId')
          },
          succ: function (data) {
            alert('일치합니다.');
          },
          error: function (data) {
            alert(" 일치하지 않습니다.");
          }
        });
      });
      this.els.$emailConBtn.on('click', function () {
        $.sendHttp({
          path: "/store/emailCon",
          data: {
            employeeId: M.data.param('employeeId')
          },
          succ: function (data) {
            alert('일치합니다.');
          },
          error: function (data) {
            alert(" 일치하지 않습니다.");
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