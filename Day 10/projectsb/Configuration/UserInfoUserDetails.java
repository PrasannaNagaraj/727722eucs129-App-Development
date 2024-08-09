package com.example.projectsb.Configuration;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.projectsb.model.UserDetail;

import java.util.Collection;
import java.util.Collections;

public class UserInfoUserDetails implements UserDetails {

    private final UserDetail userDetail;

    public UserInfoUserDetails(UserDetail userDetail) {
        this.userDetail = userDetail;
    }

    @Override
public Collection<? extends GrantedAuthority> getAuthorities() {
    // Convert the Role enum to a String
    return Collections.singleton(new SimpleGrantedAuthority(userDetail.getRoles().name()));
}


    @Override
    public String getPassword() {
        return userDetail.getPassword();
    }

    @Override
    public String getUsername() {
        return userDetail.getName();  // Assuming username is stored in UserDetail entity
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
