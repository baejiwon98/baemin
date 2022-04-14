package edu.example.service;

import java.util.List;
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

import edu.example.dto.ObjectDto;

@Service
public class ObjectService {
	
	private Logger logger = LoggerFactory.getLogger(ObjectService.class);
	
	@Autowired(required=true)
    @Qualifier("sqlSession_sample")
    private SqlSession sqlSession;

    @Autowired(required=true)
    @Qualifier("transactionManager_sample")
    private DataSourceTransactionManager transactionManager_sample;
	
    
	/*
	 * // 메뉴 조회 
	 * public ObjectDto getObjectInfo(Map<String, Object> param) {
	 * 		return sqlSession.selectOne("Object.getObjectInfo", param); }
	 * 
	 */	
    
    // 매장 내 메뉴 리스트
	public List<Object> getStoreObjectInfo(Map<String, Object> param) {
		return sqlSession.selectList("Object.getStoreObjectInfo", param);
	}
	
    // 매장 내 메뉴 조회
	public ObjectDto getStoreObjectSearch(Map<String, Object> param) {
		return sqlSession.selectOne("Object.getStoreObjectInfo", param);
	}
	
	
    // 메뉴 번호 조회
	public ObjectDto getObjectNumInfo(Map<String, Object> param) {
		return sqlSession.selectOne("Object.getObjectNumInfo", param);
	}
	
	// 메뉴 등록 // 파일 없이
	public int insertObjectNotIncludeFiles( Map<String,Object> param ) {
		
		//트랜잭션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);

        int result = 0;
        try{
        	
            String autObjectNum = sqlSession.selectOne("Object.getObjectNumInfo");
            param.put("objectNum", autObjectNum);
            
            result = sqlSession.insert("Object.insertObjectNotIncludeFiles", param);
            
            transactionManager_sample.commit(status);
            logger.info("========== 상품 등록 완료 : {}", result);
            
        }catch(Exception e){
        	logger.error("[ERROR] insertObjectNotIncludeFiles() Fail : e : {}", e.getMessage());
        	e.printStackTrace();
        	transactionManager_sample.rollback(status);    	
        }
		return result;
	}
	
	// 메뉴 등록
	public int insertObject( Map<String,Object> param ) {
		
		//트랜잭션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);

        int result = 0;
        try{
        	
            String autObjectNum = sqlSession.selectOne("Object.getObjectNumInfo");
            param.put("objectNum", autObjectNum);
            
            result = sqlSession.insert("Object.insertObject", param);
            
            transactionManager_sample.commit(status);
            logger.info("========== 상품 등록 완료 : {}", result);
            
        }catch(Exception e){
        	logger.error("[ERROR] insertObject() Fail : e : {}", e.getMessage());
        	e.printStackTrace();
        	transactionManager_sample.rollback(status);    	
        }
		return result;
	}
	
	// 메뉴 수정 // 파일 없이
	public int updateObjectNotIncludeFiles( Map<String,Object> param ) {
		//트랜잭션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);

        int result = 0;
        try{
           
//        	ObjectDto info = sqlSession.selectOne("Object.getObjectInfo", param);
        	
//        	if( param.get("password").equals(info.getPassword()) ) {
        		result = sqlSession.update("Object.updateObjectNotIncludeFiles", param);
//        	}
            
            transactionManager_sample.commit(status);
            logger.info("========== 상품 수정 완료 : {}", result);
            
        }catch(Exception e){
        	logger.error("[ERROR] updateObjectNotIncludeFiles() Fail : e : {}", e.getMessage());
        	e.printStackTrace();
        	transactionManager_sample.rollback(status);    	
        }
		return result;
	}

	// 메뉴 수정
	public int updateObject( Map<String,Object> param ) {
		//트랜잭션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);

        int result = 0;
        try{
           
//        	ObjectDto info = sqlSession.selectOne("Object.getObjectInfo", param);
        	
//        	if( param.get("password").equals(info.getPassword()) ) {
        		result = sqlSession.update("Object.updateObject", param);
//        	}
            
            transactionManager_sample.commit(status);
            logger.info("========== 상품 수정 완료 : {}", result);
            
        }catch(Exception e){
        	logger.error("[ERROR] updateObject() Fail : e : {}", e.getMessage());
        	e.printStackTrace();
        	transactionManager_sample.rollback(status);    	
        }
		return result;
	}
	
	// 메뉴 삭제
	public int deleteObject(Map<String, Object> param) {
		//트랜잭션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);

        int result = 0;
        try{
           
            result = sqlSession.delete("Object.deleteObject", param);
            
            transactionManager_sample.commit(status);
            logger.info("========== 상품 삭제 완료 : {}", result);
            
        }catch(Exception e){
        	logger.error("[ERROR] insertObject() Fail : e : {}", e.getMessage());
        	e.printStackTrace();
        	transactionManager_sample.rollback(status);    	
        }
		return result;
	}
	

		

	
}
