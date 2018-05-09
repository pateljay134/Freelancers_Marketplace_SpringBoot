package lab3.controller;

import lab3.entity.Bid;
import lab3.entity.ProjectUserBidMapping;
import lab3.services.BidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.servlet.tags.Param;

import java.awt.*;
import java.util.*;
import java.util.List;

@Controller

@RequestMapping(path="/bid")

public class BidController {
    @Autowired
    private BidService bidService;

    @PostMapping(value = "/getAllBids", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Bid> getAllBids(@RequestBody String projectDetail) {


          System.out.println("Bids data" + projectDetail);

          Map<String, Object> result = new HashMap();
          result.put("rows", projectDetail);
          return new ResponseEntity(result, HttpStatus.OK);
    }

    @PostMapping(value = "/addproject", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Bid> submitBid(@RequestBody Long id, int project_id, int days, Float price) {

        float avgBid = bidService.submitBid(id, project_id, days, price);

        Map<String, Object> result = new HashMap();
        result.put("avgBid", avgBid);


        System.out.println("Avg bid is " + avgBid);
        return new ResponseEntity(result, HttpStatus.OK);

    }

    @PostMapping(value = "/userbids", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Bid> getBidValueForUser(@RequestBody Long user_id, int project_id) {

        List<Bid> bid = bidService.getUserBidValue(user_id, project_id);
        Map<String, Object> result = new HashMap();
        result.put("data_present", bid.size() > 0 ? true : false);
        result.put("rows", bid);
        return new ResponseEntity(result, HttpStatus.OK);

    }


}
