package edu.example.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import edu.example.service.PurchaseListService;
import kr.msp.constant.Const;


@Controller
public class PurchaseListController {

	private Logger logger = LoggerFactory.getLogger(PurchaseListController.class);
	
	@Autowired(required=true)
	private PurchaseListService service;
	
	//개별 삭제
	@RequestMapping( method = RequestMethod.POST, value = "/api/purchaseList/deleteOne" )
	public ModelAndView deletePurchaseOne( HttpServletRequest request, HttpServletResponse response ) {
		
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap= new HashMap<String, Object>();
		
		if(reqHeadMap==null){
			reqHeadMap = new HashMap<String, Object>();		
		}
	    
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
		
		int result = service.deleteOnePurchase( reqBodyMap );
	        
		if( result > 0 ) {
			responseBodyMap.put("rsltCode", "0000");
			responseBodyMap.put("rsltMsg", "Success");
		} else {
			responseBodyMap.put("rsltCode", "2003");
			responseBodyMap.put("rsltMsg", "Data not found.");
		}
		
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD,reqHeadMap);
		mv.addObject(Const.BODY,responseBodyMap);

		return mv;
	}
		
	//전체 삭제
	@RequestMapping( method = RequestMethod.POST, value = "/api/purchaseList/deleteAll" )
	public ModelAndView deletePurchaseAll( HttpServletRequest request, HttpServletResponse response ) {
			
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap= new HashMap<String, Object>();
			
		if(reqHeadMap==null){
			reqHeadMap = new HashMap<String, Object>();		
		}
		
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
			
		int result = service.deleteAllPurchase( reqBodyMap );
		
		if( result > 0 ) {
			responseBodyMap.put("rsltCode", "0000");
			responseBodyMap.put("rsltMsg", "Success");
		} else {
			responseBodyMap.put("rsltCode", "2003");
			responseBodyMap.put("rsltMsg", "Data not found.");
		}
		
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD,reqHeadMap);
		mv.addObject(Const.BODY,responseBodyMap);

		return mv;
	}
	
}
