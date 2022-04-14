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

import edu.example.dto.MemberDto;
import edu.example.service.MemberService;
import kr.msp.constant.Const;

@Controller
public class MemberController {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired(required=true)
	private MemberService service;
	
	// 회원 주소 저장
	@RequestMapping( method = RequestMethod.POST, value = "/api/member/updateAddr" )
	public ModelAndView updateMemberAddr( HttpServletRequest request, HttpServletResponse response ) {
		Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
		Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap= new HashMap<String, Object>();
		        
		if(reqHeadMap==null){
			reqHeadMap = new HashMap<String, Object>();
		}
		        
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
				
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
		        
		int result = service.updateMemberAddr( reqBodyMap );
		        
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
			
		// 멤버조회
		@RequestMapping( method = RequestMethod.POST, value = "/api/member/info" )
		public ModelAndView getMemberInfo( HttpServletRequest request, HttpServletResponse response ) {
			
	        Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
	        Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
	        Map<String, Object> responseBodyMap= new HashMap<String, Object>();
	        
	        if(reqHeadMap==null){
	            reqHeadMap = new HashMap<String, Object>();
	        }
	        
	        reqHeadMap.put(Const.RESULT_CODE, Const.OK);
	        reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
			
	        logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
	        
	        MemberDto info = service.getMemberInfo( reqBodyMap );
	        
	        if( !StringUtils.isEmpty(info) ) {
	        	responseBodyMap.put("rsltCode", "0000");
	            responseBodyMap.put("rsltMsg", "Success");
	            responseBodyMap.put("memberNum", info.getMemberNum());
	            responseBodyMap.put("memberName", info.getMemberName());
	            responseBodyMap.put("memberEmail", info.getMemberEmail());
	            responseBodyMap.put("memberPhone", info.getMemberPhone());
	            responseBodyMap.put("memberNickname", info.getMemberNickname());
	            responseBodyMap.put("memberBirth", info.getMemberBirth());
	            responseBodyMap.put("memberAddr", info.getMemberAddr());
	            responseBodyMap.put("memberAddrDetail", info.getMemberAddrDetail());
	        } else {
	        	responseBodyMap.put("rsltCode", "2003");
	            responseBodyMap.put("rsltMsg", "Data not found.");
	        }
			
	        ModelAndView mv = new ModelAndView("defaultJsonView");
	        mv.addObject(Const.HEAD,reqHeadMap);
	        mv.addObject(Const.BODY,responseBodyMap);

	        return mv;
		}
		
		//멤버 탈퇴
		@RequestMapping ( method = RequestMethod.POST, value = "/api/member/out")
		public ModelAndView outMember( HttpServletRequest request, HttpServletResponse response ) {
			
			Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
	        Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
	        Map<String, Object> responseBodyMap= new HashMap<String, Object>();
	        
	        if(reqHeadMap==null){
	            reqHeadMap = new HashMap<String, Object>();
	        }
	        
	        reqHeadMap.put(Const.RESULT_CODE, Const.OK);
	        reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
			
	        logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
	        
	        int result = service.outMember( reqBodyMap );
	        
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
		
		// 유저 등록
		@RequestMapping( method = RequestMethod.POST, value = "/api/member/join" )
		public ModelAndView regMember( HttpServletRequest request, HttpServletResponse response ) {
			
	        Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
	        Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
	        Map<String, Object> responseBodyMap= new HashMap<String, Object>();
	        
	        if(reqHeadMap==null){
	            reqHeadMap = new HashMap<String, Object>();
	        }
	        
	        reqHeadMap.put(Const.RESULT_CODE, Const.OK);
	        reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
			
	        logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
	        
	        int result = service.insertMember( reqBodyMap );
	        
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
		
		// 회원정보 수정
		@RequestMapping( method = RequestMethod.POST, value = "/api/member/update" )
		public ModelAndView updateMember( HttpServletRequest request, HttpServletResponse response ) {
			
	        Map<String,Object> reqHeadMap =  (Map<String,Object>)request.getAttribute(Const.HEAD);
	        Map<String,Object> reqBodyMap =  (Map<String,Object>)request.getAttribute(Const.BODY);
	        Map<String, Object> responseBodyMap= new HashMap<String, Object>();
	        
	        if(reqHeadMap==null){
	            reqHeadMap = new HashMap<String, Object>();
	        }
	        
	        reqHeadMap.put(Const.RESULT_CODE, Const.OK);
	        reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
			
	        logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
	        
	        int result = service.updateMember( reqBodyMap );
	        
	        if(result >= 0) {
				if(result != 0) {
					responseBodyMap.put("rsltCode", "0000");
		            responseBodyMap.put("rsltMsg", "Success");
				} else {
					responseBodyMap.put("rsltCode", "2003");
		            responseBodyMap.put("rsltMsg", "비밀번호가 틀렸습니다.");
				}
			}else {
	        	responseBodyMap.put("rsltCode", "2003");
	            responseBodyMap.put("rsltMsg", "Data not found.");
	        }
			
	        ModelAndView mv = new ModelAndView("defaultJsonView");
	        mv.addObject(Const.HEAD,reqHeadMap);
	        mv.addObject(Const.BODY,responseBodyMap);

	        return mv;
		}
}
