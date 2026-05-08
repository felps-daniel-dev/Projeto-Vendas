package io.whister.vendasapi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "produto")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 10)
    private String sku;

    @Column(length = 100)
    private String nome;

    @Column(precision = 16, scale = 2)
    private BigDecimal preco;

    @Column(length = 255)
    private String descricao;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataCadastro;
}
