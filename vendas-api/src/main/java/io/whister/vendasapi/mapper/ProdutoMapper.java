package io.whister.vendasapi.mapper;

import io.whister.vendasapi.dto.ProdutoRequestDTO;
import io.whister.vendasapi.dto.ProdutoResponseDTO;
import io.whister.vendasapi.entity.Produto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProdutoMapper {

    // vai tranformar o request em entidade
    Produto toEntity(ProdutoRequestDTO produtoDTO);

    // vai transforrmar a entidade em response
    ProdutoResponseDTO toResponse(Produto produtoEntity);
}
