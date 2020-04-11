package bojankosta.helicopter.service;


import bojankosta.helicopter.domain.Authorities;
import bojankosta.helicopter.repository.AuthoritiesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthoritiesService {

    @Autowired
    private AuthoritiesRepository authoritiesRepository;

    public Authorities saveAuthorities (Authorities authorities){
        return authoritiesRepository.save(authorities);
    }

    public Authorities getAuthorities (String name){
        return authoritiesRepository.findByUsername(name);
    }
}
