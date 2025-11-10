package com.example.DBMS.controllerLayer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.DBMS.Users;
import com.example.DBMS.ServiceLayer.UserService;
import com.example.DBMS.dto.AuthDTO;

@RestController
class LoginController{
    @Autowired
    private UserService service;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public AuthDTO Login(@RequestBody Users users)throws Exception{
        return service.userLogin(users);
    }
    
    @PostMapping("/register")
    public void Register(@RequestBody Users user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        service.registerUser(user);
    }
}