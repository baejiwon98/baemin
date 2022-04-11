package edu.example.dto;

public class LoginDto {
	private String loginId;
	private String password;	
	private String userEmail;
	private String userPhone;
	private String userNum;	
	private String userName;	
	private String userGrade;
	
	public String toString() {
		return 	"loginId="+loginId
			+	"\n password="+password
			+	"\n userEmail="+userEmail
			+	"\n userPhone="+userPhone
			+	"\n userNum="+userNum
			+	"\n userName="+userName
			+	"\n userGrade="+userGrade;
	}

	public String getUserGrade() {
		return userGrade;
	}

	public void setUserGrade(String userGrade) {
		this.userGrade = userGrade;
	}

	public String getLoginId() {
		return loginId;
	}

	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getUserPhone() {
		return userPhone;
	}

	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
	}

	public String getUserNum() {
		return userNum;
	}

	public void setUserNum(String userNum) {
		this.userNum = userNum;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	
}
