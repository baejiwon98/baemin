package edu.example.service;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import edu.example.dto.MemberDto;

@Service
public class MemberService {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired(required = true)
	@Qualifier("sqlSession_sample")
	private SqlSession sqlSession;

	@Autowired(required = true)
	@Qualifier("transactionManager_sample")
	private DataSourceTransactionManager transactionManager_sample;
	
	public int updateMemberAddr( Map<String,Object> param ) {
		//트렌젝션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);

        int result = 0;
        try{
           
        	MemberDto info = sqlSession.selectOne("Member.getMemberInfo", param);
        	
        	result = sqlSession.update("Member.updateMemberAddr", param);
            
            transactionManager_sample.commit(status);
            logger.info("========== 유저 주소 수정 완료 : {}", result);
            
        }catch(Exception e){
        	logger.error("[ERROR] updateMember() Fail : e : {}", e.getMessage());
        	e.printStackTrace();
        	transactionManager_sample.rollback(status);    	
        }
		return result;
	}
	
    public int outMember( Map<String,Object> param ) {
		
		//트렌젝션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);

        int result = 0;
        try{
           
            result = sqlSession.delete("Member.outMember", param);
            
            transactionManager_sample.commit(status);
            logger.info("========== 유저 탈퇴 완료 : {}", result);
            
        }catch(Exception e){
        	logger.error("[ERROR] deleteUser() Fail : e : {}", e.getMessage());
        	e.printStackTrace();
        	transactionManager_sample.rollback(status);    	
        }
		return result;
	}

	public MemberDto getMemberInfo( Map<String,Object> param ) {
		return sqlSession.selectOne("Member.getMemberInfo", param);
	}
	
	public int insertMember(Map<String, Object> param) {

		// 트렌젝션 구현
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);

		int result = 0;
		try {
			String memNum = sqlSession.selectOne("Member.autoNum");
			param.put("memberNum", memNum);
			result = sqlSession.insert("Member.insertMember", param);
			transactionManager_sample.commit(status);
			logger.info("========== 유저 등록 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] insertUser() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}

	public int updateMember( Map<String,Object> param ) {
		//트렌젝션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);

        int result = 0;
        try{
           
        	MemberDto info = sqlSession.selectOne("Member.getMemberInfo", param);
        	
        	if( param.get("memberPw").equals(info.getMemberPw()) ) {
        		result = sqlSession.update("Member.updateMember", param);
        	}
            
            transactionManager_sample.commit(status);
            logger.info("========== 유저 수정 완료 : {}", result);
            
        }catch(Exception e){
        	logger.error("[ERROR] updateMember() Fail : e : {}", e.getMessage());
        	e.printStackTrace();
        	transactionManager_sample.rollback(status);    	
        }
		return result;
	}
	
}
