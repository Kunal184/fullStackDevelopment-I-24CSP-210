package com.jobportal.repository;

import com.jobportal.model.SeekerProfile;
import com.jobportal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SeekerProfileRepository extends JpaRepository<SeekerProfile, Long> {
    Optional<SeekerProfile> findByUser(User user);
    Optional<SeekerProfile> findByUserId(Long userId);
}
