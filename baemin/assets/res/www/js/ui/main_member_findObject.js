/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $findObjectBtn: null,
      $menuSearch: null
    },
    data: {},
    init: function init() {
      this.els.$findObjectBtn = $('#find-object-btn');
      this.els.$menuSearch = $('#menu-search');
    },

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
    },

    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;

      this.els.$findObjectBtn.on('click', function () {
        self.findObject();
      });

    },

    findObject: function () {
      var self = this;
      var menuSearch = this.els.$menuSearch.val().trim();
      if (menuSearch == '') {
        return alert('찾을 메뉴를 입력해주세요');
      }

      $.sendHttp({
        path: SERVER_PATH.FIND_OBJECT,
        data: {
          menuSearch: menuSearch,
        },
        succ: function (data) {
          console.log(data);
          alert('찾으시는 ' + data.objectName+' 메뉴입니다.');
          M.page.html({
            url: './jiwon_storelist_delivery.html',
            actionType: 'CLEAR_TOP'
          });
        },
        error: function (data) {
          console.log(data);
          alert('해당하는 메뉴가 없습니다.');
        }
      });
    }
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