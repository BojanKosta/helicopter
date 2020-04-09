package bojankosta.helicopter.domain;

import javax.persistence.*;

@Entity
@Table (name = "scores")
public class ScoreBoard implements Comparable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int score;

    private String name;

    public ScoreBoard() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public int compareTo(Object comparestu) {
        int compareage=((ScoreBoard)comparestu).getScore();

        return compareage-this.score;
    }
}
