package bojankosta.helicopter.service;

import bojankosta.helicopter.domain.ScoreBoard;
import bojankosta.helicopter.repository.ScoreBoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;

@Service
public class ScoreBoardService {

    @Autowired
    private ScoreBoardRepository scoreBoardRepository;


    public ArrayList<ScoreBoard> getScoreBoard() {
        return (ArrayList<ScoreBoard>) scoreBoardRepository.findAll();
    }

    public ScoreBoard save (ScoreBoard scoreBoard) {
        ArrayList<ScoreBoard> scores = new ArrayList<>();
        scores  = (ArrayList<ScoreBoard>) scoreBoardRepository.findAll();

        if(scores.size() > 0) {

            for (int i = 0; i < scores.size(); i++) {

                if (scores.get(i).getScore() < scoreBoard.getScore()) {
                    scoreBoardRepository.save(scoreBoard);
                    break;
                }else if(i==4){
                    return null;
                }
            }

            ArrayList<ScoreBoard> newScores = new ArrayList<>();
            newScores = (ArrayList<ScoreBoard>) scoreBoardRepository.findAll();

            Collections.sort(newScores);

            ScoreBoard smallScore = newScores.get(newScores.size() - 1);

            scoreBoardRepository.deleteById(smallScore.getId());
        }else {

            scoreBoardRepository.save(scoreBoard);

            ScoreBoard scoreBoard1 = new ScoreBoard();
            scoreBoard1.setScore(0);
            scoreBoard1.setName("No score yet");

            ScoreBoard scoreBoard2 = new ScoreBoard();
            scoreBoard2.setScore(0);
            scoreBoard2.setName("No score yet");

            ScoreBoard scoreBoard3 = new ScoreBoard();
            scoreBoard3.setScore(0);
            scoreBoard3.setName("No score yet");

            ScoreBoard scoreBoard4 = new ScoreBoard();
            scoreBoard4.setScore(0);
            scoreBoard4.setName("No score yet");

            scoreBoardRepository.save(scoreBoard1);
            scoreBoardRepository.save(scoreBoard2);
            scoreBoardRepository.save(scoreBoard3);

            return scoreBoardRepository.save(scoreBoard4);

        }
        return scoreBoard;
    }



}
