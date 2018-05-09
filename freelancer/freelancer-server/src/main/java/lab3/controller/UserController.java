package lab3.controller;

import lab3.entity.Users;
import lab3.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpSession;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.*;


//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.tags.Param;

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

    @PostMapping(path="/signin", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Users> login (@RequestBody Users user, HttpSession session){
        System.out.println("User in login" + user.getUsername() + " " + user.getPassword());
        String email = user.getUsername();
        String password = user.getPassword();
        session.setAttribute("email", user.getUsername());
        session.setAttribute("name", user.getName());
        Map<String, Object> result = new HashMap();
        List<Users> user_object = new ArrayList<Users>();
        user_object = userService.login(email, password);
        result.put("correctCredentials", user_object == null ? false : true);
        result.put("rows", user_object);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PostMapping(path="/profilefetch", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Users> getUser(@RequestBody Users user) {

        Users user_object;
        user_object = userService.findUser();
        Map<String, Object> result = new HashMap();
        result.put("rows", user_object);

        return new ResponseEntity(result, HttpStatus.OK);

    }

    @PostMapping(path="/profileupdate", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Users> updateUser(@RequestBody Users user) {

        String msg = userService.updateUser(user);
        return new ResponseEntity("", HttpStatus.OK);

    }
    @PostMapping(path="/checkemail", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Users> checkEmail(@RequestBody Users user) {

        String msg = userService.updateUser(user);
        return new ResponseEntity("", HttpStatus.OK);

    }



    @RequestMapping(value="/imageupdate", method=RequestMethod.POST )
    public @ResponseBody ResponseEntity<Users> singleSave(@RequestParam("file") MultipartFile file, @RequestParam("username") String id ){

        if (!file.isEmpty()) {
            try {

                String newFileName = (new Date()).getTime() + "" + file.getOriginalFilename();
                byte[] bytes = file.getBytes();

                BufferedOutputStream buffStream = new BufferedOutputStream(new FileOutputStream(new File("/users/pateljay134/Desktop/freelancer/src/images/" + "" + newFileName)));
                buffStream.write(bytes);

                buffStream.close();
                Users user = userService.setProfileImage(id, newFileName);

                Map<String, Object> result = new HashMap();
                result.put("fileType", newFileName);
                return new ResponseEntity(result, HttpStatus.OK);
            } catch (Exception e) {
                return null;
            }
        } else {
            return null;
        }
    }
}
