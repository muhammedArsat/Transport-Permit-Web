package com.example.s5miniProjectBackend.controller;

import com.example.s5miniProjectBackend.entity.UserForm;
import com.example.s5miniProjectBackend.service.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {


    @Autowired
    public Service service;


/*
*User Normal Form Registration
*
* */
    @PostMapping("/normal-application")
    public String add(@RequestBody UserForm userForm) {
        service.savedetails(userForm);
        return "User Details Added Successfully!!!";
    }





    /*
     *  *************************************************************************************************
     *  **************************************************************************************************
     *  **************************************************************************************************
     *  **************************************************************************************************
     *  **************************************************************************************************
     */




    /*
    User Takkal Form Registration
     */



    /*
    *  *************************************************************************************************
    *  **************************************************************************************************
    *  **************************************************************************************************
    *  **************************************************************************************************
    *  **************************************************************************************************
     */


    /*
    Dash Board Codings
     */



    /*
    Approved Applications Counts
     */

    @GetMapping("/approvedCount/{email}")
    public ResponseEntity<Long> getApprovedCount(@PathVariable String email) {
        long count = service.countApprovedUserFormsByEmail(email);
        return ResponseEntity.ok(count);
    }



    /*
    Pending Applications Counts
     */
    @GetMapping("/pendingCount/{email}")
    public ResponseEntity<Long> getPendingCount(@PathVariable String email) {
        long count = service.countPendingByEmail(email);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/tamil-nadu-count")
    public ResponseEntity<Long> getTamilNaduCount(){
        long count = service.countFromPlace("Tamil Nadu");
        return ResponseEntity.ok(count);
    }

    @GetMapping("/kerala-count")
    public  ResponseEntity<Long> getKerala(){
        long count = service.countFromPlace("Kerala");
        return  ResponseEntity.ok(count);
    }

    @GetMapping("/karnataka-count")
    public ResponseEntity<Long> getKarnataka(){
        long count = service.countFromPlace("Karnataka");
        return ResponseEntity.ok(count);
    }

    @GetMapping("/telungana-count")
    public ResponseEntity<Long> getTelangana(){
        long count = service.countFromPlace("Telangana");
        return ResponseEntity.ok(count);
    }

    @GetMapping("/Maharashtra-count")
    public  ResponseEntity<Long> getMaharashtra(){
        long count  = service.countFromPlace("Maharashtra");
        return  ResponseEntity.ok(count);
    }




    /*
    Total Applications Count Which Includes Normal And Takkal
     */
    @GetMapping("/totApplicationCount/{email}")
    public ResponseEntity<Long> getTotApplicationCount(@PathVariable String email) {
        long count = service.findTotApplicationByEmail(email);
        return ResponseEntity.ok(count);
    }






    /*
    Lists of All Applications Which Includes Normal and Takkal
     */
    @GetMapping("/applied-permits/{email}")
    public ResponseEntity<List<UserForm>> getAppliedPermits(@PathVariable String email) {
        List<UserForm> appliedPermits = service.getAppliedPermitsByEmail(email);
        return ResponseEntity.ok(appliedPermits);
    }




    @GetMapping("/approvedcount")
    public long getApprovedCount(){
        return service.getApprovedCount();
    }

}
