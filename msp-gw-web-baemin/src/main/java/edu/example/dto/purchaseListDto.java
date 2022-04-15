package edu.example.dto;

public class purchaseListDto {
	private String orderNum;
	private String objectNum;
	private String memberNum;
	private Integer menuQty;
	private Integer menuPrice;
	
	public String toString() {
		return "orderNum="+orderNum
			+	"\n objectNum="+objectNum
			+	"\n memberNum="+memberNum
			+	"\n menuQty="+menuQty
			+	"\n menuPrice="+menuPrice;
	}

	public String getMemberNum() {
		return memberNum;
	}

	public void setMemberNum(String memberNum) {
		this.memberNum = memberNum;
	}

	public String getOrderNum() {
		return orderNum;
	}

	public void setOrderNum(String orderNum) {
		this.orderNum = orderNum;
	}

	public String getObjectNum() {
		return objectNum;
	}

	public void setObjectNum(String objectNum) {
		this.objectNum = objectNum;
	}

	public Integer getMenuQty() {
		return menuQty;
	}

	public void setMenuQty(Integer menuQty) {
		this.menuQty = menuQty;
	}

	public Integer getMenuPrice() {
		return menuPrice;
	}

	public void setMenuPrice(Integer menuPrice) {
		this.menuPrice = menuPrice;
	}
}
