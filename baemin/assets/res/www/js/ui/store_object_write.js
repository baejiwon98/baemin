/**
 * @file : store_object_write.js
 * @author : 박고은, 배지원
 * @date : 2022-04-07

 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window) {
  var page = {
    els: {
      $btnBack: null,
      $objectNameIpt: null,
      $objectOriginIpt: null,
      $objectContentIpt: null,
      $objectQtyIpt: null,
      $objectPriceIpt: null,
      $objectImgIpt: null,
      $imgSelectBtn: null,
      $modiBtn: null,
      $resetBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$btnBack = $('.btn-back');
      this.els.$objectNameIpt = $('#object-name');
      this.els.$objectOriginIpt = $('#object-origin');
      this.els.$objectContentIpt = $('#object-content');
      this.els.$objectQtyIpt = $('#object-qty');
      this.els.$objectPriceIpt = $('#object-price');
      this.els.$objectImgIpt = $('#object-img');
      this.els.$imgSelectBtn = $('#imgSelectBtn');
      this.els.$modiBtn = $('#modiBtn');
      this.els.$resetBtn = $('#reset-btn');
    },

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      var self = this;
      if (M.data.param("modify") == "Y") {
        $('#title').text('수정');
        $('#btn-name').text('수정완료');
        $.sendHttp({
          path: "/api/object/detailStoreMenu",
          data: {
            "objectNum": M.data.global('objectNum'),
          },
          succ: function (data) {
            console.log(data);
            self.els.$objectNameIpt.val(data.objectName);
            self.els.$objectOriginIpt.val(data.objectOrigin);
            self.els.$objectContentIpt.val(data.objectContent);
            self.els.$objectQtyIpt.val(data.objectQty);
            self.els.$objectPriceIpt.val(data.objectPrice);
            self.els.$objectImgIpt.val(data.objectImage);
          },
          error: function (data) {
            console.log(data);
            alert("가게 정보를 가져오지 못했습니다.");
          }
        });
      }
    },

    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$resetBtn.on('click', function () {
        console.log(self.data.imgPath);
        self.data.imgPath == null;
        self.els.$objectImgIpt.val('');
        console.log(self.data.imgPath);
      });

      this.els.$btnBack.on('click', function () {
        M.page.back();
      });

      this.els.$imgSelectBtn.on('click', function () {
        self.getfile();
      });

      this.els.$modiBtn.on('click', function () {
        if (M.data.param('modify') != 'Y') { //작성(insert)
          if (self.data.imgPath == '' || self.data.imgPath == null) { //이미지 미업로드
            self.write();
          } else {
            console.log(self.data.imgPath);
            self.writeWithUpload(self.data.imgPath); //이미지 업로드
          }
        } else { //수정(update)
          if (self.data.imgPath == '' || self.data.imgPath == null) { //이미지 미업로드
            self.modify();
          } else {
            console.log(self.data.imgPath);
            self.modifyWithUpload(self.data.imgPath); //이미지 업로드
          }
        }
      });
    },

    //수정(update) //이미지 업로드
    modifyWithUpload: function modifyWithUpload(imgPath) {
      var self = this;
      var object_name = this.els.$objectNameIpt.val();
      var object_origin = this.els.$objectOriginIpt.val();
      var object_content = this.els.$objectContentIpt.val();
      var object_qty = this.els.$objectQtyIpt.val();
      var object_price = this.els.$objectPriceIpt.val();

      if (object_name == '') {
        return alert('메뉴 이름을 입력해주세요.');
      }
      if (object_qty == '') {
        return alert('재고를 입력해주세요.');
      }
      if (object_price == '') {
        return alert('가격을 입력해주세요.');
      }

      var body = [{
          name: "objectNum",
          content: M.data.global("objectNum"),
          type: "TEXT"
        },
        {
          name: "storeNum",
          content: M.data.global("storeNum"),
          type: "TEXT"
        },
        {
          name: "objectName",
          content: object_name,
          type: "TEXT"
        },
        {
          name: "objectOrigin",
          content: object_origin,
          type: "TEXT"
        },
        {
          name: "objectContent",
          content: object_content,
          type: "TEXT"
        },
        {
          name: "objectQty",
          content: object_qty,
          type: "TEXT"
        },
        {
          name: "objectPrice",
          content: object_price,
          type: "TEXT"
        },
        {
          name: "objectImage",
          content: imgPath,
          type: "FILE"
        }
      ]
      console.log(body);
      $.fileHttpSend({
        path: "/api/object/menuUpdateIncludeFiles",
        body: body,
        succ: function () {
          console.log(body);
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);
          alert('메뉴가 수정되었습니다.');
          M.page.replace({
            url: './jiwon_store_category_modify.html',
          });
        },
        progress: function () {
          console.log(body);
        },
        error: function () {
          console.log(body);
          alert('메뉴 수정에 실패했습니다. 다시 시도해주세요.');
        }
      })
    },

    //작성(insert) //이미지 업로드
    writeWithUpload: function writeWithUpload(imgPath) {
      var self = this;
      var objectName = this.els.$objectNameIpt.val();
      var objectOrigin = this.els.$objectOriginIpt.val();
      var objectContent = this.els.$objectContentIpt.val();
      var objectQty = this.els.$objectQtyIpt.val();
      var objectPrice = this.els.$objectPriceIpt.val();

      if (objectName == '') {
        return alert('메뉴 이름을 입력해주세요.');
      }
      if (objectQty == '') {
        return alert('재고를 입력해주세요.');
      }
      if (objectPrice == '') {
        return alert('가격을 입력해주세요.');
      }

      var body = [{
          name: "storeNum",
          content: M.data.global("storeNum"),
          type: "TEXT"
        },
        {
          name: "objectName",
          content: objectName,
          type: "TEXT"
        },
        {
          name: "objectOrigin",
          content: objectOrigin,
          type: "TEXT"
        },
        {
          name: "objectContent",
          content: objectContent,
          type: "TEXT"
        },
        {
          name: "objectQty",
          content: objectQty,
          type: "TEXT"
        },
        {
          name: "objectPrice",
          content: objectPrice,
          type: "TEXT"
        },
        {
          name: "objectImage",
          content: imgPath,
          type: "FILE"
        }
      ]
      console.log(body);

      $.fileHttpSend({
        path: "/api/object/menuCreateIncludeFiles",
        body: body,
        succ: function (body) {
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);
          console.log(body);
          alert('메뉴가 추가 되었습니다.');
          M.page.replace({
            url: './jiwon_store_category_modify.html',
          });
        },
        progress: function (body) {
          console.log(body);
        },
        error: function (body) {
          console.log(body);
          alert('메뉴 추가에 실패했습니다. 다시 시도해주세요.');
        }
      })
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
            self.els.$objectImgIpt.val(result.name);
          } else {
            self.data.imgPath = null;
            self.els.$objectImgIpt.val('');
          }
        }
      });
    },

    //수정(update) //이미지 미업로드
    modify: function () {
      var self = this;
      var objectName = this.els.$objectNameIpt.val();
      var objectOrigin = this.els.$objectOriginIpt.val();
      var objectContent = this.els.$objectContentIpt.val();
      var objectQty = this.els.$objectQtyIpt.val();
      var objectPrice = this.els.$objectPriceIpt.val();

      if (objectName == '') {
        return alert('메뉴 이름을 입력해주세요.');
      }
      if (objectQty == '') {
        return alert('재고를 입력해주세요.');
      }
      if (objectPrice == '') {
        return alert('가격을 입력해주세요.');
      }

      $.sendHttp({
        path: "/api/object/menuUpdateNotIncludeFiles",
        data: {
          "objectNum": M.data.global('objectNum'),
          'objectName': objectName,
          'objectOrigin': objectOrigin,
          'objectContent': objectContent,
          'objectQty': objectQty,
          'objectPrice': objectPrice,
          "storeNum": M.data.global('storeNum')
        },
        succ: function (data) {
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);
          alert('메뉴 수정 완료되었습니다.');
          M.page.replace({
            url: './jiwon_store_category_modify.html',
          });
        },
        error: function (data) {
          console.log(data);
          alert('메뉴 수정에 실패했습니다. 다시 작성해 주세요');
        }
      });

    },

    //작성(insert) //이미지 미업로드
    write: function () {
      var self = this;
      var objectName = this.els.$objectNameIpt.val();
      var objectOrigin = this.els.$objectOriginIpt.val();
      var objectContent = this.els.$objectContentIpt.val();
      var objectQty = this.els.$objectQtyIpt.val();
      var objectPrice = this.els.$objectPriceIpt.val();
      if (objectName == '') {
        return alert('메뉴 이름을 입력해주세요.');
      }
      if (objectQty == '') {
        return alert('재고를 입력해주세요.');
      }
      if (objectPrice == '') {
        return alert('가격을 입력해주세요.');
      }
      $.sendHttp({
        path: "/api/object/menuCreateNotIncludeFiles",
        data: {
          objectName: objectName,
          objectContent: objectContent,
          objectPrice: objectPrice,
          objectQty: objectQty,
          objectOrigin: objectOrigin,
          storeNum: M.data.global("storeNum"),
        },
        succ: function (data) {
          console.log(data);
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);

          alert('메뉴 등록이 완료되었습니다.');
          M.page.replace({
            url: './jiwon_store_category_modify.html',
          });
        },
        error: function (data) {
          console.log(data);
          alert('메뉴 등록에 실패했습니다. 다시 작성해주세요.');
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