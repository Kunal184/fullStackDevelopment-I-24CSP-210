package com.jobportal.config;

import com.jobportal.model.*;
import com.jobportal.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final JobListingRepository jobListingRepository;
    private final SeekerProfileRepository seekerProfileRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, 
                           CompanyRepository companyRepository, 
                           JobListingRepository jobListingRepository,
                           SeekerProfileRepository seekerProfileRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.jobListingRepository = jobListingRepository;
        this.seekerProfileRepository = seekerProfileRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (jobListingRepository.count() == 0) {
            // Find or create an Employer
            User employer = userRepository.findByEmail("employer@google.com").orElseGet(() -> {
                User u = new User();
                u.setName("Google Employer");
                u.setEmail("employer@google.com");
                u.setPassword(passwordEncoder.encode("password"));
                u.setRole(Role.EMPLOYER);
                return userRepository.save(u);
            });

            // Create Company for Employer
            Company company = companyRepository.findByUser(employer).orElseGet(() -> {
                Company c = new Company();
                c.setUser(employer);
                c.setName("Google India");
                c.setDescription("A global technology leader with a strong presence in India.");
                c.setLocation("Bangalore, India");
                c.setWebsite("https://google.com");
                return companyRepository.save(c);
            });

            // Add Job Listings
            addJob(company, "Software Engineer", "Develop next-gen technologies.", "Bangalore, India", "FULL_TIME", "₹18L - ₹25L", "2026-12-31");
            addJob(company, "Product Manager", "Lead product strategies.", "Mumbai, India", "FULL_TIME", "₹15L - ₹22L", "2026-11-30");
            addJob(company, "UX Designer", "Design beautiful user experiences.", "Pune, India", "PART_TIME", "₹8L - ₹12L", "2026-10-15");
            addJob(company, "Data Scientist", "Analyze complex data sets.", "Remote", "INTERNSHIP", "₹50k/mo", "2026-09-01");
            
            System.out.println("Default job listings initialized successfully!");
        }

        if (userRepository.findByEmail("seeker@example.com").isEmpty()) {
            User seeker = new User();
            seeker.setName("John Doe");
            seeker.setEmail("seeker@example.com");
            seeker.setPassword(passwordEncoder.encode("password"));
            seeker.setRole(Role.SEEKER);
            userRepository.save(seeker);

            SeekerProfile profile = new SeekerProfile();
            profile.setUser(seeker);
            seekerProfileRepository.save(profile);
            System.out.println("Default seeker user initialized!");
        }
    }

    private void addJob(Company company, String title, String description, String location, String type, String salary, String deadline) {
        JobListing job = new JobListing();
        job.setCompany(company);
        job.setTitle(title);
        job.setDescription(description);
        job.setLocation(location);
        job.setJobType(type);
        job.setSalaryRange(salary);
        job.setDeadline(deadline);
        jobListingRepository.save(job);
    }
}
