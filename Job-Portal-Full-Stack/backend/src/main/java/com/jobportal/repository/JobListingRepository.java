package com.jobportal.repository;

import com.jobportal.model.Company;
import com.jobportal.model.JobListing;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobListingRepository extends JpaRepository<JobListing, Long> {
    List<JobListing> findByCompany(Company company);
    List<JobListing> findByTitleContainingIgnoreCaseOrLocationContainingIgnoreCase(String title, String location);
}
