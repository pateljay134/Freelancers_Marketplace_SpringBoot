package lab3.entity;

import javax.persistence.*;
import java.util.Date;

@Entity

public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long bid_id;
    private int project_id;
    private int days;
    private float usd;
    private String bidder_name;

    public float getUsd() {
        return usd;
    }

    public int getDays() {
        return days;
    }

    public int getProject_id() {
        return project_id;
    }

    public long getBid_id() {
        return bid_id;
    }

    public String getBidder_name() {
        return bidder_name;
    }

    public void setBid_id(long bid_id) {
        this.bid_id = bid_id;
    }

    public void setBidder_name(String bidder_name) {
        this.bidder_name = bidder_name;
    }

    public void setDays(int days) {
        this.days = days;
    }

    public void setProject_id(int project_id) {
        this.project_id = project_id;
    }

    public void setUsd(float usd) {
        this.usd = usd;
    }

}

