package com.example.s5miniProjectBackend.controller;

import com.example.s5miniProjectBackend.entity.UserForm;
import com.example.s5miniProjectBackend.service.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    public Service service;


    /*
    Takkal  Applications Pending Lists
     */


    @GetMapping("/takkal-list")
    public ResponseEntity<List<UserForm>> getTakkalPendingList()
    {
        List<UserForm> takalUsers  = service.getPendingTakkalUser();
        return ResponseEntity.ok(takalUsers);
    }


    /*
    Takal Lists Status Changing
     */
    @PutMapping("/takkal-list/{id}")
    ResponseEntity<UserForm> takkalStatusChange(@PathVariable Integer id)
    {
        UserForm takalUser = service.takkalApproved(id);
        return ResponseEntity.ok(takalUser);
    }





    /*
    Normal  Applications Pending Lists
     */

    @GetMapping("/pending-list")
    public ResponseEntity<List<UserForm>> getPendingList()
    {
        List<UserForm> pendingList = service.getPendingList();
        return  ResponseEntity.ok(pendingList);
    }



/*
Normal Applications Status Changing Code
 */
@PutMapping("/status-change/{id}")
public ResponseEntity<UserForm> editStatus(@PathVariable Integer id)
{
    UserForm userForm = service.editStatus(id);
    return  ResponseEntity.ok(userForm);
}

@PutMapping("/reject/{id}")
public ResponseEntity<UserForm> rejectApplication(@PathVariable Integer id)
{
    UserForm userForm = service.rejectApplication(id);
    return ResponseEntity.ok(userForm);
}




    /*
    Approved Lists For Both Normal  And Takkal Lists
     */

    @GetMapping("/approved-list")
    public  ResponseEntity<List<UserForm>> getApprovedList()
    {
        List<UserForm> approvedList = service.getApprovedList();
        return  ResponseEntity.ok(approvedList);
    }


    /*
    Passed Lists For Both Normal And Takkal Lists
     */

    @GetMapping("/passed-list")
    ResponseEntity<List<UserForm>> getPassedList()
    {
        List<UserForm> passedList = service.getPassedList();
        Collections.reverse(passedList);
        return  ResponseEntity.ok(passedList);
    }


}
