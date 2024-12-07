import React, { useState } from "react";
import "./CustomerReviews.css";
import reviewsData from "../components/reviewsData";

const CustomerReviews = () => {
  const [newComment, setNewComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(5);
  const [replyTo, setReplyTo] = useState(null);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setNewComment("");
    setReplyTo(null);
  };

  return (
    <div className="customer-reviews-container">
      <h2 className="customer-reviews-title">Khách hàng nói về sản phẩm</h2>
      <div className="reviews-grid">
        <div className="rating-section">
          <span className="rating-score">
            {hoverRating || selectedRating}.0
          </span>
          <div className="star-container">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={() => setHoverRating(index + 1)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setSelectedRating(index + 1)}
                style={{ cursor: "pointer" }}
              >
                <path
                  d="M7.6939 2.10179C8.02403 1.43287 8.97789 1.43287 9.30802 2.10179L10.8291 5.18384L14.2304 5.67807C14.9685 5.78534 15.2633 6.69251 14.7291 7.2132L12.268 9.61224L12.849 12.9997C12.9751 13.735 12.2034 14.2956 11.5431 13.9485L8.50096 12.3491L5.45879 13.9485C4.79853 14.2956 4.02684 13.735 4.15294 12.9997L4.73394 9.61224L2.27277 7.2132C1.73861 6.69251 2.03336 5.78534 2.77156 5.67807L6.17281 5.18384L7.6939 2.10179Z"
                  fill={
                    index < (hoverRating || selectedRating)
                      ? "#FBBF24"
                      : "#e0e0e0"
                  }
                ></path>
              </svg>
            ))}
          </div>
          <p className="review-count">1 lượt đánh giá</p>
          <button className="rate-button">Đánh giá sản phẩm</button>
        </div>
        <div className="breakdown-section">
          <div className="rating-breakdown">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="rating-row">
                <span>{star}★</span>
                <div className="rating-bar">
                  <div
                    className="rating-fill"
                    style={{ width: star === 5 ? "100%" : "0%" }}
                  ></div>
                </div>
                <span className="rating-count">{star === 5 ? 1 : 0}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container-input-comment">
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <input
            type="text"
            placeholder="Nhập nội dung bình luận"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="comment-input"
          />
          <button type="submit" className="submit-button">
            Gửi
          </button>
        </form>
      </div>
      <div className="reviews-list">
        {reviewsData.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <div className="avatar">{review.name.charAt(0)}</div>
              <div>
                <strong>{review.name}</strong>{" "}
                <span className="review-time">• {review.time}</span>
              </div>
            </div>
            <p className="review-comment">{review.comment}</p>
            <button
              className="reply-button"
              onClick={() => setReplyTo(review.name)}
            >
              <i className="fa-solid fa-rotate-left"></i>
              Trả lời
            </button>
          </div>
        ))}
      </div>
      {replyTo && (
        <div className="reply-form">
          <div className="reply-header">
            <span>
              Đang trả lời: <strong>{replyTo}</strong>
            </span>
            <button onClick={() => setReplyTo(null)} className="close-reply">
              X
            </button>
          </div>
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              type="text"
              placeholder="Nhập nội dung bình luận"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-input"
            />
            <button type="submit" className="submit-button">
              Gửi
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;
