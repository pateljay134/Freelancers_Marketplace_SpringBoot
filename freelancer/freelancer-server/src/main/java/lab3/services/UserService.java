package lab3.services;

import lab3.entity.Users;
import lab3.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<Users> login(String username, String password) {
       System.out.println(username+ " " + password);
       return userRepository.findByUsernameAndPassword(username, password);
    }


    public void save(Users user) {
        userRepository.save(user);
    }

    public String updateUser(Users user) {


        user.setPhone_number(user.getPhone_number());
        user.setSkills(user.getSkills());
        user.setAbout_me(user.getAbout_me());

        userRepository.save(user);

        return "Profile Updated";

    }
    public Users findUser(){
        Users userdata = new Users();
        return  userdata;
    }

    public Users setProfileImage(String username, String newFileName){

        Users user = new Users();
        username = user.getUsername();
        user.setProfile_image(newFileName);
        userRepository.save(user);

        return  user;
    }


}
