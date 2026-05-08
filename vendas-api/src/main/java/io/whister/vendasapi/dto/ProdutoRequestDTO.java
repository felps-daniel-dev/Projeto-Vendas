package io.whister.vendasapi.dto;

import com.sun.istack.NotNull;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.math.BigDecimal;


public record ProdutoRequestDTO(

        @NotBlank(message = "O nome é obrigatório")
        @Size(min = 5, max = 20, message = "O SKU deve ter entre 5 e 20 caracteres")
        String sku,

        @NotBlank(message = "O nome é obrigatório")
        String nome,

        @NotNull
        @Positive(message = "O preço deve ser maior que zero")
        BigDecimal preco,

        @NotBlank(message = "A descrição é obrigatória")
        String descricao
) {
}
