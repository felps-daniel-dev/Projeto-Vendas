package io.whister.vendasapi.dto;

import java.math.BigDecimal;

public record ProdutoResponseDTO(
        Long id,
        String sku,
        String nome,
        BigDecimal preco,
        String descricao
) {
}
