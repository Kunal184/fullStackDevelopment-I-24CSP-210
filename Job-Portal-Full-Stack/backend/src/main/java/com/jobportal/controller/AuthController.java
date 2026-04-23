package com.jobportal.controller;

import com.jobportal.config.JwtUtils;
import com.jobportal.dto.AuthResponse;
import com.jobportal.dto.LoginRequest;
import com.jobportal.dto.RegisterRequest;
import com.jobportal.model.Company;
import com.jobportal.model.Role;
import com.jobportal.model.SeekerProfile;
import com.jobportal.model.User;
import com.jobportal.repository.CompanyRepository;
import com.jobportal.repository.SeekerProfileRepository;
import com.jobportal.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final SeekerProfileRepository seekerRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    public AuthController(UserRepository userRepository, SeekerProfileRepository seekerRepository,
                          CompanyRepository companyRepository, PasswordEncoder passwordEncoder,
                          JwtUtils jwtUtils, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.seekerRepository = seekerRepository;
        this.companyRepository = companyRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        userRepository.save(user);

        if (user.getRole() == Role.SEEKER) {
            SeekerProfile profile = new SeekerProfile();
            profile.setUser(user);
            seekerRepository.save(profile);
        } else {
            Company company = new Company();
            company.setUser(user);
            companyRepository.save(company);
        }

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        String token = jwtUtils.generateToken(user.getEmail());

        return ResponseEntity.ok(new AuthResponse(token, user.getEmail(), user.getName(), user.getRole()));
    }
}
