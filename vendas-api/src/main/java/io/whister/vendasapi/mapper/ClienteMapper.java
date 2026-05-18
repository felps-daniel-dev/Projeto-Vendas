package io.whister.vendasapi.mapper;

import io.whister.vendasapi.dto.ClienteRequestDTO;
import io.whister.vendasapi.dto.ClienteResponseDTO;
import io.whister.vendasapi.entity.Cliente;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface ClienteMapper {

    Cliente toEntity(ClienteRequestDTO clienteRequest);

    ClienteResponseDTO toResponse(Cliente clienteEntidade);

    List<ClienteResponseDTO> toResponseList(List<Cliente> clientesEntidades);
}
