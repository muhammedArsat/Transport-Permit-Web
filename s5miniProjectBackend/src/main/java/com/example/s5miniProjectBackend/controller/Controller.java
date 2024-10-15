package com.example.s5miniProjectBackend.controller;

import com.example.s5miniProjectBackend.entity.TakalUser;
import com.example.s5miniProjectBackend.dto.UserLoginRequest;
import com.example.s5miniProjectBackend.dto.UserLoginResponse;
import com.example.s5miniProjectBackend.entity.UserRegister;
import com.example.s5miniProjectBackend.repository.TakalUserRepository;
import com.example.s5miniProjectBackend.repository.UserRegisterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.s5miniProjectBackend.entity.UserForm;
import com.example.s5miniProjectBackend.service.Service;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/transportpermit")
@CrossOrigin
public class Controller {

    @Autowired
    public Service service;

    @Autowired
    public UserRegisterRepository userRegisterRepository;
    @Autowired
 public TakalUserRepository takalUserRepository;

/*
User login code
 */

    @PostMapping("/user-login")
    public UserLoginResponse login(@RequestBody UserLoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        // Query the register table
        UserRegister user = userRegisterRepository.findByEmail(email);
        if (user != null) {

            if (user.getEmail().equalsIgnoreCase(email) && user.getPassword().equalsIgnoreCase(password)) {
                // Login successful
                return new UserLoginResponse(true, "Login successful");
            }
            else if(user.getEmail().equalsIgnoreCase(email) && !user.getPassword().equalsIgnoreCase(password)) {
                    return new UserLoginResponse(false,"Incorrect password");
            }
            else {

                return new UserLoginResponse(false, "Incorrect email and password");
            }
        } else {
            // if not registered
            return new UserLoginResponse(false, "User not registered");
        }
    }

    /*
    USER REGISTER CODE
     */
    @PostMapping("/user-register")
    public ResponseEntity<String> register(@RequestBody UserRegister register) {
        // Check if the user already exists in the database by email or another unique field
        boolean userExists = service.checkIfUserExists(register.getEmail());

        if (userExists) {
            // If the user is already registered, return an appropriate message
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already registered");
        }

        // If user is not registered, proceed with registration
        service.registerUser(register);
        return ResponseEntity.status(HttpStatus.OK).body("Registration successful");
    }
/*
ADD USER FORM CODE
 */
    @PostMapping("/add-user-form")
    public String add(@RequestBody UserForm userForm) {
        service.savedetails(userForm);
        return "User Details Added Successfully!!!";
    }

    /*
    GET USER FORM CODE
     */
    @GetMapping("/get-all-userdetails")
    public List<UserForm> getAllDetails()
    {

        return service.getAllUserDetails();
    }
    



    /*

     */
    @PostMapping("/add-to-approval-list")
    public String addApprovedList(@RequestBody UserForm userForm)
    {
        service.addApprovedList(userForm);
        return "SuccessFull";
    }


    /*
    Admin Approve For Normal Form
     */
    @PutMapping("/status-change/{id}")
    public ResponseEntity<UserForm> editStatus(@PathVariable Integer id)
    {
        UserForm userForm = service.editStatus(id);
        return  ResponseEntity.ok(userForm);
    }

    /*
    Pending List Want to Check By Verifier in CheckPost
     */
    @GetMapping("/pending-list")
    public ResponseEntity<List<UserForm>> getPendingList()
    {
        List<UserForm> pendingList = service.getPendingList();
        return  ResponseEntity.ok(pendingList);
    }

    @GetMapping("/approved-list")
    public  ResponseEntity<List<UserForm>> getApprovedList()
    {
        List<UserForm> approvedList = service.getApprovedList();
        return  ResponseEntity.ok(approvedList);
    }
    /*
    Verifier Verified the Car
     */
    @PutMapping("/passed-status/{id}")
    public ResponseEntity<UserForm> passedVehicle(@PathVariable Integer id)
    {
        UserForm userForm = service.passedVehicle(id);
        return  ResponseEntity.ok(userForm);
    }
/*
Showing Passed vehicle in Admin's Passed Page
 */
    @GetMapping("/passed-list")
    ResponseEntity<List<UserForm>> getPassedList()
    {
        List<UserForm> passedList = service.getPassedList();
        Collections.reverse(passedList);
        return  ResponseEntity.ok(passedList);
    }



/*
Takkal API's
 */

    /*
    To Add Details for Takkal Applicants
     */
    @PostMapping("/takaladd")
    public String takaladd(@RequestBody TakalUser detail) {
        service.savetakaldetails(detail);
        return "User Details Added Successfully!!!";
    }

    /*
    Get the Takkal List
     */
    @GetMapping("/takkal-list")
    public ResponseEntity<List<TakalUser>> getTakkalPendingList()
    {
        List<TakalUser> takalUsers = service.getPendingTakkalUser();
        return ResponseEntity.ok(takalUsers);
    }

    /*
    Change the Takkal Approval Form to Approved
     */
   @PutMapping("/takkal-list/{id}")
    ResponseEntity<TakalUser> takkalStatusChange(@PathVariable Integer id)
   {
       TakalUser takalUser = service.takkalApproved(id);
       return ResponseEntity.ok(takalUser);
   }
   @GetMapping("/approvedcount")
   public long getApprovedCount(){
       return service.getApprovedCount();
   }
    @GetMapping("/approvedCount/{email}")
    public ResponseEntity<Long> getApprovedCount(@PathVariable String email) {
        long count = service.countApprovedUserFormsByEmail(email);
        return ResponseEntity.ok(count);
    }
    @GetMapping("/applied-permits")
    public ResponseEntity<List<UserForm>> getAppliedPermits(@RequestParam String email) {
        List<UserForm> appliedPermits = service.getAppliedPermitsByEmail(email);
        return ResponseEntity.ok(appliedPermits);
    }
}
