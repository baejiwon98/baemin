package edu.example.dto;

import java.util.Date;

public class ReviewDto {
	
	private String orderNum;	
	private Integer reviewScore;
	private String reviewDate;
	private String reviewContent;
	private String reviewImage;
	private String storeReview;
	private String storeNum;
	
	public String toString() {
		return "orderNum="+orderNum
			+	"\n reviewScore="+reviewScore
			+	"\n reviewDate="+reviewDate
			+	"\n reviewContent="+reviewContent
			+	"\n reviewImage="+reviewImage
			+	"\n storeReview="+storeReview
			+	"\n storeNum="+storeNum;
	}

	public String getOrderNum() {
		return orderNum;
	}

	public void setOrderNum(String orderNum) {
		this.orderNum = orderNum;
	}

	public Integer getReviewScore() {
		return reviewScore;
	}

	public void setReviewScore(Integer reviewScore) {
		this.reviewScore = reviewScore;
	}

	public String getReviewDate() {
		return reviewDate;
	}

	public void setReviewDate(String reviewDate) {
		this.reviewDate = reviewDate;
	}

	public String getReviewContent() {
		return reviewContent;
	}

	public void setReviewContent(String reviewContent) {
		this.reviewContent = reviewContent;
	}

	public String getReviewImage() {
		return reviewImage;
	}

	public void setReviewImage(String reviewImage) {
		this.reviewImage = reviewImage;
	}

	public String getStoreReview() {
		return storeReview;
	}

	public void setStoreReview(String storeReview) {
		this.storeReview = storeReview;
	}

	public String getStoreNum() {
		return storeNum;
	}

	public void setStoreNum(String storeNum) {
		this.storeNum = storeNum;
	}
	
}
