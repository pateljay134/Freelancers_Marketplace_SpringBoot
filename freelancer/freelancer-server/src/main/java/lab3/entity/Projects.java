package lab3.entity;

import javax.persistence.*;
import java.util.Date;


@Entity
public class Projects {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;
    private String skills_required;
    private String employer;
    private String budget_range;
    private String hiredbidder;
    private String status;
    private String file;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getBudget_range() {
        return budget_range;
    }

    public String getDescription() {
        return description;
    }

    public String getEmployer() {
        return employer;
    }

    public String getFile() {
        return file;
    }

    public String getHiredbidder() {
        return hiredbidder;
    }

    public String getSkills_required() {
        return skills_required;
    }

    public String getStatus() {
        return status;
    }

    public String getTitle() {
        return title;
    }

    public void setBudget_range(String budget_range) {
        this.budget_range = budget_range;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setEmployer(String employer) {
        this.employer = employer;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public void setHiredbidder(String hiredbidder) {
        this.hiredbidder = hiredbidder;
    }

    public void setSkills_required(String skills_required) {
        this.skills_required = skills_required;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
