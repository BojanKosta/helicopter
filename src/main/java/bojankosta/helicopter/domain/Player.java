package bojankosta.helicopter.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table (name = "users")
public class Player {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(updatable = false, unique = true)
    private String username;
    @NotBlank
    private String password;
    private int bestScore;
    private int enabled = 1;

    public Player() {
    }

    public int getEnabled() {
        return enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getBestScore() {
        return bestScore;
    }

    public void setBestScore(int bestScore) {
        this.bestScore = bestScore;
    }
}
