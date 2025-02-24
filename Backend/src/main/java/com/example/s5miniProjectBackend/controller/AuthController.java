package com.example.s5miniProjectBackend.controller;


import com.example.s5miniProjectBackend.dto.ReqRes;
import com.example.s5miniProjectBackend.entity.OurUsers;
import com.example.s5miniProjectBackend.repository.OurUserRepo;
import com.example.s5miniProjectBackend.service.AuthService;
import com.example.s5miniProjectBackend.service.OurUserDetailsService;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
@Autowired
private PasswordEncoder passwordEncoder;
@Autowired
private OurUserRepo ourUserRepo;
    @Autowired
    private AuthService authService;

    @Autowired
    private AuthService userDetailsService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/signup")
    public ResponseEntity<ReqRes> signup(@RequestBody ReqRes signuprequest){
        return ResponseEntity.ok(authService.signUp(signuprequest));
    }

    @PostMapping("/signin")
    public ResponseEntity<ReqRes> signin(@RequestBody ReqRes signInRequest){
        return  ResponseEntity.ok(authService.signIn(signInRequest));
    }
@Transactional
    @PutMapping("/password/{email}")
    public ResponseEntity<ReqRes> updatePassword(
            @PathVariable String email,
            @RequestBody String newPassword) {

        return  ResponseEntity.ok(authService.updatedPassword(email,newPassword));



    }


    @PostMapping("/refresh")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes refreshToekenRequest){
        return  ResponseEntity.ok(authService.refreshToken(refreshToekenRequest));
    }
}
