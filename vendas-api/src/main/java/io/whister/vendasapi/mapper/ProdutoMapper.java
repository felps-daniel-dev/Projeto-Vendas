package io.whister.vendasapi.mapper;

import io.whister.vendasapi.dto.ProdutoRequestDTO;
import io.whister.vendasapi.dto.ProdutoResponseDTO;
import io.whister.vendasapi.entity.Produto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProdutoMapper {

    // vai tranformar o request em entidade
    Produto toEntity(ProdutoRequestDTO produtoDTO);

    // vai transforrmar a entidade em response
    ProdutoResponseDTO toResponse(Produto produtoEntity);

    // vai transformar a lista de entidades para response
    List<ProdutoResponseDTO> toResponseList(List<Produto> prodEntidades);
}
