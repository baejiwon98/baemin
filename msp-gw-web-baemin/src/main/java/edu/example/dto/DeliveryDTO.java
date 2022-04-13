package edu.example.dto;


public class DeliveryDTO {

	String deliveryNum;
	String deliveryId;
	String deliveryName;
	String deliveryEmail;
	String deliveryPhone;
	String deliveryBirth;
	String deliveryPw;
	String deliveryAddr;
	String deliveryAddrdetail;
	
	@Override
	public String toString() {
		return "DeliveryDTO [deliveryNum=" + deliveryNum + ", deliveryId=" + deliveryId + ", deliveryName="
				+ deliveryName + ", deliveryEmail=" + deliveryEmail + ", deliveryPhone=" + deliveryPhone
				+ ", deliveryBirth=" + deliveryBirth + ", deliveryPw=" + deliveryPw + ", deliveryAddr=" + deliveryAddr
				+ ", deliveryAddrdetail=" + deliveryAddrdetail + "]";
	}
	
	public String getDeliveryNum() {
		return deliveryNum;
	}
	public void setDeliveryNum(String deliveryNum) {
		this.deliveryNum = deliveryNum;
	}
	public String getDeliveryId() {
		return deliveryId;
	}
	public void setDeliveryId(String deliveryId) {
		this.deliveryId = deliveryId;
	}
	public String getDeliveryName() {
		return deliveryName;
	}
	public void setDeliveryName(String deliveryName) {
		this.deliveryName = deliveryName;
	}
	public String getDeliveryEmail() {
		return deliveryEmail;
	}
	public void setDeliveryEmail(String deliveryEmail) {
		this.deliveryEmail = deliveryEmail;
	}
	public String getDeliveryPhone() {
		return deliveryPhone;
	}
	public void setDeliveryPhone(String deliveryPhone) {
		this.deliveryPhone = deliveryPhone;
	}
	public String getDeliveryBirth() {
		return deliveryBirth;
	}
	public void setDeliveryBirth(String deliveryBirth) {
		this.deliveryBirth = deliveryBirth;
	}
	public String getDeliveryPw() {
		return deliveryPw;
	}
	public void setDeliveryPw(String deliveryPw) {
		this.deliveryPw = deliveryPw;
	}
	public String getDeliveryAddr() {
		return deliveryAddr;
	}
	public void setDeliveryAddr(String deliveryAddr) {
		this.deliveryAddr = deliveryAddr;
	}
	public String getDeliveryAddrdetail() {
		return deliveryAddrdetail;
	}
	public void setDeliveryAddrdetail(String deliveryAddrdetail) {
		this.deliveryAddrdetail = deliveryAddrdetail;
	}
	
}
