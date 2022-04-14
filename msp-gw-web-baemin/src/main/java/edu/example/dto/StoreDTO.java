package edu.example.dto;

public class StoreDTO {
	
	private String storeNum;
	private String employeeNum;
	private String employeeName;
	private String storeName;
	private String storeAddr;
	private String employeePhone;
	private String employeeEmail;
	private String employeeId;
	private String employeePw;
	private String deliveryStatus;
	private String pickupStatus;
	private String storePhone;
	private int leastPrice;
	private String orderArea;
	private int deliveryPrice;
	private String storeCategoryNum;
	
	@Override
	public String toString() {
		return "StoreDTO [storeNum=" + storeNum + ", employeeNum=" + employeeNum + ", employeeName=" + employeeName
				+ ", storeName=" + storeName + ", storeAddr=" + storeAddr + ", employeePhone=" + employeePhone
				+ ", employeeEmail=" + employeeEmail + ", employeeId=" + employeeId + ", employeePw=" + employeePw
				+ ", deliveryStatus=" + deliveryStatus + ", pickupStatus=" + pickupStatus
				+ ", storePhone=" + storePhone + ", leastPrice="
				+ leastPrice + ", orderArea=" + orderArea + ", deliveryPrice=" + deliveryPrice
				+ ", storeCategoryNum=" + storeCategoryNum + "]";
	}
	
	public String getStoreNum() {
		return storeNum;
	}
	public void setStoreNum(String storeNum) {
		this.storeNum = storeNum;
	}
	public String getEmployeeNum() {
		return employeeNum;
	}
	public void setEmployeeNum(String employeeNum) {
		this.employeeNum = employeeNum;
	}
	public String getEmployeeName() {
		return employeeName;
	}
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	public String getStoreName() {
		return storeName;
	}
	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}
	public String getStoreAddr() {
		return storeAddr;
	}
	public void setStoreAddr(String storeAddr) {
		this.storeAddr = storeAddr;
	}
	public String getEmployeePhone() {
		return employeePhone;
	}
	public void setEmployeePhone(String employeePhone) {
		this.employeePhone = employeePhone;
	}
	public String getEmployeeEmail() {
		return employeeEmail;
	}
	public void setEmployeeEmail(String employeeEmail) {
		this.employeeEmail = employeeEmail;
	}
	public String getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	public String getEmployeePw() {
		return employeePw;
	}
	public void setEmployeePw(String employeePw) {
		this.employeePw = employeePw;
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
	
	public String getStorePhone() {
		return storePhone;
	}
	public void setStorePhone(String storePhone) {
		this.storePhone = storePhone;
	}
	public int getLeastPrice() {
		return leastPrice;
	}
	public void setLeastPrice(int leastPrice) {
		this.leastPrice = leastPrice;
	}
	public String getOrderArea() {
		return orderArea;
	}
	public void setOrderArea(String orderArea) {
		this.orderArea = orderArea;
	}
	public int getDeliveryPrice() {
		return deliveryPrice;
	}
	public void setDeliveryPrice(int deliveryPrice) {
		this.deliveryPrice = deliveryPrice;
	}
	public String getStoreCategoryNum() {
		return storeCategoryNum;
	}
	public void setStoreCategoryNum(String storeCategoryNum) {
		this.storeCategoryNum = storeCategoryNum;
	}

	
}