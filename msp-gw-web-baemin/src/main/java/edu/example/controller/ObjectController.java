package edu.example.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import edu.example.dto.MemberDto;
import edu.example.dto.ObjectDto;
import edu.example.service.ObjectService;
import kr.msp.constant.Const;

@Controller
public class ObjectController {

	private Logger logger = LoggerFactory.getLogger(ObjectController.class);

	@Autowired(required = true)
	private ObjectService service;
	
	@Autowired(required=true)
    private MessageSource messageSource;

    @Value("${upload.path:/tmp}")
    private String UPLOAD_ROOT_PATH;
    
    @RequestMapping(method = RequestMethod.POST, value = "/api/object/detailStoreMenu")
	public ModelAndView detailStoreMenu(HttpServletRequest request, HttpServletResponse response) {

		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();

		
		if (reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}

		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);

		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());

		ObjectDto info = service.detailStoreMenu(reqBodyMap);		
		
		if (!StringUtils.isEmpty(info)) {
			responseBodyMap.put("rsltCode", "0000");
			responseBodyMap.put("rsltMsg", "Success");
			responseBodyMap.put("objectNum", info.getObjectNum());
			responseBodyMap.put("objectName", info.getObjectName());
			responseBodyMap.put("objectImage", info.getObjectImage());
			responseBodyMap.put("objectContent", info.getObjectContent());
			responseBodyMap.put("objectPrice", info.getObjectPrice());
			responseBodyMap.put("objectQty", info.getObjectQty());
			responseBodyMap.put("objectOrigin", info.getObjectOrigin());
			responseBodyMap.put("storeNum", info.getStoreNum());
		} else {
			responseBodyMap.put("rsltCode", "2003");
			responseBodyMap.put("rsltMsg", "Data not found.");
		}

		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD, reqHeadMap);
		mv.addObject(Const.BODY, responseBodyMap);

		return mv;
	}	
    
	// ?????? ??? ?????? ?????????
	@RequestMapping(method = RequestMethod.POST, value = "/api/object/readStoreMenu")
	public ModelAndView getStoreObjectInfo(HttpServletRequest request, HttpServletResponse response) {

		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();

		
		if (reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}

		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);

		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());

		List<Object> info = service.getStoreObjectInfo(reqBodyMap);

		if (!StringUtils.isEmpty(info)) {
			responseBodyMap.put("rsltCode", "0000");
			responseBodyMap.put("rsltMsg", "Success");
			responseBodyMap.put("list", info);//???????????? ????????? selectOne??? ???????????? ??? ????????? ?????? ??????
		} else {
			responseBodyMap.put("rsltCode", "2003");
			responseBodyMap.put("rsltMsg", "Data not found.");
		}

		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD, reqHeadMap);
		mv.addObject(Const.BODY, responseBodyMap);

		return mv;
	}

	// ?????? ?????? // ?????? ????????????
	@RequestMapping(method = RequestMethod.POST, value = "/api/object/menuCreateNotIncludeFiles" )
	public ModelAndView regObject( HttpServletRequest request, HttpServletResponse response ) {
		
        Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
        Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
        Map<String, Object> responseBodyMap= new HashMap<String, Object>();
        
        if(reqHeadMap==null){
            reqHeadMap = new HashMap<String, Object>();
        }
        
        reqHeadMap.put(Const.RESULT_CODE, Const.OK);
        reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		
        logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
        
        int result = service.insertObjectNotIncludeFiles( reqBodyMap );
        
        if( result > 0 ) {
        	responseBodyMap.put("rsltCode", "0000");
            responseBodyMap.put("rsltMsg", "Success");
            
    		reqBodyMap.put("objectNum", request.getParameter("objectNum"));
    		reqBodyMap.put("objectImage", request.getParameter("objectImage"));
    		reqBodyMap.put("objectName", request.getParameter("objectName"));
    		reqBodyMap.put("objectContent", request.getParameter("objectContent"));
    		reqBodyMap.put("objectPrice", request.getParameter("objectPrice"));
    		reqBodyMap.put("objectQty", request.getParameter("objectQty"));
    		reqBodyMap.put("objectOrigin", request.getParameter("objectOrigin"));
    		reqBodyMap.put("storeNum", request.getParameter("storeNum"));
    		reqBodyMap.put("menuCategoryNum", request.getParameter("menuCategoryNum"));           
        } else {
        	responseBodyMap.put("rsltCode", "2003");
            responseBodyMap.put("rsltMsg", "Data not found.");
        }
		
        ModelAndView mv = new ModelAndView("defaultJsonView");
        mv.addObject(Const.HEAD,reqHeadMap);
        mv.addObject(Const.BODY,responseBodyMap);

        return mv;
	}	
	
	// ?????? ?????? // ?????? ?????????
	@RequestMapping(method = RequestMethod.POST, value = "/api/object/menuCreateIncludeFiles")
	public ModelAndView regObject(MultipartHttpServletRequest request, HttpServletResponse response) {
		
		Map<String,Object> uriPathVal = (Map<String,Object>)request.getAttribute(Const.REST_URI_PATH_VAL);
        Map<String,Object> reqMap =  (Map<String,Object>)request.getAttribute(Const.HTTP_BODY);
        
		
		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = new HashMap<String, Object>();
		
		Map<String,Object> responseMap = new HashMap<String, Object>();
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();

		if (reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}

		reqBodyMap.put("objectNum", request.getParameter("objectNum"));
		reqBodyMap.put("objectImage", request.getParameter("objectImage"));
		reqBodyMap.put("objectName", request.getParameter("objectName"));
		reqBodyMap.put("objectContent", request.getParameter("objectContent"));
		reqBodyMap.put("objectPrice", request.getParameter("objectPrice"));
		reqBodyMap.put("objectQty", request.getParameter("objectQty"));
		reqBodyMap.put("objectOrigin", request.getParameter("objectOrigin"));
		reqBodyMap.put("storeNum", request.getParameter("storeNum"));

		String fileDir = "/view/object/upload";
		String filePath = request.getServletContext().getRealPath(fileDir);
		System.out.println(filePath);
        try { 
        	MultipartFile objectImage = request.getFile("objectImage");

    		String originalFile = objectImage.getOriginalFilename();

    		// .png
    		String extension = originalFile.substring(originalFile.lastIndexOf("."));

    		// 7b2582aca35e4525b4a579d84e8b6c9d
    		String storeName = UUID.randomUUID().toString().replace("-", "");

    		String storeFileName = storeName + extension;

    		File file = new File(filePath + "/" + storeFileName);
    		try {
    			objectImage.transferTo(file); // ????????? ??????
    		} catch (Exception e) {
    			e.printStackTrace();
    		}
    		reqBodyMap.put("objectImage", storeFileName);

    		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
    		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);

    		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
//    		ObjectDto info = service.getObjectInfo(reqBodyMap);
    		int result = service.insertObject(reqBodyMap);
    		
    		if (result > 0) {
    			responseBodyMap.put("rsltCode", "0000");
    			responseBodyMap.put("rsltMsg", "Success");
    		} else {
    			responseBodyMap.put("rsltCode", "2003");
    			responseBodyMap.put("rsltMsg", "Data not found.");
    		}
        } catch(Exception e) {
        	e.printStackTrace();
            reqHeadMap.put(Const.RESULT_CODE,Const.EXCEPTION_ERROR);
            if(e.getMessage() != null){
                reqHeadMap.put(Const.RESULT_MESSAGE,e.getMessage());
            } else {
                reqHeadMap.put(Const.RESULT_MESSAGE,messageSource.getMessage("500.error", null , Locale.getDefault().ENGLISH ));
            }
        }
		
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD, reqHeadMap);
		mv.addObject(Const.BODY, responseBodyMap);

		return mv;
	}

	// ?????? ?????? // ?????? ????????????
	@RequestMapping(method = RequestMethod.POST, value = "/api/object/menuUpdateNotIncludeFiles")
	public ModelAndView updateObject(HttpServletRequest request, HttpServletResponse response) {

		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();

		if (reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}

		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);

//		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
//		ObjectDto info = service.getObjectInfo(reqBodyMap);
		int result = service.updateObjectNotIncludeFiles(reqBodyMap);

		if (result > 0) {
			responseBodyMap.put("rsltCode", "0000");
			responseBodyMap.put("rsltMsg", "Success");
		} else {
			responseBodyMap.put("rsltCode", "2003");
			responseBodyMap.put("rsltMsg", "Data not found.");
		}

		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD, reqHeadMap);
		mv.addObject(Const.BODY, responseBodyMap);

		return mv;
	}	
	
	// ?????? ?????? // ?????? ?????????
	@RequestMapping(method = RequestMethod.POST, value = "/api/object/menuUpdateIncludeFiles")
	public ModelAndView updateObject(MultipartHttpServletRequest request, HttpServletResponse response) {
		Map<String,Object> uriPathVal = (Map<String,Object>)request.getAttribute(Const.REST_URI_PATH_VAL);
        Map<String,Object> reqMap =  (Map<String,Object>)request.getAttribute(Const.HTTP_BODY);
        
		
		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = new HashMap<String, Object>();
		
		Map<String,Object> responseMap = new HashMap<String, Object>();
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();

		if (reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}

		reqBodyMap.put("objectNum", request.getParameter("objectNum"));
		reqBodyMap.put("objectImage", request.getParameter("objectImage"));
		reqBodyMap.put("objectName", request.getParameter("objectName"));
		reqBodyMap.put("objectContent", request.getParameter("objectContent"));
		reqBodyMap.put("objectPrice", request.getParameter("objectPrice"));
		reqBodyMap.put("objectQty", request.getParameter("objectQty"));
		reqBodyMap.put("objectOrigin", request.getParameter("objectOrigin"));
		reqBodyMap.put("storeNum", request.getParameter("storeNum"));

		String fileDir = "/view/object/upload";
		String filePath = request.getServletContext().getRealPath(fileDir);
		System.out.println(filePath);
        try { 
        	MultipartFile objectImage = request.getFile("objectImage");

    		String originalFile = objectImage.getOriginalFilename();

    		// .png
    		String extension = originalFile.substring(originalFile.lastIndexOf("."));

    		// 7b2582aca35e4525b4a579d84e8b6c9d
    		String storeName = UUID.randomUUID().toString().replace("-", "");

    		String storeFileName = storeName + extension;

    		File file = new File(filePath + "/" + storeFileName);
    		try {
    			objectImage.transferTo(file); // ????????? ??????
    		} catch (Exception e) {
    			e.printStackTrace();
    		}
    		reqBodyMap.put("objectImage", storeFileName);

    		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
    		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);

    		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
//    		ObjectDto info = service.getObjectInfo(reqBodyMap);
    		int result = service.updateObject(reqBodyMap);
    		
    		if (result > 0) {
    			responseBodyMap.put("rsltCode", "0000");
    			responseBodyMap.put("rsltMsg", "Success");
    		} else {
    			responseBodyMap.put("rsltCode", "2003");
    			responseBodyMap.put("rsltMsg", "Data not found.");
    		}
        } catch(Exception e) {
        	e.printStackTrace();
            reqHeadMap.put(Const.RESULT_CODE,Const.EXCEPTION_ERROR);
            if(e.getMessage() != null){
                reqHeadMap.put(Const.RESULT_MESSAGE,e.getMessage());
            } else {
                reqHeadMap.put(Const.RESULT_MESSAGE,messageSource.getMessage("500.error", null , Locale.getDefault().ENGLISH ));
            }
        }
		
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD, reqHeadMap);
		mv.addObject(Const.BODY, responseBodyMap);

		return mv;
	}

	// ?????? ??????
	@RequestMapping(method = RequestMethod.POST, value = "/api/object/menuDelete")
	public ModelAndView deleteObject(HttpServletRequest request, HttpServletResponse response) {

		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();

		if (reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}

		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);

		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());

		int result = service.deleteObject(reqBodyMap);

		if (result > 0) {
			responseBodyMap.put("rsltCode", "0000");
			responseBodyMap.put("rsltMsg", "Success");
		} else {
			responseBodyMap.put("rsltCode", "2003");
			responseBodyMap.put("rsltMsg", "Data not found.");
		}

		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD, reqHeadMap);
		mv.addObject(Const.BODY, responseBodyMap);

		return mv;
	}

}
