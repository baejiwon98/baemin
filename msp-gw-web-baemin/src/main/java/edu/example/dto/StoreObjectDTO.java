package edu.example.dto;

public class StoreObjectDTO {

	private String storeNum;
	private String objectNum;
	private String storeName;
	private String objectName;
	private Integer reviewScore;
	private String deliveryStatus;
	private String pickupStatus;
	private Integer leastPrice;
	private Integer deliveryPrice;
	

//	STORE_ADDR         NOT NULL VARCHAR2(200)
//
//	ORDER_AREA                  VARCHAR2(200) 
//	STORE_CATEGORY_NUM NOT NULL
		

	public String toString() {
		return 	"storeNum="+storeNum
			+	"\n storeName="+storeName
			+	"\n objectNum="+objectNum
			+	"\n objectName="+objectName
			+	"\n reviewScore="+reviewScore
			+	"\n deliveryStatus="+deliveryStatus
		+	"\n pickupStatus="+pickupStatus;
	}
	
	
	
	public String getDeliveryStatus() {
		return deliveryStatus;
	}



	public void setDeliveryStatus(String deliveryStatus) {
		this.deliveryStatus = deliveryStatus;
	}



	public String getPickupStatus() {
		return pickupStatus;
	}



	public void setPickupStatus(String pickupStatus) {
		this.pickupStatus = pickupStatus;
	}



	public String getStoreNum() {
		return storeNum;
	}



	public void setStoreNum(String storeNum) {
		this.storeNum = storeNum;
	}



	public String getObjectNum() {
		return objectNum;
	}



	public void setObjectNum(String objectNum) {
		this.objectNum = objectNum;
	}



	public Integer getReviewScore() {
		return reviewScore;
	}



	public void setReviewScore(Integer reviewScore) {
		this.reviewScore = reviewScore;
	}



	public String getStoreName() {
		return storeName;
	}
	
	
	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}
	
	
	public String getObjectName() {
		return objectName;
	}
	
	
	public void setObjectName(String objectName) {
		this.objectName = objectName;
	}
	
	
}
