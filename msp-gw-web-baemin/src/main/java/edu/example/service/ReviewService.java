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

import edu.example.dto.ReviewDto;

@Service
public class ReviewService {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired(required = true)
	@Qualifier("sqlSession_sample")
	private SqlSession sqlSession;

	@Autowired(required = true)
	@Qualifier("transactionManager_sample")
	private DataSourceTransactionManager transactionManager_sample;
	
	public int reviewFileUpdate( Map<String,Object> param ) {
		//트렌젝션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);

        int result = 0;
        try{
        	result = sqlSession.update("Review.reviewFileUpdate", param);
            
            transactionManager_sample.commit(status);
            logger.info("========== 내 리뷰 업로드 수정 완료 : {}", result);
            
        }catch(Exception e){
        	logger.error("[ERROR] reviewFileUpdate() Fail : e : {}", e.getMessage());
        	e.printStackTrace();
        	transactionManager_sample.rollback(status);    	
        }
		return result;
	}
	
	public int reviewFileRegist( Map<String,Object> param ) {
		//트렌젝션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);

        int result = 0;
        try{
        	result = sqlSession.insert("Review.reviewFileRegist", param);
            
            transactionManager_sample.commit(status);
            logger.info("========== 내 리뷰 업로드 등록 완료 : {}", result);
            
        }catch(Exception e){
        	logger.error("[ERROR] reviewFileRegist() Fail : e : {}", e.getMessage());
        	e.printStackTrace();
        	transactionManager_sample.rollback(status);    	
        }
		return result;
	}
	
	public int updateMyReview( Map<String,Object> param ) {
		//트렌젝션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);

        int result = 0;
        try{
           
        	ReviewDto info = sqlSession.selectOne("Review.getMyReviewInfo", param);
        	result = sqlSession.update("Review.myreviewupdate", param);
            
            transactionManager_sample.commit(status);
            logger.info("========== 내 리뷰 수정 완료 : {}", result);
            
        }catch(Exception e){
        	logger.error("[ERROR] updateMyReview() Fail : e : {}", e.getMessage());
        	e.printStackTrace();
        	transactionManager_sample.rollback(status);    	
        }
		return result;
	}
	
	public int updateStoreReview( Map<String,Object> param ) {
		//트렌젝션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);

        int result = 0;
        try{
           
        	ReviewDto info = sqlSession.selectOne("Review.getReviewInfo", param);
        	result = sqlSession.update("Review.updateStoreReview", param);
            
            transactionManager_sample.commit(status);
            logger.info("========== 가게 리뷰 수정 완료 : {}", result);
            
        }catch(Exception e){
        	logger.error("[ERROR] updateStoreReview() Fail : e : {}", e.getMessage());
        	e.printStackTrace();
        	transactionManager_sample.rollback(status);    	
        }
		return result;
	}
	
	public ReviewDto getReviewInfo( Map<String,Object> param ) {
		return sqlSession.selectOne("Review.getReviewInfo", param);
	}
	
	public ReviewDto getMyReviewInfo( Map<String,Object> param ) {
		return sqlSession.selectOne("Review.getMyReviewInfo", param);
	}
	
	public int insertStoreReview( Map<String,Object> param ) {
		//트렌젝션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);

        int result = 0;
        try{
           
        	ReviewDto info = sqlSession.selectOne("Review.getReviewInfo", param);
        	result = sqlSession.update("Review.insertStoreReview", param);
            
            transactionManager_sample.commit(status);
            logger.info("========== 가게 리뷰 등록 완료 : {}", result);
            
        }catch(Exception e){
        	logger.error("[ERROR] updateMember() Fail : e : {}", e.getMessage());
        	e.printStackTrace();
        	transactionManager_sample.rollback(status);    	
        }
		return result;
	}

	
	public int deleteStoreReview( Map<String,Object> param ) {
		//트렌젝션 구현
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        TransactionStatus status = transactionManager_sample.getTransaction(def);

        int result = 0;
        try{
           
        	ReviewDto info = sqlSession.selectOne("Review.getReviewInfo", param);
        	result = sqlSession.update("Review.deleteStoreReview", param);
            
            transactionManager_sample.commit(status);
            logger.info("========== 가게 리뷰 삭제 완료 : {}", result);
            
        }catch(Exception e){
        	logger.error("[ERROR] updateMember() Fail : e : {}", e.getMessage());
        	e.printStackTrace();
        	transactionManager_sample.rollback(status);    	
        }
		return result;
	}
  
	public int myReviewDelete( Map<String,Object> param ) {		
		//트렌젝션 구현
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);

		int result = 0;
		try{
         
			result = sqlSession.delete("Review.myReviewDelete", param);
          
			transactionManager_sample.commit(status);
			logger.info("========== 내 리뷰 삭제 완료 : {}", result);
          
		}catch(Exception e){
			logger.error("[ERROR] deleteUser() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);    	
		}
		return result;
	}
	
	public List<ReviewDto> getMyReviewlist( Map<String,Object> param ) {
		return sqlSession.selectList("Review.getMyReviewlist", param);
	}
	
	public List<ReviewDto> getReviewlist( Map<String,Object> param ) {
		return sqlSession.selectList("Review.getReviewlist", param);
	}
	
	public int insertReview(Map<String, Object> param) {
		// 트렌젝션 구현
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);

		int result = 0;
		try {
			result = sqlSession.insert("Review.insertReview", param);
			transactionManager_sample.commit(status);
			logger.info("========== 내 리뷰 등록 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] insertReview() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}
}
