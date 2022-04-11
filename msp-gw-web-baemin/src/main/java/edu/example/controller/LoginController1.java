package edu.example.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import edu.example.dto.LoginDto;
import edu.example.service.LoginService1;
import kr.msp.constant.Const;

@Controller
public class LoginController1 {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());
		
	@Autowired(required=true)
	private LoginService1 service;
	
	// 비밀번호 체크
	@RequestMapping( method = RequestMethod.POST, value = "/api/checkPw" )
	public ModelAndView checkPw( HttpServletRequest request, HttpServletResponse response ) {
				
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap= new HashMap<String, Object>();
		        
		if(reqHeadMap==null){
			reqHeadMap = new HashMap<String, Object>();
		}
		        
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
				
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
		        
		LoginDto info = service.checkPw( reqBodyMap );
		        
		if( !StringUtils.isEmpty(info) ) {
			if(reqBodyMap.get("password").equals(info.getPassword())) {
				responseBodyMap.put("rsltCode", "0000");
			    responseBodyMap.put("rsltMsg", "Success");
			    responseBodyMap.put("confirmMsg", "Y");
			}else {
				responseBodyMap.put("rsltCode", "0000");
			    responseBodyMap.put("rsltMsg", "Success");
			    responseBodyMap.put("confirmMsg", "N");
			}
			
		} else {
			responseBodyMap.put("rsltCode", "2003");
			responseBodyMap.put("rsltMsg", "Data not found.");
		}		
		
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD,reqHeadMap);
		mv.addObject(Const.BODY,responseBodyMap);

		return mv;
	}
	
	// 비밀번호 수정
	@RequestMapping( method = RequestMethod.POST, value = "/api/password" )
	public ModelAndView pwModify( HttpServletRequest request, HttpServletResponse response ) {
						
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap= new HashMap<String, Object>();
				        
		if(reqHeadMap==null){
			reqHeadMap = new HashMap<String, Object>();
		}
				        
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
						
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
				        
		int result = service.pwModify( reqBodyMap );
	        
	    if( result > 0 ) {
	        responseBodyMap.put("rsltCode", "0000");
	         responseBodyMap.put("rsltMsg", "Success ");
	    } else {
	        responseBodyMap.put("rsltCode", "2003");
	        responseBodyMap.put("rsltMsg", "Data not found.");
	    }
						
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD,reqHeadMap);
		mv.addObject(Const.BODY,responseBodyMap);

		return mv;
	}
	
	
	// 로그아웃
	@RequestMapping ( method = RequestMethod.POST, value = "/api/logout" )
	public ModelAndView logoutMember( HttpServletRequest request, HttpServletResponse response , HttpSession session) {
			
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
	    Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap= new HashMap<String, Object>();
		        
		if(reqHeadMap==null){
			reqHeadMap = new HashMap<String, Object>();
		}
		        
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
				
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
		
		System.out.println(session.getAttribute("loginId"));
		
		if( session.getAttribute("loginId") != null ) {
			if(reqBodyMap.get("loginId").equals(session.getAttribute("loginId"))) {
				session.removeAttribute("loginId");
		        responseBodyMap.put("rsltCode", "0000");
		        responseBodyMap.put("rsltMsg", "Success");		
			}else {
				responseBodyMap.put("rsltCode", "2003");
	            responseBodyMap.put("rsltMsg", "Data not found.");
			}
        } else {
        	responseBodyMap.put("rsltCode", "1003");
            responseBodyMap.put("rsltMsg", "Login required.");
        }
				
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD,reqHeadMap);
		mv.addObject(Const.BODY,responseBodyMap);
	
		return mv;
	}
		
		// 개인정보확인
		@RequestMapping( method = RequestMethod.POST, value = "/api/find" )
		public ModelAndView findMember( HttpServletRequest request, HttpServletResponse response ) {
					
			Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
			Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
			Map<String, Object> responseBodyMap= new HashMap<String, Object>();
			        
			if(reqHeadMap==null){
				reqHeadMap = new HashMap<String, Object>();
			}
			        
			reqHeadMap.put(Const.RESULT_CODE, Const.OK);
			reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
					
			logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
			        
			LoginDto info = service.find( reqBodyMap );
			        
			if( !StringUtils.isEmpty(info) ) {
				responseBodyMap.put("rsltCode", "0000");
			    responseBodyMap.put("rsltMsg", "Success");
			    responseBodyMap.put("existYn", "Y");
			} else {
				responseBodyMap.put("rsltCode", "0000");
			    responseBodyMap.put("rsltMsg", "Success");
			    responseBodyMap.put("existYn", "N");
			}
					
			ModelAndView mv = new ModelAndView("defaultJsonView");
			mv.addObject(Const.HEAD,reqHeadMap);
			mv.addObject(Const.BODY,responseBodyMap);

			return mv;
		}
		
		// 아이디 찾기
		@RequestMapping( method = RequestMethod.POST, value = "/api/findId" )
		public ModelAndView findId( HttpServletRequest request, HttpServletResponse response ) {
			
	        Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
	        Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
	        Map<String, Object> responseBodyMap= new HashMap<String, Object>();
	        
	        if(reqHeadMap==null){
	            reqHeadMap = new HashMap<String, Object>();
	        }
	        
	        reqHeadMap.put(Const.RESULT_CODE, Const.OK);
	        reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
			
	        logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
	        
	        LoginDto info = service.findId( reqBodyMap );
	        
	        if( !StringUtils.isEmpty(info) ) {
	        	responseBodyMap.put("rsltCode", "0000");
	            responseBodyMap.put("rsltMsg", "Success");
	            responseBodyMap.put("loginId", info.getLoginId());
	        } else {
	        	responseBodyMap.put("rsltCode", "2003");
				responseBodyMap.put("rsltMsg", "Data not found.");
	        }
			
	        ModelAndView mv = new ModelAndView("defaultJsonView");
	        mv.addObject(Const.HEAD,reqHeadMap);
	        mv.addObject(Const.BODY,responseBodyMap);

	        return mv;
		}
		
		// 아이디 중복확인
			@RequestMapping( method = RequestMethod.POST, value = "/api/duplicate" )
			public ModelAndView dupMemberId( HttpServletRequest request, HttpServletResponse response ) {
				
		        Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		        Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		        Map<String, Object> responseBodyMap= new HashMap<String, Object>();
		        
		        if(reqHeadMap==null){
		            reqHeadMap = new HashMap<String, Object>();
		        }
		        
		        reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		        reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
				
		        logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
		        
		        LoginDto info = service.dupLoginId( reqBodyMap );
		        
		        if( !StringUtils.isEmpty(info) ) {
		        	responseBodyMap.put("rsltCode", "0000");
		            responseBodyMap.put("rsltMsg", "Success");
		            responseBodyMap.put("dupYn", "Y");
		        } else {
		        	responseBodyMap.put("rsltCode", "0000");
		            responseBodyMap.put("rsltMsg", "Success");
		            responseBodyMap.put("dupYn", "N");
		        }
				
		        ModelAndView mv = new ModelAndView("defaultJsonView");
		        mv.addObject(Const.HEAD,reqHeadMap);
		        mv.addObject(Const.BODY,responseBodyMap);

		        return mv;
			}
		
		
		//로그인
		@RequestMapping ( method = RequestMethod.POST, value = "/api/login")
		public ModelAndView login( HttpServletRequest request, HttpServletResponse response , HttpSession session) {
				
			Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		    Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
			Map<String, Object> responseBodyMap= new HashMap<String, Object>();
			        
			if(reqHeadMap==null){
				reqHeadMap = new HashMap<String, Object>();
			}
			        
			reqHeadMap.put(Const.RESULT_CODE, Const.OK);
			reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
					
			logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
			        
			LoginDto info = service.login( reqBodyMap );
			        
			if( !StringUtils.isEmpty(info) ) {		
				if(reqBodyMap.get("password").equals(info.getPassword())) {
					session.setAttribute("loginId", info.getLoginId());	
					responseBodyMap.put("rsltCode", "0000");
					responseBodyMap.put("rsltMsg", "Success");
					responseBodyMap.put("userGrade", info.getUserGrade());
					System.out.println(session.getAttribute("info"));
				}else {
					responseBodyMap.put("rsltCode", "2001");
					responseBodyMap.put("rsltMsg", "ID or PWD not correct.");
				}
				
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
