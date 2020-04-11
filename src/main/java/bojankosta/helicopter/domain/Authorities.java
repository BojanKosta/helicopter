package bojankosta.helicopter.domain;

import javax.persistence.*;

@Entity
@Table (name = "authorities")
public class Authorities {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private Long id;
    @Column (name = "username")
    private String username;
    @Column (name = "authority")
    private String authority;

    public Authorities(String username) {
        this.username = username;
        this.authority = "ROLE_USER";
    }

    public Authorities() {
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

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }
}
