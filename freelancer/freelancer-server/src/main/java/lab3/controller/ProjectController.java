package lab3.controller;


import lab3.entity.Projects;
import lab3.services.ProjectService;
import lab3.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.*;

@Controller
@RequestMapping(path="/project")
public class ProjectController{
    @Autowired
    private ProjectService projectService;
    @Autowired
    private UserService userService;

    @GetMapping(value = "/projectsfetch", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Projects> getallprojects() {

        Map<String, Object> result = new HashMap();
        return new ResponseEntity(result, HttpStatus.OK);

    }

    @PostMapping(value = "/addproject", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Projects> createProject(@RequestParam(value = "file", required = false) MultipartFile file, @RequestParam("title") String title,
                                                  @RequestParam("description") String description,
                                                  @RequestParam("skills_required") String skills_required,
                                                  @RequestParam("minimum_budget") String budget_range,
                                                  @RequestParam("user_id") String user_id,
                                                  @RequestParam("username") String username) {

        String employer = username;
        String newFileName = "";
        if (file != null) {
            try {


                newFileName = (new Date()).getTime() + "" + file.getOriginalFilename();
                byte[] bytes = file.getBytes();

                BufferedOutputStream buffStream =
                        new BufferedOutputStream(new FileOutputStream(new File("/home/murtaza/Desktop/FreeLancer/src/project-file/" + "" + newFileName)));
                buffStream.write(bytes);

                buffStream.close();

                String message = projectService.createProject(title, newFileName, employer, description, budget_range, skills_required);
                return new ResponseEntity(message, HttpStatus.OK);
            } catch (Exception e) {
                return null;
            }
        } else {
            String message = projectService.createProject(title, newFileName, employer, description, budget_range, skills_required);
            return new ResponseEntity(message, HttpStatus.OK);
        }


    }

    @PostMapping(value = "/projectfetch", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Projects> get_project_detail(@RequestBody String project_id) {
          Map<String, Object> result = new HashMap();
          result.put("rows", project_id);
          return new ResponseEntity(result, HttpStatus.OK);

    }

    @PostMapping(value = "/userprojects", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Projects> get_all_user_published_projects(@RequestBody String user_id, String project_id) {
        Map<String, Object> result = new HashMap();
        result.put("rows", user_id);
        System.out.println("This is project" + project_id);
        return new ResponseEntity(result, HttpStatus.OK);

    }

    @PostMapping(value = "/userbids", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Projects> getUserBidProjects(@RequestBody String project_id) {
        Map<String, Object> result = new HashMap();
        result.put("rows", project_id);
        return new ResponseEntity(result, HttpStatus.OK);

    }


    @PostMapping(value = "/hirebidder", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Projects> hireUser(@RequestBody Long user_id, Long project_id) {
        String message = projectService.hireUser(user_id, project_id);

        return new ResponseEntity(message, HttpStatus.OK);

    }



}
