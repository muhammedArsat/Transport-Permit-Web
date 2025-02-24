package com.example.s5miniProjectBackend.controller;

import com.example.s5miniProjectBackend.entity.UserForm;
import com.example.s5miniProjectBackend.service.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/verifier")
public class VerifierController {

    @Autowired
    public Service service;


    /*
    Pending List Want to Check By Verifier in CheckPost
     */


    @GetMapping("/approved-list")
    public ResponseEntity<List<UserForm>> getApprovedList()
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
}
