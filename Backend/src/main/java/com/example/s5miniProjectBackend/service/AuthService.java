package com.example.s5miniProjectBackend.service;


import com.example.s5miniProjectBackend.dto.ReqRes;
import com.example.s5miniProjectBackend.entity.OurUsers;
import com.example.s5miniProjectBackend.repository.OurUserRepo;
import com.example.s5miniProjectBackend.service.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private OurUserRepo ourUserRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;
    public ReqRes signUp(ReqRes registrationRequest) {
        ReqRes response = new ReqRes();

        try {
            // Check if a user with the provided email already exists
            Optional<OurUsers> existingUser = ourUserRepo.findByEmail(registrationRequest.getEmail());
            if (existingUser.isPresent()) {
                response.setStatusCode(400); // Bad Request
                response.setMessage("User already registered");
                return response;
            }

            // Proceed with registration if the user does not exist
            OurUsers ourUsers = new OurUsers();
            ourUsers.setEmail(registrationRequest.getEmail());
            ourUsers.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            ourUsers.setRole(registrationRequest.getRole());
            ourUsers.setPhone(registrationRequest.getPhone());

            OurUsers ourUserResult = ourUserRepo.save(ourUsers);
            if (ourUserResult != null) {
                response.setStatusCode(200);
                response.setMessage("Successfully added");
            }

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("An error occurred during registration");
        }

        return response;
    }



    public ReqRes signIn(ReqRes signInRequest) {
        ReqRes response = new ReqRes();

        try {
            // Retrieve user from the repository
            OurUsers user = ourUserRepo.findByEmail(signInRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Check if password matches
            if (!passwordEncoder.matches(signInRequest.getPassword(), user.getPassword())) {
                response.setStatusCode(401);
                response.setMessage("Invalid credentials: password does not match");
                return response;
            }

            // Attempt to authenticate
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword())
            );

            // Generate JWT and refresh tokens
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);

            // Populate response
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24hr");
            response.setRole(user.getRole());
            response.setEmail(user.getEmail());
            response.setMessage("Successfully Signed In");

        } catch (Exception e) {
            response.setStatusCode(401);
            response.setError("Authentication failed: " + e.getMessage());
            e.printStackTrace(); // Log for debugging
        }

        return response;
    }

    public ReqRes refreshToken(ReqRes refreshTokenRequest)
    {
        ReqRes response = new ReqRes();
        String ourEmail = jwtUtils.extractUsername(refreshTokenRequest.getRefreshToken());
        OurUsers users = ourUserRepo.findByEmail(ourEmail).orElseThrow();
        if(jwtUtils.isTokenValid(refreshTokenRequest.getToken(),users)){
            var jwt = jwtUtils.generateToken(users);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshTokenRequest.getToken());
            response.setExpirationTime("24hr");
            response.setMessage("Successfully  Refreshed");

        }
        response.setStatusCode(500);
        return response;
    }

    public ReqRes updatedPassword(String email, String newPassword) {
        ReqRes reqRes = new ReqRes();

        try {
            Optional<OurUsers> existingUser = ourUserRepo.findByEmail(email);

            if (existingUser.isPresent()) {
                OurUsers user = existingUser.get();
                user.setPassword(passwordEncoder.encode(newPassword));
                // You can update other fields if necessary
                ourUserRepo.save(user);
                reqRes.setMessage("Password updated successfully");
                reqRes.setStatusCode(200);
            } else {
                reqRes.setMessage("User not found");
                reqRes.setStatusCode(404);
            }
        } catch (Exception e) {
            reqRes.setMessage("Error: " + e.getMessage());
            reqRes.setStatusCode(500);
        }

        return reqRes;
    }

}
