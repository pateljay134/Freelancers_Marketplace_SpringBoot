package lab3.controller;

import lab3.entity.Users;
import lab3.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;



@Controller    // This means that this class is a Controller
@RequestMapping(path="/user") // This means URL's start with /demo (after Application path)
public class UserController {
    @Autowired // This means to get the bean called userRepository
    private UserService userService;

    @PostMapping(path="/signup", consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String signup (@RequestBody Users user){
        System.out.println("User in addNewUser" + user.getUsername());
        userService.save(user);
        return "Saved";
    }

}