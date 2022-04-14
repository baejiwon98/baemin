package edu.example.dto;

/**
 * @author user
 *
 */
public class OrderListAllDto {
	
	private String objectNum;
	private String memberNum;
	private String storeNum;
	private String storeName;
	private String objectName;
	private String status;
	private String objectImage;
	private Integer deliveryPrice;
	private Integer objectPrice;
	private Integer buyQty;
	
	public String toString() {
		return 	"objectNum="+objectNum
			+	"\n memberNum="+memberNum
			+	"\n storeNum="+storeNum
			+	"\n storeName="+storeName
			+	"\n deliveryPrice="+deliveryPrice
			+	"\n objectPrice="+objectPrice
			+	"\n buyQty="+buyQty
			+	"\n status="+status
		+	"\n objectImage="+objectImage;
	}
	
	public String getObjectImage() {
		return objectImage;
	}

	public void setObjectImage(String objectImage) {
		this.objectImage = objectImage;
	}

	public String getObjectName() {
		return objectName;
	}

	public void setObjectName(String objectName) {
		this.objectName = objectName;
	}	
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getObjectNum() {
		return objectNum;
	}

	public void setObjectNum(String objectNum) {
		this.objectNum = objectNum;
	}
	
	public String getStoreNum() {
		return storeNum;
	}

	public void setStoreNum(String storeNum) {
		this.storeNum = storeNum;
	}

	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	public Integer getDeliveryPrice() {
		return deliveryPrice;
	}

	public void setDeliveryPrice(Integer deliveryPrice) {
		this.deliveryPrice = deliveryPrice;
	}

	public Integer getObjectPrice() {
		return objectPrice;
	}

	public void setObjectPrice(Integer objectPrice) {
		this.objectPrice = objectPrice;
	}

	public Integer getBuyQty() {
		return buyQty;
	}

	public void setBuyQty(Integer buyQty) {
		this.buyQty = buyQty;
	}

	public String getMemberNum() {
		return memberNum;
	}

	public void setMemberNum(String memberNum) {
		this.memberNum = memberNum;
	}


	
}
