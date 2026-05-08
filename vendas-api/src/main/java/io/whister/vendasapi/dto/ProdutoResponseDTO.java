package io.whister.vendasapi.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ProdutoResponseDTO(
        Long id,
        String sku,
        String nome,
        BigDecimal preco,
        String descricao,
        LocalDate dataCadastro
) {
}
