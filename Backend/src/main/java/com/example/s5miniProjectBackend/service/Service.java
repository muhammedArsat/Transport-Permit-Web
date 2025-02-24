package com.example.s5miniProjectBackend.service;

import com.example.s5miniProjectBackend.entity.UserForm;

import java.util.List;

public interface Service {
    UserForm savedetails(UserForm userForm);
    

    


    List <UserForm>getAllUserDetails();







    UserForm editStatus(Integer id);

    List<UserForm> getPendingList();

    List<UserForm> getApprovedList();

    UserForm passedVehicle(Integer id);

    List<UserForm> getPassedList();

    List<UserForm> getPendingTakkalUser();

    UserForm takkalApproved(Integer id);

    long getApprovedCount();
    long countApprovedUserFormsByEmail(String email);

    long countPendingByEmail(String email);

    List<UserForm> getAppliedPermitsByEmail(String email);

    long findTotApplicationByEmail(String email);



    Long countFromPlace(String state);

    UserForm rejectApplication(Integer id);
}
