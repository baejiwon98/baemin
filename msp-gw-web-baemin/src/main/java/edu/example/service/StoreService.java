package edu.example.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import edu.example.dto.StoreCategoryDTO;
import edu.example.dto.StoreDTO;
import edu.example.dto.StoreObjectDTO;

@Service
public class StoreService {

	private Logger logger = LoggerFactory.getLogger(StoreService.class);
	
//	@Autowired
//	private JavaMailSender mailSender;
	
	@Autowired(required=true)
    @Qualifier("sqlSession_sample")
    private SqlSession sqlSession;

    @Autowired(required=true)
    @Qualifier("transactionManager_sample")
    private DataSourceTransactionManager transactionManager_sample;
    
    public int insertStore(Map<String, Object> param) {
    	// 트렌젝션 구현
    	DefaultTransactionDefinition def = new DefaultTransactionDefinition();
    	def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
    	TransactionStatus status = transactionManager_sample.getTransaction(def);
    	
//    	====== mail 
//    	try {
//			MimeMessage msg = mailSender.createMimeMessage();
//
//			msg.setHeader("content-type", "text/html; charset=UTF-8");
//			msg.setContent(content, "text/html; charset=UTF-8");
//			msg.setSubject(subject);
//			msg.setRecipient(MimeMessage.RecipientType.TO , new InternetAddress(reciver));
//			mailSender.send(msg);
//		}catch(Exception e) {
//			e.printStackTrace();
//		}

    	int result = 0;
    	try {
    		String store = sqlSession.selectOne("Store.storeAutoNum");
    		param.put("storeNum", store);
    		
			result = sqlSession.insert("Store.insertStore", param);
    		
    		transactionManager_sample.commit(status);
            logger.info("========== insertStore 완료 : {}", result);
    	}catch(Exception e) {
    		logger.error("[ERROR] insertStore() Fail : e : {}", e.getMessage());
    		e.printStackTrace();
        	transactionManager_sample.rollback(status);    	
    	}
    	return result;
    }
    
    public StoreDTO detailStore(Map<String, Object> param) {
    	return sqlSession.selectOne("Store.detailStore", param);
    }
    
    public List<StoreCategoryDTO> storeList(Map<String, Object> param) {
    	return sqlSession.selectList("Store.storeList", param);
    }
    
    public int updateStore(Map<String, Object> param) {
    	// 트렌젝션 구현
    	DefaultTransactionDefinition def = new DefaultTransactionDefinition();
    	def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
    	TransactionStatus status = transactionManager_sample.getTransaction(def);
    	
    	int result = 0;
    	try {
    		StoreDTO info = sqlSession.selectOne("Store.detailStore", param);
        	if( param.get("employeePw").equals(info.getEmployeePw())){
        		result = sqlSession.update("Store.updateStore", param);
        	} else {
        		result = 0;
        	}
    		
    		transactionManager_sample.commit(status);
            logger.info("========== updateStore 완료 : {}", result);
    	}catch(Exception e) {
    		logger.error("[ERROR] updateStore() Fail : e : {}", e.getMessage());
    		e.printStackTrace();
        	transactionManager_sample.rollback(status);    	
    	}
    	return result;
    }
    
    public int deleteStore(Map<String, Object> param) {
    	// 트렌젝션 구현
    	DefaultTransactionDefinition def = new DefaultTransactionDefinition();
    	def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
    	TransactionStatus status = transactionManager_sample.getTransaction(def);
    	int result = 0;
    	try {
    		StoreDTO info = sqlSession.selectOne("Store.detailStore", param);
    		
    		if( param.get("employeePw").equals(info.getEmployeePw()) ) {
    			result = sqlSession.update("Store.deleteStore", param);
    		}
    		
    		transactionManager_sample.commit(status);
    		logger.info("========== deleteStore 완료 : {}", result);
    	}catch(Exception e) {
    		logger.error("[ERROR] deleteStore() Fail : e : {}", e.getMessage());
    		e.printStackTrace();
    		transactionManager_sample.rollback(status);    	
    	}
    	return result;
    }
    
    public List<StoreObjectDTO> nameSearch(Map<String, Object> param) {
    	return sqlSession.selectList("Store.nameSearch", param);
    }
    
}
