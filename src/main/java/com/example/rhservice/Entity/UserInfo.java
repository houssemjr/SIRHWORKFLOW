    package com.example.rhservice.Entity;

    import com.fasterxml.jackson.annotation.JsonBackReference;
    import com.fasterxml.jackson.annotation.JsonIgnore;
    import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
    import com.fasterxml.jackson.annotation.JsonManagedReference;
    import com.sun.istack.NotNull;
    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.RequiredArgsConstructor;
    import lombok.Setter;
    import org.springframework.format.annotation.DateTimeFormat;

    import java.io.Serializable;
    import java.util.ArrayList;
    import java.util.Date;
    import java.util.List;


    @Entity
    @Getter
    @Setter
    public class UserInfo implements Serializable {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @NotNull
        private String username;

        private String nom;

        private String prenom;

        private String cin;

        private String telephone;

        private String adresse;

        private String sitf; // Assuming this is a string representation of the family situation

        private String email;

        private String genre;

        private String poste;

        private String equipe;

        private String manager;

        private String matricule;

        @DateTimeFormat
        private Date dateRecrutement;

        private String diplome;

        private String seniorite;

        private Integer anciennete;

        private String photodeProfil;




        @ManyToMany
        @JoinTable(
                name = "user_equipe",
                joinColumns = @JoinColumn(name = "user_id"),
                inverseJoinColumns = @JoinColumn(name = "equipe_id")
        )
        @JsonIgnoreProperties("members")
        List<Equipe> equipes =new ArrayList<>();

        @OneToOne
       private Role role;






    }