package edu.example.dto;

public class MemberDto {
	
	private String memberNum;
	private String memberName;	
	private String memberEmail;
	private String memberPhone;
	private String memberNickname;	
	private String memberBirth;	
	private String memberId;
	private String memberPw;
	private String memberAddr;
	private String memberAddrDetail;
	
	public String toString() {
		return 	"memberNum="+memberNum
			+	"\n memberName="+memberName
			+	"\n memberEmail="+memberEmail
			+	"\n memberPhone="+memberPhone
			+	"\n memberNickname="+memberNickname
			+	"\n memberBirth="+memberBirth
			+	"\n memberId="+memberId
			+	"\n memberPw="+memberPw
			+	"\n memberAddr="+memberAddr
			+ 	"\n memberAddrDetail="+memberAddrDetail;
	}

	public String getMemberAddrDetail() {
		return memberAddrDetail;
	}

	public void setMemberAddrDetail(String memberAddrDetail) {
		this.memberAddrDetail = memberAddrDetail;
	}

	public String getMemberNum() {
		return memberNum;
	}

	public void setMemberNum(String memberNum) {
		this.memberNum = memberNum;
	}

	public String getMemberName() {
		return memberName;
	}

	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}

	public String getMemberEmail() {
		return memberEmail;
	}

	public void setMemberEmail(String memberEmail) {
		this.memberEmail = memberEmail;
	}

	public String getMemberPhone() {
		return memberPhone;
	}

	public void setMemberPhone(String memberPhone) {
		this.memberPhone = memberPhone;
	}

	public String getMemberNickname() {
		return memberNickname;
	}

	public void setMemberNickname(String memberNickname) {
		this.memberNickname = memberNickname;
	}

	public String getMemberBirth() {
		return memberBirth;
	}

	public void setMemberBirth(String memberBirth) {
		this.memberBirth = memberBirth;
	}

	public String getMemberId() {
		return memberId;
	}

	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}

	public String getMemberPw() {
		return memberPw;
	}

	public void setMemberPw(String memberPw) {
		this.memberPw = memberPw;
	}

	public String getMemberAddr() {
		return memberAddr;
	}

	public void setMemberAddr(String memberAddr) {
		this.memberAddr = memberAddr;
	}
	
	
}
