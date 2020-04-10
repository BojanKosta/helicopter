package bojankosta.helicopter.controller;

import bojankosta.helicopter.domain.Player;
import bojankosta.helicopter.domain.Score;
import bojankosta.helicopter.domain.ScoreBoard;
import bojankosta.helicopter.service.PlayerService;
import bojankosta.helicopter.service.ScoreBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;

@RestController
@CrossOrigin
@RequestMapping
public class UserController {

    @Autowired
    private PlayerService playerService;

    @Autowired
    private ScoreBoardService scoreBoardService;

    @PostMapping ("/player")
    public Player savePlayer (@RequestBody Player player) {

        System.out.println(player.getUsername());
        playerService.savePlayer(player);
        return player;
    }

    @PostMapping("/playing")
    public Player userName (@RequestBody Score score, Principal user) {

        Player player = playerService.getPlayer(user.getName());
        if(player.getBestScore() < score.getScore()){
            player.setBestScore(score.getScore());
        }
        return playerService.savePlayer(player);

    }

    @PostMapping ("/score")
    public ScoreBoard saveScore(@RequestBody Score score, Principal user) {
        ScoreBoard scoreBoard = new ScoreBoard();
        scoreBoard.setScore(score.getScore());
        scoreBoard.setName(user.getName());

        return scoreBoardService.save(scoreBoard);

    }

    @GetMapping("/getscore")
    public ArrayList<ScoreBoard> getScoreBoard () {
        return scoreBoardService.getScoreBoard();
    }
}
