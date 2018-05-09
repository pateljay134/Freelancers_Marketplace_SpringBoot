package lab3.services;

import lab3.entity.Bid;
import lab3.repository.BidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BidService {
    @Autowired
    private BidRepository bidRepository;
    //@Autowired
    //ProjectUserBidMappingRepository projectUserBidMappingRepository;


    public List<Bid> getUserBidValue(long user_id, long project_id) {
        List<Bid> bids;
        bids = bidRepository.findByUserIdAndProjectId(user_id, project_id);

        System.out.println("I am inside bid" + bids);
        return bids;
    }



    public float submitBid(long user_id, long project_id, int number_of_days, float price) {
        List<Bid> bid = bidRepository.findByUserIdAndProjectId(user_id, project_id);
        System.out.println("User is " + user_id + " Project id is " + project_id);

        bid.get(0).setUsd(price);
        bid.get(0).setDays(number_of_days);
        bidRepository.save(bid.get(0));

        List<Bid> all_bids = bidRepository.findByProjectId(project_id);
        float avgBid = 0;
        float total_bids = all_bids.size();
        float bidPrice = 0;
        for(int i=0; i< all_bids.size(); i++){
            bidPrice += all_bids.get(i).getUsd();
        }
        avgBid = total_bids == 0 ? 0 : bidPrice/total_bids;
        return  avgBid;
    }
}
