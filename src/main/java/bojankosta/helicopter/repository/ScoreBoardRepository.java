package bojankosta.helicopter.repository;

import bojankosta.helicopter.domain.ScoreBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScoreBoardRepository extends JpaRepository<ScoreBoard, Long> {

    ScoreBoard findByName(String name);
}
