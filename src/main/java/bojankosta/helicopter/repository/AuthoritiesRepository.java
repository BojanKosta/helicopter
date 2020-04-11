package bojankosta.helicopter.repository;

import bojankosta.helicopter.domain.Authorities;
import org.springframework.data.repository.CrudRepository;

public interface AuthoritiesRepository extends CrudRepository<Authorities, Long> {
    Authorities findByUsername(String username);
}
