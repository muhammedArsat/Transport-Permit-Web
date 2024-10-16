package com.example.s5miniProjectBackend.service;

import com.example.s5miniProjectBackend.entity.TakalUser;
import com.example.s5miniProjectBackend.entity.UserForm;
import com.example.s5miniProjectBackend.entity.UserRegister;
import com.example.s5miniProjectBackend.repository.ApprovedListRepository;
import com.example.s5miniProjectBackend.repository.TakalUserRepository;
import com.example.s5miniProjectBackend.repository.UserFormRepository;
import com.example.s5miniProjectBackend.repository.UserRegisterRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class ServiceImpl implements Service{

	@Autowired
    public UserFormRepository userFormRepository;

    @Autowired
    public UserRegisterRepository userRegisterRepository;
    @Autowired
    public ApprovedListRepository approvedListRepository;
    
    @Autowired
    public TakalUserRepository takaluserRepository;

    @Override
    public UserForm savedetails(UserForm userForm) {
        return userFormRepository.save(userForm);
    }
    
    @Override
	public TakalUser savetakaldetails(TakalUser detail) {
		return takaluserRepository.save(detail);
	}
    
    public UserRegister registerUser(UserRegister userRegister) {
        return userRegisterRepository.save(userRegister);
    }

    @Override
    public List<UserForm> getAllUserDetails() {
        return userFormRepository.findAll();
    }

    // New method to check if a user is already registered
    @Override
    public boolean checkIfUserExists(String email) {
        // Check if a user with the given email exists in the UserRegister repository
        return userRegisterRepository.findByEmail(email) != null;
    }

    @Override
    public UserForm addApprovedList(UserForm userForm) {
        return approvedListRepository.save(userForm);
    }




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
        return userFormRepository.findByStatus("pending");
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
    public List<TakalUser> getPendingTakkalUser() {
        return takaluserRepository.findByStatus("Pending");
    }

    @Override
    public TakalUser takkalApproved(Integer id) {
        Optional<TakalUser> existingTakal = takaluserRepository.findById(id);
        if(existingTakal.isPresent())
        {
            TakalUser takalUser = existingTakal.get();
            takalUser.setStatus("Approved");
            takaluserRepository.save(takalUser);
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




}
