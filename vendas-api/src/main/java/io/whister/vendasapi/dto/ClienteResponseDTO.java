package io.whister.vendasapi.dto;


import java.time.LocalDateTime;

public record ClienteResponseDTO(
        Long id,
        String nome,
        String cpf,
        String telefone,
        String email,
        LocalDateTime nascimento,
        LocalDateTime dataCadastro

) {
}
