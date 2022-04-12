/**
 * @html file : store_object_write.html
 * @author : 고은
 * @date : 22-04-07
 * @ps : store_category_modify.html에서 + 버튼 클릭 시 메뉴 추가,
                                       메뉴 클릭 시 수정 선택 후 수정
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window){
  var SERVER_PATH = CONFIG.SERVER_PATH;
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
      $delBtn: null
    },
    data: {},
    init: function init() {
      this.els.$btnBack = $('#btn-back');

      this.els.$objectNameIpt = $('#object-name');
      this.els.$objectOriginIpt = $('#object-origin');
      this.els.$objectContentIpt = $('#object-content');
      this.els.$objectQtyIpt = $('#object-qty');
      this.els.$objectPriceIpt = $('#object-price');

      this.els.$objectImgIpt = $('#object-img');
      this.els.$imgSelectBtn = $('#imgSelectBtn');

      this.els.$modiBtn = $('#modiBtn');
      this.els.$delBtn = $('#delBtn');
    },

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      this.els.$objectNameIpt.val(M.data.param('objectName'));
      this.els.$objectOriginIpt.val(M.data.param('objectOrigin'));
      this.els.$objectContentIpt.val(M.data.param('objectContent'));
      this.els.$objectQtyIpt.val(M.data.param('objectQty'));
      this.els.$objectPriceIpt.val(M.data.param('objectPrice'));
      this.els.$objectImgIpt.val(M.data.param('objectImg'));//파라미터명 주의(detail js에 정의됨)
    },

    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;

      this.els.$btnBack.on('click', function () {
        M.page.back();
      });

      this.els.$imgSelectBtn.on('click', function () {
        self.getfile();
      });

      this.els.$modiBtn.on('click', function () {
        if (M.data.global('seqNo') == '') { //작성(insert)
          if(self.data.imgPath == '' || self.data.imgPath == null) { //이미지 미업로드
            self.write();
          } else {
                    console.log(self.data.imgPath);
                    self.writeWithUpload(self.data.imgPath); //이미지 업로드
                 }
        } else { //수정(update)
                    //console.log(M.data.param('seqNo'));
                    if(self.data.imgPath == '' || self.data.imgPath == null) { //이미지 미업로드
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
              var id =  M.data.global('memberId');
              var object_name = this.els.$objectNameIpt.val();
              var object_origin = this.els.$objectOriginIpt.val();
              var object_content = this.els.$objectContentIpt.val();
              var object_qty = this.els.$objectQtyIpt.val();
              var object_price = this.els.$objectPriceIpt.val();

              var seqNo = M.data.global('seqNo');
              if (object_name == '') {
                  return alert('메뉴 이름을 입력해주세요.');
              }
              if (object_origin == '') {
                  return alert('원산지를 입력해주세요.');
              }
              if (object_content == '') {
                  return alert('메뉴 설명을 입력해주세요.');
              }
              if (object_qty == '') {
                  return alert('재고를 입력해주세요.');
              }
              if (object_price == '') {
                  return alert('가격을 입력해주세요.');
              }

              var body = [
                { name: "objectName", content: object_name, type: "TEXT" },
                { name: "objectOrigin", content: object_origin, type: "TEXT" },
                { name: "objectContent", content: object_content, type: "TEXT" },
                { name: "objectQty", content: object_qty, type: "TEXT" },
                { name: "objectPrice", content: object_price, type: "TEXT" },

                { name: "objectImage", content: imgPath, type: "FILE" },//detail.js 내 이름 정의됨

                { name: "memberId", content: id, type: "TEXT" },
                { name: "seqNo", content: seqNo, type: "TEXT" }
              ]
              console.log(body);
              // { content: "파일업로드", type: "TEXT" },
              // { name: "imgs", content: "test.zip", type: "FILE" },
              $.fileHttpSend({
                path: "/api/object/menuUpdateIncludeFiles",
                body:body,
                succ: function () {
                  console.log(body);
                  alert('메뉴가 추가되었습니다.');
                  M.page.replace({url:'./jiwon_store_category_modify.html',});
                  M.data.removeGlobal('seqNo');
                  M.data.removeGlobal('imgUrl');
                  M.data.removeGlobal('imgName');
                  var pagelist = M.info.stack();
                  M.page.remove(pagelist[1].key);
                },
                progress: function () {
                  console.log(body);
                },
                error : function () {
                  console.log(body);
                  alert('실패했습니다.');
                }
              })
            },

    //작성(insert) //이미지 업로드
    writeWithUpload: function writeWithUpload(imgPath) {
          var self = this;
          var id =  M.data.global('memberId');

          var objectName = this.els.$objectNameIpt.val();
          var objectOrigin = this.els.$objectOriginIpt.val();
          var objectContent = this.els.$objectContentIpt.val();
          var objectQty = this.els.$objectQtyIpt.val();
          var objectPrice = this.els.$objectPriceIpt.val();

          if (objectName == '') {
              return alert('메뉴 이름을 입력해주세요.');
          }
          if (objectOrigin == '') {
              return alert('원산지를 입력해주세요.');
          }
          if (objectContent == '') {
              return alert('메뉴 설명을 입력해주세요.');
          }
          if (objectQty == '') {
              return alert('재고를 입력해주세요.');
          }
          if (objectPrice == '') {
              return alert('가격을 입력해주세요.');
          }

          var body = [
                                //content : 전역변수 아니어서 직접 작성함
            { name: "objectName", content: this.els.$objectNameIpt.val(), type: "TEXT" },
            { name: "objectOrigin", content: this.els.$objectOriginIpt.val(), type: "TEXT" },
            { name: "objectContent", content: this.els.$objectContentIpt.val(), type: "TEXT" },
            { name: "objectQty", content: this.els.$objectQtyIpt.val(), type: "TEXT" },
            { name: "objectPrice", content: this.els.$objectPriceIpt.val(), type: "TEXT" },

            { name: "objectImage", content: imgPath, type: "FILE" },

            { name: "memberId", content: id, type: "TEXT" }
          ]
          console.log(body);

          $.fileHttpSend({
            path: "/api/object/menuCreateIncludeFiles",
            body:body,
            succ: function (body) {
              console.log(body);
              alert('성공했습니다.');
              M.page.replace({url:'./goeun_store_object_detail.html',});
              var pagelist = M.info.stack();
              M.page.remove(pagelist[1].key);
            },
            progress: function (body) {
              console.log(body);
            },
            error : function (body) {
              console.log(body);
              alert('실패했습니다.');
            }
          })
        },

    getfile: function () {
      var self = this;
        M.media.picker({
          mode: "SINGLE",
          media: "PHOTO",
          column: 3,
          callback: function( status, result ) {
            if(status == 'SUCCESS'){
               self.data.imgPath = result.fullpath;
               self.els.$objectImgIpt.val(result.name);
            }else{
              self.data.imgPath = null;
              self.els.$objectImgIpt.val('');
            }
          }
        });
    },

     //수정(update) //이미지 미업로드
     modify: function () {
       var self = this;
       var id =  M.data.global('memberId');

       var objectName = this.els.$objectNameIpt.val();
       var objectOrigin = this.els.$objectOriginIpt.val();
       var objectContent = this.els.$objectContentIpt.val();
       var objectQty = this.els.$objectQtyIpt.val();
       var objectPrice = this.els.$objectPriceIpt.val();

       var seqNo = M.data.global('seqNo');

          if (objectName == '') {
              return alert('메뉴 이름을 입력해주세요.');
          }
          if (objectOrigin == '') {
              return alert('원산지를 입력해주세요.');
          }
          if (objectContent == '') {
              return alert('메뉴 설명을 입력해주세요.');
          }
          if (objectQty == '') {
              return alert('재고를 입력해주세요.');
          }
          if (objectPrice == '') {
              return alert('가격을 입력해주세요.');
          }

       console.log(seqNo);
        $.sendHttp({
        path: "/api/object/menuUpdateNotIncludeFiles",
        data: {
          'memberId': M.data.global('memberId'),
          'seqNo': M.data.global('seqNo'),

          'objectName': objectName,
          'objectOrigin': objectOrigin,
          'objectContent': objectContent,
          'objectQty': objectQty,
          'objectPrice': objectPrice
        },
        succ: function (data) {
          alert('수정 완료되었습니다.');
          M.page.replace({
            url : './jiwon_store_category_modify.html',
            });
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);
          M.data.removeGlobal('seqNo');
        },
        error: function (data) {
          console.log(data);
          alert('에러가 발생했습니다.');
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

      console.log(M.data.global('seqNo'));
      if (objectName == '') {
          return alert('메뉴 이름을 입력해주세요.');
      }
      if (objectOrigin == '') {
          return alert('원산지를 입력해주세요.');
      }
      if (objectContent == '') {
          return alert('메뉴 설명을 입력해주세요.');
      }
      if (objectQty == '') {
          return alert('재고를 입력해주세요.');
      }
      if (objectPrice == '') {
          return alert('가격을 입력해주세요.');
      }
      $.sendHttp({
        path: "/api/member/menuCreateNotIncludeFiles",
        data: {
          'memberId': M.data.global('memberId'),
//          memberId: M.data.global('memberId'),
//          title: title,
//          content: content,

          'objectName': objectName,
          'objectOrigin': objectOrigin,
          'objectContent': objectContent,
          'objectQty': objectQty,
          'objectPrice': objectPrice
        },
        succ: function (data) {
          console.log(data);
          alert('글쓰기가 완료되었습니다.');
          M.page.replace({
            url: './jiwon_store_category_modify.html',
          });
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);

        },
        error: function (data) {
          console.log(data);
          alert('글쓰기 실패입니다. 다시 작성해주세요.');
        }
      });
    }

  };
    window.__page__ = page;
  })(jQuery, M,  __config__, window);

  // 해당 페이지에서 실제 호출
  (function ($, M, pageFunc, window) {

    M.onReady(function () {
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
    });
  })(jQuery, M, __page__, window);