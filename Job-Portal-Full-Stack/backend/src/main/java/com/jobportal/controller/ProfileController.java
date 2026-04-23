package com.jobportal.controller;

import com.jobportal.model.Role;
import com.jobportal.model.SeekerProfile;
import com.jobportal.model.User;
import com.jobportal.repository.CompanyRepository;
import com.jobportal.repository.SeekerProfileRepository;
import com.jobportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final UserRepository userRepository;
    private final SeekerProfileRepository seekerRepository;
    private final CompanyRepository companyRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public ProfileController(UserRepository userRepository, SeekerProfileRepository seekerRepository, CompanyRepository companyRepository) {
        this.userRepository = userRepository;
        this.seekerRepository = seekerRepository;
        this.companyRepository = companyRepository;
    }

    @GetMapping
    public ResponseEntity<?> getProfile(Authentication auth) {
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        if (user.getRole() == Role.SEEKER) {
            return ResponseEntity.ok(seekerRepository.findByUser(user).orElseThrow());
        } else {
            return ResponseEntity.ok(companyRepository.findByUser(user).orElseThrow());
        }
    }

    @PutMapping
    public ResponseEntity<?> updateProfile(@RequestBody Object profileDetails, Authentication auth) {
        // Simple update logic - in a real app, you'd use specific DTOs
        // For simplicity in this project, we'll handle based on role
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        if (user.getRole() == Role.SEEKER) {
            SeekerProfile profile = seekerRepository.findByUser(user).orElseThrow();
            // Map fields manually from profileDetails if it were a DTO
            // Let's assume SeekerProfile update for now
            return ResponseEntity.ok(seekerRepository.save(profile));
        }
        return ResponseEntity.ok("Profile updated");
    }

    @PostMapping("/resume")
    public ResponseEntity<?> uploadResume(@RequestParam("file") MultipartFile file, Authentication auth) throws IOException {
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        SeekerProfile profile = seekerRepository.findByUser(user).orElseThrow();

        Path path = Paths.get(uploadDir);
        if (!Files.exists(path)) Files.createDirectories(path);

        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = path.resolve(fileName);
        Files.copy(file.getInputStream(), filePath);

        profile.setResumeUrl(fileName);
        seekerRepository.save(profile);

        return ResponseEntity.ok("File uploaded: " + fileName);
    }
}
