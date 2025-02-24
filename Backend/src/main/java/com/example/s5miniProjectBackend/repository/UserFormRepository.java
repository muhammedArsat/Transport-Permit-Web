package com.example.s5miniProjectBackend.repository;

import com.example.s5miniProjectBackend.entity.UserForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserFormRepository extends JpaRepository<UserForm, Integer> {

    List<UserForm> findByStatus(String pending);
     List<UserForm>findByTypeAndStatus(String takal,String pending);

    long countByStatus(String status);

    @Query("SELECT COUNT(u) FROM UserForm u WHERE u.email = ?1 AND u.status = 'Approved'")
    long countApprovedByEmail(String email);

    @Query("SELECT COUNT(u) FROM UserForm u WHERE u.email = ?1 AND u.status = 'pending'")
    long countPendingByEmail(String email);

    @Query("SELECT u FROM UserForm u WHERE u.email = :email")
    List<UserForm> findAppliedPermitsByEmail(@Param("email") String email);

    @Query("SELECT COUNT(u) FROM UserForm u WHERE u.email = :email")
    long findTotApplicationByEmail(@Param("email") String email);


    Long countByFromPlace(String fromPlace);
}
