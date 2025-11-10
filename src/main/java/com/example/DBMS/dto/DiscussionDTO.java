package com.example.DBMS.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class DiscussionDTO {

    private int Discussion_id;
    private String Topic;
    private int User_id;
    private Integer Parent_Discussion_Id;
    private int Quiz_id;

    @JsonProperty("Discussion_id")
    public int getDiscussion_id() { return Discussion_id; }
    public void setDiscussion_id(int Discussion_id) { this.Discussion_id = Discussion_id; }

    @JsonProperty("Topic")
    public String getTopic() { return Topic; }
    public void setTopic(String Topic) { this.Topic = Topic; }

    @JsonProperty("User_id")
    public int getUser_id() { return User_id; }
    public void setUser_id(int User_id) { this.User_id = User_id; }

    @JsonProperty("Parent_Discussion_Id")
    public Integer getParent_Discussion_Id() { return Parent_Discussion_Id; }
    public void setParent_Discussion_Id(Integer Parent_Discussion_Id) { this.Parent_Discussion_Id = Parent_Discussion_Id; }

    @JsonProperty("Quiz_id")
    public int getQuiz_id() { return Quiz_id; }
    public void setQuiz_id(int Quiz_id) { this.Quiz_id = Quiz_id; }
}
