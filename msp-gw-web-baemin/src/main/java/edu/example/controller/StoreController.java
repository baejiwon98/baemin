package edu.example.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import edu.example.dto.StoreCategoryDTO;
import edu.example.dto.StoreDTO;
import edu.example.dto.StoreObjectDTO;
import edu.example.service.StoreService;
import kr.msp.constant.Const;

@Controller
public class StoreController {

	private Logger logger = LoggerFactory.getLogger(StoreController.class);
	
	@Autowired(required=true)
	private StoreService service;
	
	// 회원 매장 상세
	@RequestMapping( method = RequestMethod.POST, value = "/api/store/storeInfo" )
	   public ModelAndView paymentPage( HttpServletRequest request, HttpServletResponse response ) {
	         
	      Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
	      Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
	      Map<String, Object> responseBodyMap= new HashMap<String, Object>();
	         
	      if(reqHeadMap==null){
	         reqHeadMap = new HashMap<String, Object>();
	      }
	         
	      reqHeadMap.put(Const.RESULT_CODE, Const.OK);
	      reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
	               
	      logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());

	      StoreDTO info = service.getStoreInfo( reqBodyMap );
	      
	      
	      if( !StringUtils.isEmpty(info) ) {
	         responseBodyMap.put("rsltCode", "0000");
	         responseBodyMap.put("rsltMsg", "Success");
	         responseBodyMap.put("storeNum", info.getStoreNum());
	         responseBodyMap.put("storeName", info.getStoreName());
	         responseBodyMap.put("storeAddr", info.getStoreAddr());
	         responseBodyMap.put("storePhone", info.getStorePhone());
	         responseBodyMap.put("leastPrice", info.getLeastPrice());
	         responseBodyMap.put("orderArea", info.getOrderArea());
	         responseBodyMap.put("deliveryPrice", info.getDeliveryPrice());
	         responseBodyMap.put("reviewScore", info.getReviewScore());
	         responseBodyMap.put("employeeName", info.getEmployeeName());
	         responseBodyMap.put("employeeNum", info.getEmployeeNum());
	      } else {
	         responseBodyMap.put("rsltCode", "2003");
	         responseBodyMap.put("rsltMsg", "Data not found.");
	      }
	               
	      ModelAndView mv = new ModelAndView("defaultJsonView");
	      mv.addObject(Const.HEAD,reqHeadMap);
	      mv.addObject(Const.BODY,responseBodyMap);

	      return mv;
	   }
	
	@RequestMapping(value="/api/store/insertStore", method=RequestMethod.POST)
	public ModelAndView insertStore (HttpServletRequest request, HttpServletResponse response) {
		Map<String,Object> reqHeadMap = (Map<String,Object>)request.getAttribute(Const.HEAD);
        Map<String,Object> reqBodyMap = (Map<String,Object>)request.getAttribute(Const.BODY);
        Map<String, Object> responseBodyMap= new HashMap<String, Object>();
	    
	    logger.info("================= reqBodyMap : {} ", reqBodyMap.toString());
	    
		if(reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}
		
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		
		int result = service.insertStore(reqBodyMap);
		
		if(result > 0) {
			responseBodyMap.put("rsltCode", "0000");
			responseBodyMap.put("rsltMsg", "Success");
		}else {
			responseBodyMap.put("rsltCode", "2003");
            responseBodyMap.put("rsltMsg", "Data not found.");
		}
		
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD, reqHeadMap);
		mv.addObject(Const.BODY, responseBodyMap);
		
		return mv;
	}
	
	@RequestMapping(value="/api/store/detailStore", method=RequestMethod.POST)
	public ModelAndView detailStore( HttpServletRequest request, HttpServletResponse response) {
        Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
        Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
        Map<String, Object> responseBodyMap= new HashMap<String, Object>();
	
//	public ModelAndView detailStore (@RequestBody Map<String,Object> param, 
//			HttpServletRequest request, HttpServletResponse response) {
//		Map<String,Object> reqHeadMap =  (Map<String,Object>)param.get("head");
//		Map<String,Object> reqBodyMap =  (Map<String,Object>)param.get("body");
//		Map<String, Object> responseBodyMap= new HashMap<String, Object>();
		
		logger.info("================= reqBodyMap : {} ", reqBodyMap.toString());
		
		if(reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}
		
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		
		StoreDTO info = service.detailStore(reqBodyMap);
		
		if( !StringUtils.isEmpty(info) ) {
			responseBodyMap.put("rsltCode", "0000");
			responseBodyMap.put("rsltMsg", "Success");
			responseBodyMap.put("storeNum", info.getStoreNum());
			responseBodyMap.put("employeeName", info.getEmployeeName());
			responseBodyMap.put("employeeNum", info.getEmployeeNum());
			responseBodyMap.put("storeName", info.getStoreName());
			responseBodyMap.put("storeAddr", info.getStoreAddr());
			responseBodyMap.put("employeePhone", info.getEmployeePhone());
			responseBodyMap.put("employeeEmail", info.getEmployeeEmail());
			responseBodyMap.put("employeeId", info.getEmployeeId());
			responseBodyMap.put("employeePw", info.getEmployeePw());
			responseBodyMap.put("deliveryStatus", info.getDeliveryStatus());
			responseBodyMap.put("pickupStatus", info.getPickupStatus());
			responseBodyMap.put("storePhone", info.getStorePhone());
			responseBodyMap.put("leastPrice", info.getLeastPrice());
			responseBodyMap.put("orderArea", info.getOrderArea());
			responseBodyMap.put("deliveryPrice", info.getDeliveryPrice());
			responseBodyMap.put("storeCategoryNum", info.getStoreCategoryNum());
			
		}else {
			responseBodyMap.put("rsltCode", "2003");
			responseBodyMap.put("rsltMsg", "Data not found.");
		}
		
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD, reqHeadMap);
		mv.addObject(Const.BODY, responseBodyMap);
		return mv;
	}
	
	@RequestMapping(value="/api/store/storeList/delivery", method=RequestMethod.POST)
	public ModelAndView storeList(HttpServletRequest request, HttpServletResponse response) {
		Map<String,Object> reqHeadMap = (Map<String,Object>)request.getAttribute(Const.HEAD);
        Map<String,Object> reqBodyMap = (Map<String,Object>)request.getAttribute(Const.BODY);
        Map<String, Object> responseBodyMap= new HashMap<String, Object>();
		
		logger.info("================= reqBodyMap : {} ", reqBodyMap.toString());
		    
		if(reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}
		
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		
		List<StoreCategoryDTO> list = service.storeList(reqBodyMap);
		
		if( !StringUtils.isEmpty(list) ) {				
			responseBodyMap.put("rsltCode", "0000");
			responseBodyMap.put("rsltMsg", "Success");
			responseBodyMap.put("list", list);
		}else {
			responseBodyMap.put("rsltCode", "2003");
			responseBodyMap.put("rsltMsg", "Data not found.");
		}
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD, reqHeadMap);
		mv.addObject(Const.BODY, responseBodyMap);
		return mv;
	}
	
	@RequestMapping(value="/api/store/storeList/takeout", method=RequestMethod.POST)
	public ModelAndView storeListTakeout(HttpServletRequest request, HttpServletResponse response) {
		Map<String,Object> reqHeadMap = (Map<String,Object>)request.getAttribute(Const.HEAD);
        Map<String,Object> reqBodyMap = (Map<String,Object>)request.getAttribute(Const.BODY);
        Map<String, Object> responseBodyMap= new HashMap<String, Object>();
		
		logger.info("================= reqBodyMap : {} ", reqBodyMap.toString());
		    
		if(reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}
		
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		
		List<StoreCategoryDTO> list = service.storeListTakeout(reqBodyMap);
		
		if( !StringUtils.isEmpty(list) ) {				
			responseBodyMap.put("rsltCode", "0000");
			responseBodyMap.put("rsltMsg", "Success");
			responseBodyMap.put("list", list);
		}else {
			responseBodyMap.put("rsltCode", "2003");
			responseBodyMap.put("rsltMsg", "Data not found.");
		}
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD, reqHeadMap);
		mv.addObject(Const.BODY, responseBodyMap);
		return mv;
	}
	
	@RequestMapping(value="/api/store/updateStore", method=RequestMethod.POST)
	public ModelAndView updateStore(HttpServletRequest request, HttpServletResponse response) {
		Map<String,Object> reqHeadMap = (Map<String,Object>)request.getAttribute(Const.HEAD);
        Map<String,Object> reqBodyMap = (Map<String,Object>)request.getAttribute(Const.BODY);
        Map<String, Object> responseBodyMap= new HashMap<String, Object>();
		
		logger.info("================= reqBodyMap : {} ", reqBodyMap.toString());
		
		if(reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}
		
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		
		int result = service.updateStore(reqBodyMap);
		
		if( result > 0 ) {
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
	
	@RequestMapping(value="/api/store/deleteStore", method=RequestMethod.POST)
	public ModelAndView deleteStore(HttpServletRequest request, HttpServletResponse response) {
		Map<String,Object> reqHeadMap = (Map<String,Object>)request.getAttribute(Const.HEAD);
        Map<String,Object> reqBodyMap = (Map<String,Object>)request.getAttribute(Const.BODY);
        Map<String, Object> responseBodyMap= new HashMap<String, Object>();
		
		logger.info("================= reqBodyMap : {} ", reqBodyMap.toString());
		
		if(reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}
		
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		
		int result = service.deleteStore(reqBodyMap);
		
		if( result > 0 ) {
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
	
	@RequestMapping(value="/api/store/nameSearch", method=RequestMethod.POST)
	public ModelAndView nameSearch(HttpServletRequest request, HttpServletResponse response) {
		Map<String,Object> reqHeadMap = (Map<String,Object>)request.getAttribute(Const.HEAD);
        Map<String,Object> reqBodyMap = (Map<String,Object>)request.getAttribute(Const.BODY);
        Map<String, Object> responseBodyMap= new HashMap<String, Object>();
		
		logger.info("================= reqBodyMap : {} ", reqBodyMap.toString());
		
		if(reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}
		
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		
		List<StoreObjectDTO> list = service.nameSearch(reqBodyMap);
		
		if (list != null)  {
			responseBodyMap.put("rsltCode", "0000");
			responseBodyMap.put("rsltMsg", "Success");
			responseBodyMap.put("list", list);
		} else {
			responseBodyMap.put("rsltCode", "2003");
			responseBodyMap.put("rsltMsg", "Data not found.");
		}
		
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD, reqHeadMap);
		mv.addObject(Const.BODY, responseBodyMap);
		return mv;
	}
	
	@RequestMapping(value="/api/store/phoneCon", method=RequestMethod.POST)
	public ModelAndView phoneCon(HttpServletRequest request, HttpServletResponse response) {
		Map<String,Object> reqHeadMap = (Map<String,Object>)request.getAttribute(Const.HEAD);
        Map<String,Object> reqBodyMap = (Map<String,Object>)request.getAttribute(Const.BODY);
        Map<String, Object> responseBodyMap= new HashMap<String, Object>();
		
		logger.info("================= reqBodyMap : {} ", reqBodyMap.toString());
		
		if(reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}
		
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		
		StoreDTO info = service.detailStore(reqBodyMap);
		
		if(info.getEmployeePhone().equals(reqBodyMap.get("employeePhone"))) {
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
	
	@RequestMapping(value="/api/store/emailCon", method=RequestMethod.POST)
	public ModelAndView emailCon(HttpServletRequest request, HttpServletResponse response) {
		Map<String,Object> reqHeadMap = (Map<String,Object>)request.getAttribute(Const.HEAD);
        Map<String,Object> reqBodyMap = (Map<String,Object>)request.getAttribute(Const.BODY);
        Map<String, Object> responseBodyMap= new HashMap<String, Object>();
		
		logger.info("================= reqBodyMap : {} ", reqBodyMap.toString());
		
		if(reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}
		
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		
		StoreDTO info = service.detailStore(reqBodyMap);
		
		if(info.getEmployeeEmail().equals(reqBodyMap.get("employeeEmail"))) {
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
