/**
 * @file :
 * @author :
 * @date :
 */

// 페이지 단위 모듈

//순서 중요//parameter// argument와 일치 확인
(function ($, M, window, CONFIG) {
//  var ENV = CONFIG.ENV;
//  var MSG = CONFIG.MSG;
//  var CONSTANT = CONFIG.CONSTANT;
//  var SERVER_CODE = CONFIG.SERVER_CODE;
  var SERVER_PATH = CONFIG.SERVER_PATH;
  M.data.removeGlobal('seqNo');
  M.data.removeGlobal('imgUrl');
  M.data.removeGlobal('imgName');
  var seqNum;

  var page = {
    els: {
        $backBtn : null,
        $storeMenulistBtn : null,
        $storeDetailBtn : null,
        $storeReviewBtn : null,

        $findStoreMenuBtn : null,//
        $updateMainSubMenuBtn : null,//
        $createStoreMenuBtn : null,
        $topBtn : null
    },
    data: {},
    init: function init() {
        this.els.$backBtn = $('#backBtn');
        this.els.$storeMenulistBtn = $('#store-menulist-btn');
        this.els.$storeDetailBtn = $('#store-detail-btn');
        this.els.$storeReviewBtn = $('#store-review-btn');

        this.els.$findStoreMenuBtn = $('#find-store-menu-btn');//
        this.els.$updateMainSubMenuBtn = $('#update-store-menu-btn');//
        this.els.$createStoreMenuBtn = $('#create-store-menu-btn');
        this.els.$topBtn = $('#top-btn');
    }, // end init

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      $.sendHttp({
        path: "api/object/readStoreMenu",
        data: {
          "memberId": M.data.global('memberId'),
          "lastSeqNo": '0'
//          "cnt": '6',
        },
        succ: function (data) {
          console.log(data);
          var items = "";
          $.each(data.list, function (index, item) {
            var count = 6;
            items += "<li class='noticeBoard' id='" + item.seqNo + "'>";


            items += "<div class='store-object-category-title'>";

            items += "<div class='object-category'>";
            items += "<strong>";
//            items += "<img src='" + item.imgUrl + " ' alt=''/>";
            items += item.menuCategoryName;
            items += "</strong>";
            items += "</div>";

            items += "<div class='fa menu-icon'>";
            items += "<button type='button' class='modify-btn-menu' id='update-store-menu-btn'>";
//            items += "<img src='" + item.imgUrl + " ' alt=''/>";
            items += item.menuCategoryName;
            items += "</button>";
            items += "</div>";

            items += "<ul>";
            items += "<li>";
            items += "<div class='object-container'>";

            items += "<div class='object-imgs'>";
            items += "<img src= '" + item.imgUrl + "' align='center' class='object-img'/>";
            items += "</div>";

            items += "<div class='object-main'>";
            items += "<div class='object-title'>";
            items += "<strong>";
            items += item.menuName;
            items += "</strong>";
            items += "</div>";

            items += "<div class='object-content'>";
            items += "<p>";
            items += item.menuContent;
            items += "</p>";
            items += "</div>";

            items += "<div class='object-price'>";
            items += "<strong>";
            items += item.menuPrice;
            items += "</strong>";
            items += "</div>";

            items += "</div>";
            items += "</div>";
            items += "</li>";
            seqNum = item.seqNo;
          });


          $("#munuBox").append(items);
          console.log(seqNum);
        },
        error: function (data) {
          console.log(data);
          alert("리스트를 가져오지 못했습니다.");
        },
      });


    }, // end initView

    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;

        $('#menuBox').on('click', '.noticeBoard', function () {
            var seqNo = $(this).attr('id');
            console.log(seqNo);

            M.data.global({
              'seqNo': seqNo
            });
            console.log(M.data.global('seqNo'));
            M.page.html({
              url: './goeun_store_object_detail.html',
              action: 'NO_HISTORY',
            });
          }),

//////////
      this.els.$backBtn.on('click', function () {
//        M.page.html('./saetbyeol_main_employee.html');
        M.page.back();
      });
      this.els.$storeMenulistBtn.on('click', function () {
        M.page.html('jiwon_store_menulist.html');
      });
      this.els.$storeDetailBtn.on('click', function () {
        M.page.html('jiwon_store_detail_modify.html');
      });
      this.els.$storeReviewBtn.on('click', function () {
        M.page.html('jiwon_store_reviewlist.html');
      });
//////////
//$findStoreMenuBtn 추가필요

      this.els.$createStoreMenuBtn.on('click', function () {
        var pagelist = M.info.stack();
        console.log(pagelist);
        M.page.html({
          url: './jiwon_store_object_write.html',
        });
      });

      this.els.$topBtn.on("click", function () {
        $('.cont-wrap').scrollTop(0);
      });

      this.els.$updateMainSubMenuBtn.on('click', function () {
        M.page.html('jiwon_store_object_write.html');
      });


    } // end initEvent
  }; // end page
  window.__page__ = page;
})(jQuery, M, window, __config__);
//순서 중요//argument

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