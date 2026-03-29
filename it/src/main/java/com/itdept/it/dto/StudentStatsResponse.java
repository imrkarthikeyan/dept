package com.itdept.it.dto;

import lombok.Data;

@Data
public class StudentStatsResponse {
    private int totalBlogsCreated;
    private int totalLikesReceived;
    private int totalLikesGiven;
    private int currentStreak;
    private int longestStreak;
    private Integer totalViews;
    private double averageLikesPerBlog;

    public StudentStatsResponse() {
    }

    public int getTotalBlogsCreated() {
        return totalBlogsCreated;
    }

    public void setTotalBlogsCreated(int totalBlogsCreated) {
        this.totalBlogsCreated = totalBlogsCreated;
    }

    public int getTotalLikesReceived() {
        return totalLikesReceived;
    }

    public void setTotalLikesReceived(int totalLikesReceived) {
        this.totalLikesReceived = totalLikesReceived;
    }

    public int getTotalLikesGiven() {
        return totalLikesGiven;
    }

    public void setTotalLikesGiven(int totalLikesGiven) {
        this.totalLikesGiven = totalLikesGiven;
    }

    public int getCurrentStreak() {
        return currentStreak;
    }

    public void setCurrentStreak(int currentStreak) {
        this.currentStreak = currentStreak;
    }

    public int getLongestStreak() {
        return longestStreak;
    }

    public void setLongestStreak(int longestStreak) {
        this.longestStreak = longestStreak;
    }

    public Integer getTotalViews() {
        return totalViews;
    }

    public void setTotalViews(Integer totalViews) {
        this.totalViews = totalViews;
    }

    public double getAverageLikesPerBlog() {
        return averageLikesPerBlog;
    }

    public void setAverageLikesPerBlog(double averageLikesPerBlog) {
        this.averageLikesPerBlog = averageLikesPerBlog;
    }
}
