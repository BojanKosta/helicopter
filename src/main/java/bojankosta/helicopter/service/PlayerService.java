package bojankosta.helicopter.service;

import bojankosta.helicopter.domain.Authorities;
import bojankosta.helicopter.domain.Player;
import bojankosta.helicopter.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    AuthoritiesService authoritiesService;

    @Autowired
    private BCryptPasswordEncoder cryptPasswordEncoder;

    public Player savePlayer (Player player) {

        Authorities exist = authoritiesService.getAuthorities(player.getUsername());
        if(exist ==null) {
            System.out.println(exist);
            Authorities authority = new Authorities(player.getUsername());
            authoritiesService.saveAuthorities(authority);
            player.setPassword(cryptPasswordEncoder.encode(player.getPassword()));
            return playerRepository.save(player);
        }
        return playerRepository.save(player);
    }

    public Player getPlayer (String name) {
        return playerRepository.findByUsername(name);
    }
}
