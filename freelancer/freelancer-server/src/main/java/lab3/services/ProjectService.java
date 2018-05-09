package lab3.services;

import lab3.entity.Bid;
import lab3.entity.ProjectUserBidMapping;
import lab3.entity.Projects;
import lab3.repository.BidRepository;
import lab3.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BidRepository bidRepository;

    public Iterable<Projects> findAll() {
        return projectRepository.findAll();
    }

    public String hireUser(long freelancerId, long projectId){

        List<Bid> bids = bidRepository.findByProjectId(projectId);

        for(int i = 0; i < bids.size(); i++){
            bidRepository.save(bids.get(i));
        }
        List<Bid> accepted_bid = bidRepository.findByUserIdAndProjectId(freelancerId, projectId);

        bidRepository.save(accepted_bid.get(0));

        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.DATE, (int)accepted_bid.get(0).getDays());

        Optional<Projects> projects = projectRepository.findById(projectId);


        projectRepository.save(projects.get());
        return "FreeLancer Hired";
    }

    public  String createProject(String title, String file, String employer, String description, String budget_range, String skills_required){
        Projects project = new Projects();
        project.setTitle(title);
        project.setDescription(description);
        project.setSkills_required(skills_required);
        project.setEmployer(employer);
        project.setBudget_range(budget_range);
        projectRepository.save(project);
        return "Project Created";
    }

}
