/**
 * @file : userInfo_reviewWrite_member.js
 * @author : 배지원
 * @date : 2022-04-12
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var page = {
    els: {
      $backBtn: null,
      $starRating: null,
      $writeBtn: null,
      $contentIpt: null,
      $fileIpt: null,
      $fileBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$backBtn = $('#backBtn');
      this.els.$starRating = $("input[name=rating]");
      this.els.$writeBtn = $('#writeBtn');
      this.els.$contentIpt = $("#content");
      this.els.$fileIpt = $("#file");
      this.els.$fileBtn = $('#fileBtn');
    },

    initView: function initView() {
      var self = this;
      if (M.data.param('reviewScore') == 1) {
        $("input:radio[name ='rating']:input[value='1']").attr("checked", true);
      } else if (M.data.param('reviewScore') == 2) {
        $("input:radio[name ='rating']:input[value='2']").attr("checked", true);
      } else if (M.data.param('reviewScore') == 3) {
        $("input:radio[name ='rating']:input[value='3']").attr("checked", true);
      } else if (M.data.param('reviewScore') == 4) {
        $("input:radio[name ='rating']:input[value='4']").attr("checked", true);
      } else if (M.data.param('reviewScore') == 5) {
        $("input:radio[name ='rating']:input[value='5']").attr("checked", true);
      }
      console.log(M.data.param('reviewContent'));
      console.log(M.data.param('reviewImage'));
      if (M.data.param('reviewContent') == 'null') {
        this.els.$contentIpt.val('');
      } else {
        this.els.$contentIpt.val(M.data.param('reviewContent'));
      }
      if (M.data.param('reviewImage') == 'null') {
        this.els.$fileIpt.val('');
      } else {
        this.els.$fileIpt.val(M.data.param('reviewImage'));
      }
      if (M.data.param('modify') == 'Y') {
        $("input:radio[name='rating']").attr("disabled", "disabled"); //비활성화
      }
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$backBtn.on('click', function () {
        M.page.back();
      });
      this.els.$writeBtn.on('click', function () {
        if (M.data.param('modify') != 'Y') {
          if (self.data.imgPath == '' || self.data.imgPath == null) {
            self.reviewWrite();
          } else {
            console.log(self.data.imgPath);
            self.reviewWriteUpload(self.data.imgPath);
          }
        } else {
          if (self.data.imgPath == '' || self.data.imgPath == null) {
            self.reviewModify();
          } else {
            self.reviewModifyUpload(self.data.imgPath)();
          }
        }
      });
      this.els.$fileBtn.on('click', function () {
        self.getfile();
      });
    },
    getfile: function () {
      var self = this;
      M.media.picker({
        mode: "SINGLE",
        media: "PHOTO",
        column: 3,
        callback: function (status, result) {
          if (status == 'SUCCESS') {
            self.data.imgPath = result.fullpath;
            self.els.$fileIpt.val(result.name);
          } else {
            self.data.imgPath = null;
            self.els.$fileIpt.val('');
          }
        }
      });
    },

    reviewModifyUpload : function (imgPath) {
    var self = this;
      var score = $('input[name=rating]:checked').val();
      var content = this.els.$contentIpt.val();
      var body = [
        { name: "orderNum", content: M.data.global('orderNum'), type: "TEXT" }, //주문목록에서 orderNum, storeNum, 가져와야 함.
        { name: "reviewScore", content: score, type: "TEXT" },
        { name: "reviewContent", content: content, type: "TEXT" },
        { name: "memberNum", content: M.data.param('memberNum'), type: "TEXT" },
        { name: "reviewImage", content: imgPath, type: "FILE" },
        { name: "storeNum", content: M.data.param('storeNum'), type: "TEXT" },
      ]
      console.log(body);
      $.fileHttpSend({
        path: "/api/review/updateWithUpload",
        body: body,
        succ: function (body) {
          console.log(body);
          alert('성공');
          M.page.replace({
            url: './jiwon_userInfo_reviewlist_member.html',
          });
        },
        progress: function (body) {
          console.log(body);
        },
        error: function (body) {
          console.log(body);
          alert('실패쓰');
        }
      })
    },

    reviewModify: function () {
      var self = this;
      var content = this.els.$contentIpt.val();
      $.sendHttp({
        path: "/api/review/myreviewupdate",
        data: {
          orderNum: M.data.global('orderNum'),
          memberNum: M.data.global('memberNum'),
          reviewContent: content,
          storeNum: M.data.param('storeNum'),
        },
        succ: function (data) {
          console.log(data);
          M.page.html({
            path: "./jiwon_userInfo_reviewlist_member.html",
          });
        },
        error: function (data) {
          console.log(data);
          alert('리뷰 수정에 실패했습니다. 다시 작성해주세요.');
        }
      });
    },

    reviewWriteUpload: function reviewWriteUpload(imgPath) {
      var self = this;
      var score = $('input[name=rating]:checked').val();
      var content = this.els.$contentIpt.val();
      if (!this.els.$starRating.is(":checked")) {
        return alert('별점을 선택해주세요');
      }
      var body = [
        { name: "orderNum", content: "order10002", type: "TEXT" }, //주문목록에서 orderNum, storeNum, 가져와야 함.
        { name: "reviewScore", content: score, type: "TEXT" },
        { name: "reviewContent", content: content, type: "TEXT" },
        { name: "reviewImage", content: imgPath, type: "FILE" },
        { name: "storeNum", content: "store10001", type: "TEXT" },
      ]
      console.log(body);
      $.fileHttpSend({
        path: "/api/review/writeWithUpload",
        body: body,
        succ: function (body) {
          console.log(body);
          alert('성공');
          M.page.replace({
            url: './jiwon_userInfo_reviewlist_member.html',
          });
        },
        progress: function (body) {
          console.log(body);
        },
        error: function (body) {
          console.log(body);
          alert('실패쓰');
        }
      })
    },

    reviewWrite: function () {
      var self = this;
      var score = $('input[name=rating]:checked').val();
      var content = this.els.$contentIpt.val();
      if (!this.els.$starRating.is(":checked")) {
        return alert('별점을 선택해주세요');
      }
      $.sendHttp({
        path: "/api/review/write",
        data: {
          orderNum: "order10001", //주문목록에서 orderNum, storeNum, 가져와야 함.
          reviewScore: score,
          reviewContent: content,
          storeNum: "store10001"
        },
        succ: function (data) {
          console.log(data);
          M.page.replace({
            path: "./jiwon_userInfo_reviewlist_member.html",
          });
        },
        error: function (data) {
          console.log(data);
          alert('리뷰 등록에 실패했습니다. 다시 작성해주세요.');
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