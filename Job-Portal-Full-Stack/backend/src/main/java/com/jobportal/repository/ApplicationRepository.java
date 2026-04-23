package com.jobportal.repository;

import com.jobportal.model.Application;
import com.jobportal.model.JobListing;
import com.jobportal.model.SeekerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findBySeeker(SeekerProfile seeker);
    List<Application> findByJob(JobListing job);
}
