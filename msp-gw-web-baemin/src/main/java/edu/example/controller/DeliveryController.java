package edu.example.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import edu.example.dto.DeliveryDTO;
import edu.example.dto.StoreDTO;
import edu.example.service.DeliveryService;
import kr.msp.constant.Const;

@Controller
public class DeliveryController {

	private Logger logger = LoggerFactory.getLogger(StoreController.class);

	@Autowired(required=true)
	private DeliveryService service;
	
	@RequestMapping(value="/api/delivery/insertDelivery", method=RequestMethod.POST)
	public ModelAndView insertDelivery (HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> reqHeadMap = (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		
		if(reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}
		
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
		
		int result = service.insertDelivery(reqBodyMap);
		
		if(result > 0) {
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
	
	@RequestMapping(value="/api/delivery/detailDelivery", method=RequestMethod.POST)
	public ModelAndView detailDelivery (HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> reqHeadMap = (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap = new HashMap<String,Object>();
	
		if(reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}
		
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
		
		DeliveryDTO info = service.detailDelivery(reqBodyMap);
		
		if( !StringUtils.isEmpty(info) ) {
        	responseBodyMap.put("rsltCode", "0000");
            responseBodyMap.put("rsltMsg", "Success");
            responseBodyMap.put("deliveryNum", info.getDeliveryNum());
            responseBodyMap.put("deliveryId", info.getDeliveryId());
            responseBodyMap.put("deliveryName", info.getDeliveryName());
            responseBodyMap.put("deliveryEmail", info.getDeliveryEmail());
            responseBodyMap.put("deliveryPhone", info.getDeliveryPhone());
            responseBodyMap.put("deliveryBirth", info.getDeliveryBirth());
            responseBodyMap.put("deliveryPw", info.getDeliveryPw());
            responseBodyMap.put("deliveryAddr", info.getDeliveryAddr());
            responseBodyMap.put("deliveryAddrdetail", info.getDeliveryAddrdetail());
	            
        } else {
        	responseBodyMap.put("rsltCode", "2003");
            responseBodyMap.put("rsltMsg", "Data not found.");
        }
		
        ModelAndView mv = new ModelAndView("defaultJsonView");
        mv.addObject(Const.HEAD,reqHeadMap);
        mv.addObject(Const.BODY,responseBodyMap);

        return mv;
	}
	
	@RequestMapping(value="/api/delivery/updateDelivery", method=RequestMethod.POST)
	public ModelAndView updateDelivery(HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> reqHeadMap = (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		
		if(reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}
		
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
		
		int result = service.updateDelivery(reqBodyMap);
		
		if(result > 0) {
			responseBodyMap.put("rsltCode", "0000");
            responseBodyMap.put("rsltMsg", "Success");
		}else {
        	responseBodyMap.put("rsltCode", "2003");
            responseBodyMap.put("rsltMsg", "Data not found.");
        }
		
        ModelAndView mv = new ModelAndView("defaultJsonView");
        mv.addObject(Const.HEAD,reqHeadMap);
        mv.addObject(Const.BODY,responseBodyMap);

        return mv;
	}
	
	@RequestMapping(value="/api/delivery/deleteDelivery", method = RequestMethod.POST)
	public ModelAndView deleteDelivery (HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> reqHeadMap = (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		
		if(reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}
		
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
		
		int result = service.deleteDelivery(reqBodyMap);
		
		if(result > 0) {
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
	
	@RequestMapping(value="/api/delivery/phoneCon", method=RequestMethod.POST)
	public ModelAndView phoneCon(HttpServletRequest request, HttpServletResponse response) {
	    Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
        Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
        Map<String, Object> responseBodyMap= new HashMap<String, Object>();
		
		logger.info("================= reqBodyMap : {} ", reqBodyMap.toString());
		
		if(reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}
		
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		
		System.out.println("!!!!!reqBodyMap " + reqBodyMap);
		DeliveryDTO info = service.detailDelivery(reqBodyMap);
		System.out.println("!!!!!info " + info);
		
		if(info.getDeliveryPhone().equals(reqBodyMap.get("deliveryPhone"))) {
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
	
	@RequestMapping(value="/api/delivery/emailCon", method=RequestMethod.POST)
	public ModelAndView emailCon(HttpServletRequest request, HttpServletResponse response) {
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
        Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
        Map<String, Object> responseBodyMap= new HashMap<String, Object>();
		
		logger.info("================= reqBodyMap : {} ", reqBodyMap.toString());
		
		if(reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}
		
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		
		DeliveryDTO info = service.detailDelivery(reqBodyMap);
		
		if(info.getDeliveryEmail().equals(reqBodyMap.get("deliveryEmail"))) {
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
