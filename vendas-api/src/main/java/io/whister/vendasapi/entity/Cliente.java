package io.whister.vendasapi.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(unique = true, length = 14, nullable = false)
    private String cpf;

    private LocalDateTime nascimento;

    private String endereco;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(unique = true, length = 14, nullable = false)
    private String telefone;

    @Column(name = "data_cadastro")
    private LocalDateTime dataCadastro;
}
