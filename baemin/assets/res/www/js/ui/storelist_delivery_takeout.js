/**
 * @file :
 * @author :
 * @date :
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var page = {
    els: {
      $categoryChange: null,
      $store1: null,
      $userInfoBtn: null,
      $topBtn: null,

      $storeName: null,
      $objectName: null,
      $objectImage: null,
      $leastPrice: null,
      $deliveryPrice: null
    },
    data: {},
    init: function init() {
      this.els.$categoryChange = $('#takeout-category-change');
      this.els.$store1 = $('#store1');
      this.els.$userInfoBtn = $('#userInfo-btn');
      this.els.$topBtn = $('#top-btn');

      this.els.$storeName = $('.storeName');
      this.els.$objectName = $('#objectName');
      this.els.$objectImage = $('.objectImage');
      this.els.$leastPrice = $('.leastPrice');
      this.els.$deliveryPrice = $('.deliveryPrice');
    },
    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      // 배달/포장 메뉴 목록
      M.data.global('storeCategoryNum', 'k'); // 임의의 값 // 이전 페이지에서 한식,중식,양식,일식,분식 따라서 다른 값 받아오기
      var num = M.data.global('storeCategoryNum');
      //      alert("num " + num);

      M.data.global('deliveryStatus', '0'); // 임의의 값 // 0은 no, 1은 yes // 이전 페이지에서 배달(0 또는 1)값 받아오기
      var deliveryStatus = M.data.global('deliveryStatus');
      //      alert("deliveryStatus " + deliveryStatus);

      M.data.global('pickupStatus', '1'); // 임의의 값 // 0은 no, 1은 yes // 이전 페이지에서 포장(0 또는 1)값 받아오기
      var pickupStatus = M.data.global('pickupStatus');
      //      alert("pickupStatus " + pickupStatus);

      $.sendHttp({
        path: "/api/store/menuList",
        data: {
          storeCategoryNum: num,
          deliveryStatus: deliveryStatus,
          pickupStatus: pickupStatus
        },
        succ: function (data) {
          var addCon = "";
          $.each(data.list, function (index, item) {
            addCon += "<li class='object-menu' id='store1'>";
            addCon += "<div class=''><div class='object-menu-img'>";
//            if (item.objectOrigin != null) {
              addCon += "<img src='../img/" + item.objectOrigin + "' class='objectImage' />";
//            }
            addCon += "</div></div><div class='info'><div class='info-box'><strong class='storeName'>" + item.storeName;
            addCon += " </strong></div><div class='info-box'> <div class='fa fa-star checked' id='Allstars'></div>";
            addCon += "<strong>" + item.reviewScore + "</strong><strong class='object-Repre' id='objectName'>" + item.objectName + "</strong></div>";
            addCon += "<div class='info-box-bottom'><div class='fa object-price'><strong>최소주문금액&nbsp;</strong>";
            addCon += "<strong class='leastPrice'>" + item.leastPrice + "</strong></div><div class='fa object-deltip'><strong>배달팁&nbsp;</strong>";
            addCon += "<strong class='deliveryPrice'>" + item.deliveryPrice + "</strong></div></div></div></li>";
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
      var self = this;
      this.els.$userInfoBtn.on('click', function () {
        M.page.html({
          url: './eunjin_userInfo_info_member.html',
        });
      });
      this.els.$categoryChange.on('click', function () {
        M.page.replace('./jiwon_storelist_takeout.html');
      });
      this.els.$store1.on('click', function () {
        M.page.html('./jiwon_store_menulist.html');
      });

      // top
      this.els.$topBtn.on('click', function () {
        $('html, body').scrollTop(0);
      });



    }, // end initEvent
  }; // end page
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