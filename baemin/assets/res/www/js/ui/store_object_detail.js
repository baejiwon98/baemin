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
      $backBtn: null,
      $modiBtn: null,
      $delBtn: null
    },
    data: {},
    init: function init() {
      this.els.$backBtn = $('#backBtn');
      this.els.$modiBtn = $('#modiBtn');
      this.els.$delBtn = $('#delBtn');
    },

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      $.sendHttp({
        path: "/api/object/readStoreMenu",
        data: {
          "memberId": M.data.global('memberId'),
          "seqNo": M.data.global('seqNo'),
        },
        succ: function (data) {
          console.log(M.data.global('seqNo'));
          console.log(data);
          var items = "";
          items += "<section class='object-main-detail'>";

          if (data.imgUrl != null) {

            items += "<div class='img-wrap'>";
            items += "<img id='imgUrl' src='" + data.imgUrl + "'/>";
            items += "</div>";

            M.data.global("imgUrl", data.imgUrl);

            var split = data.imgUrl.lastIndexOf('/');
            var imgName = data.imgUrl.toString().substring(split + 1, );

            M.data.global("imgName", imgName);
            console.log(imgName);

          }

          items += "<div class='object-main-top'>";

              items += "<div class='fa object-main-title' id='title'>";
              items += "<strong>";
              items += data.title;
              items += "</strong>";
              items += "</div>";

              items += "<div class='fa object-main-origin' id='origin'>";
              items += "<strong>";
              items += "원산지";
              items += "</strong>";
              items += "<strong>";
              items += data.origin;
              items += "</strong>";
              items += "</div>";

          items += "</div>";

          items += "<div class='fa object-main-content' id='content'>";
          items += "<p>";
          var content = data.content;
          items += data.content;
          console.log(content);
//          content = content.replace(/\r\n/ig, '<br>');
//          content = content.replace(/\\n/ig, '<br>');
//          content = content.replace(/\n/ig, '<br>');
          items += content;
          items += "<br><br><br>";
          items += "</p>";
          items += "</div>";

          items += "</section>";

          M.data.global("isMyYn", data.isMyNoticeYn);

          M.data.global("title", data.title);
          M.data.global("origin", data.origin);
          M.data.global("content", data.content);

          $("#notice-select").html(items);
          console.log(M.data.global('isMyYn'));
          if (data.isMyNoticeYn == 'Y') {
            document.getElementById("myButtons").style.display = "";
          } else {
            document.getElementById("myButtons").style.display = "none";
          }
        },
        error: function (data) {
          console.log(data);
          alert("메뉴 상세 페이지를 가져오지 못했습니다.");
        },
      });
    },

    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;

      this.els.$backBtn.on('click', function () {
        M.page.back();
      });
      this.els.$modiBtn.on('click', function () {
        self.modify();
      });
      this.els.$delBtn.on('click', function () {
        self.del();
      });
    },

    modify: function () {
      var self = this;
      var id = M.data.global('memberId');

      var title = M.data.global('title');
      var content = M.data.global('content');

      var seqNo = M.data.global('seqNo');

      var imgPath = M.data.global('imgUrl');
      var imgName = M.data.global('imgName');


      M.page.html({
        path: './jiwon_store_object_write.html',
        param: {
          "memberId": id,

          "title": title,
          "content": content,

          "seqNo": seqNo,

          "imgPath": imgPath,
          "imgName": imgName,
        }
      });

    },

    del: function () {
      var self = this;
      $.sendHttp({
        path: "/api/object/menuDelete",
        data: {
          memberId: M.data.global('memberId'),
          seqNo: M.data.global('seqNo'),
        },
        succ: function (data) {
          console.log(data);
          alert('메뉴가 삭제되었습니다.');
          M.page.html({
            url: './jiwon_store_category_modify.html',
          });
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);
        },
        error: function (data) {
          console.log(data);
          alert('메뉴 삭제가 실패했습니다.');
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