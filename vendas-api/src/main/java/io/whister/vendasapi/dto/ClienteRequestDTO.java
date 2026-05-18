package io.whister.vendasapi.dto;


import java.time.LocalDateTime;


public record ClienteRequestDTO(
        String nome,
        String cpf,
        String telefone,
        String email,
        LocalDateTime nascimento

) {
}
