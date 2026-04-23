package com.jobportal.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "seeker_id", nullable = false)
    private SeekerProfile seeker;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private JobListing job;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status = ApplicationStatus.PENDING;

    private LocalDateTime appliedAt = LocalDateTime.now();

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public SeekerProfile getSeeker() { return seeker; }
    public void setSeeker(SeekerProfile seeker) { this.seeker = seeker; }
    public JobListing getJob() { return job; }
    public void setJob(JobListing job) { this.job = job; }
    public ApplicationStatus getStatus() { return status; }
    public void setStatus(ApplicationStatus status) { this.status = status; }
    public LocalDateTime getAppliedAt() { return appliedAt; }
    public void setAppliedAt(LocalDateTime appliedAt) { this.appliedAt = appliedAt; }
}
