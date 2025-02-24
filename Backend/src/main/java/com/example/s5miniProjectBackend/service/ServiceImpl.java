package com.example.s5miniProjectBackend.service;

import com.example.s5miniProjectBackend.entity.UserForm;
import com.example.s5miniProjectBackend.repository.UserFormRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class ServiceImpl implements Service{

	@Autowired
    public UserFormRepository userFormRepository;


    
//    @Autowired
//    public TakalUserRepository takaluserRepository;

    @Override
    public UserForm savedetails(UserForm userForm) {
        return userFormRepository.save(userForm);
    }
    

    


    @Override
    public List<UserForm> getAllUserDetails() {
        return userFormRepository.findAll();
    }

    // New method to check if a user is already registered






    @Override
    public UserForm editStatus(Integer id) {
        Optional<UserForm> existedData = userFormRepository.findById(id);
        if(existedData.isPresent())
        {
            UserForm userForm = existedData.get();
            userForm.setStatus("Approved");
            userFormRepository.save(userForm);
        }
        return null;
    }

    @Override
    public List<UserForm> getPendingList() {

        return userFormRepository.findByTypeAndStatus("Normal","pending");
    }

    @Override
    public List<UserForm> getApprovedList() {
        return userFormRepository.findByStatus("Approved");

    }

    @Override
    public UserForm passedVehicle(Integer id) {
        Optional<UserForm> data = userFormRepository.findById(id);
        if(data.isPresent())
        {
            UserForm userForm = data.get();
            userForm.setStatus("Passed");
            userFormRepository.save(userForm);
        }
        return null;
    }

    @Override
    public List<UserForm> getPassedList() {
        return userFormRepository.findByStatus("Passed");
    }

    @Override
    public List<UserForm> getPendingTakkalUser() {
        return   userFormRepository.findByTypeAndStatus("Takal","pending");

    }

    @Override
    public UserForm takkalApproved(Integer id) {
        Optional<UserForm> existingTakal = userFormRepository.findById(id);
        if(existingTakal.isPresent())
        {
            UserForm takalUser = existingTakal.get();
            takalUser.setStatus("Approved");
            userFormRepository.save(takalUser);
        }

            return null;

    }

    @Override
    public long getApprovedCount() {
        return userFormRepository.countByStatus("Approved");
    }

    @Override
    public long countApprovedUserFormsByEmail(String email) {
        return userFormRepository.countApprovedByEmail(email);
    }

    @Override
    public long countPendingByEmail(String email) {
        return userFormRepository.countPendingByEmail(email);
    }

    @Override
    public List<UserForm> getAppliedPermitsByEmail(String email) {
        return userFormRepository.findAppliedPermitsByEmail(email);
    }

    @Override
    public long findTotApplicationByEmail(String email) {
        return userFormRepository.findTotApplicationByEmail(email);
    }

    public Long countFromPlace(String fromPlace) {
        return userFormRepository.countByFromPlace(fromPlace);
    }

    @Override
    public UserForm rejectApplication(Integer id) {
        Optional<UserForm> user = userFormRepository.findById(id);
        if(user.isPresent()){
            UserForm existingUser = user.get();
            existingUser.setStatus("Rejected");
            userFormRepository.save(existingUser);
        }
        return null;
    }

}
