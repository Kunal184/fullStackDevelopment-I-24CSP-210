package com.jobportal.controller;

import com.jobportal.model.Company;
import com.jobportal.model.JobListing;
import com.jobportal.model.User;
import com.jobportal.repository.CompanyRepository;
import com.jobportal.repository.JobListingRepository;
import com.jobportal.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobListingRepository jobRepository;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    public JobController(JobListingRepository jobRepository, CompanyRepository companyRepository, UserRepository userRepository) {
        this.jobRepository = jobRepository;
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<JobListing> getAllJobs(@RequestParam(required = false) String search) {
        if (search != null && !search.isEmpty()) {
            return jobRepository.findByTitleContainingIgnoreCaseOrLocationContainingIgnoreCase(search, search);
        }
        return jobRepository.findAll();
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('EMPLOYER')")
    public List<JobListing> getMyJobs(Authentication auth) {
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        Company company = companyRepository.findByUser(user).orElseThrow();
        return jobRepository.findByCompany(company);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobListing> getJobById(@PathVariable Long id) {
        return jobRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<JobListing> createJob(@RequestBody JobListing job, Authentication auth) {
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        Company company = companyRepository.findByUser(user).orElseThrow();
        job.setCompany(company);
        return ResponseEntity.ok(jobRepository.save(job));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<JobListing> updateJob(@PathVariable Long id, @RequestBody JobListing jobDetails) {
        return jobRepository.findById(id).map(job -> {
            job.setTitle(jobDetails.getTitle());
            job.setDescription(jobDetails.getDescription());
            job.setLocation(jobDetails.getLocation());
            job.setJobType(jobDetails.getJobType());
            job.setSalaryRange(jobDetails.getSalaryRange());
            job.setDeadline(jobDetails.getDeadline());
            return ResponseEntity.ok(jobRepository.save(job));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<?> deleteJob(@PathVariable Long id) {
        jobRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
