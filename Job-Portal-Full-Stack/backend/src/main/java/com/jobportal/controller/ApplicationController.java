package com.jobportal.controller;

import com.jobportal.model.*;
import com.jobportal.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationRepository applicationRepository;
    private final SeekerProfileRepository seekerRepository;
    private final JobListingRepository jobRepository;
    private final UserRepository userRepository;

    public ApplicationController(ApplicationRepository applicationRepository, SeekerProfileRepository seekerRepository,
                                JobListingRepository jobRepository, UserRepository userRepository) {
        this.applicationRepository = applicationRepository;
        this.seekerRepository = seekerRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    @PreAuthorize("hasRole('SEEKER')")
    public ResponseEntity<?> apply(@RequestParam Long jobId, Authentication auth) {
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        SeekerProfile seeker = seekerRepository.findByUser(user).orElseThrow();
        JobListing job = jobRepository.findById(jobId).orElseThrow();

        Application application = new Application();
        application.setSeeker(seeker);
        application.setJob(job);
        application.setStatus(ApplicationStatus.PENDING);

        return ResponseEntity.ok(applicationRepository.save(application));
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('SEEKER')")
    public List<Application> getMyApplications(Authentication auth) {
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        SeekerProfile seeker = seekerRepository.findByUser(user).orElseThrow();
        return applicationRepository.findBySeeker(seeker);
    }

    @GetMapping("/job/{jobId}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public List<Application> getApplicantsForJob(@PathVariable Long jobId) {
        JobListing job = jobRepository.findById(jobId).orElseThrow();
        return applicationRepository.findByJob(job);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam ApplicationStatus status) {
        Application application = applicationRepository.findById(id).orElseThrow();
        application.setStatus(status);
        return ResponseEntity.ok(applicationRepository.save(application));
    }
}
