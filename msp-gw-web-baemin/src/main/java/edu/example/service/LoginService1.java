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

import edu.example.dto.LoginDto;

@Service
public class LoginService1 {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired(required = true)
	@Qualifier("sqlSession_sample")
	private SqlSession sqlSession;

	@Autowired(required = true)
	@Qualifier("transactionManager_sample")
	private DataSourceTransactionManager transactionManager_sample;
	
	// 비밀번호 체크
	public LoginDto checkPw(Map<String, Object> param) {
		return sqlSession.selectOne("Login.checkPw", param);
	}
	
	// 개인정보확인
	public LoginDto find(Map<String, Object> param) {
		return sqlSession.selectOne("Login.find", param);
	}

	// 아이디 찾기
	public LoginDto findId(Map<String, Object> param) {
		return sqlSession.selectOne("Login.findId", param);
	}

	// 로그인
	public LoginDto login(Map<String, Object> param) {
		return sqlSession.selectOne("Login.login", param);
	}

	// 아이디 중복확인
	public LoginDto dupLoginId(Map<String, Object> param) {
		return sqlSession.selectOne("Login.dupLoginId", param);
	}

	// 비밀번호 수정
	public int pwModify(Map<String, Object> param) {
		// 트렌젝션 구현
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);

		int result = 0;
		try {
			result += sqlSession.update("Login.memberPwModify", param);
			result += sqlSession.update("Login.storePwModify", param);
			result += sqlSession.update("Login.deliveryPwModify", param);

			transactionManager_sample.commit(status);
			logger.info("========== 비밀번호 수정 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] pwModify() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}

}
