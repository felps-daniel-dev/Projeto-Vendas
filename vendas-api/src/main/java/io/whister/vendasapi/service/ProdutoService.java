package io.whister.vendasapi.service;


import io.whister.vendasapi.dto.ProdutoRequestDTO;
import io.whister.vendasapi.dto.ProdutoResponseDTO;
import io.whister.vendasapi.entity.Produto;
import io.whister.vendasapi.mapper.ProdutoMapper;
import io.whister.vendasapi.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProdutoService {

    // ingeçao de dependencia
    @Autowired
    private ProdutoRepository repository;

    @Autowired
    private ProdutoMapper mapper;

    public ProdutoResponseDTO cadastrar(ProdutoRequestDTO produtoRequestDTO){

        //vai chamar o metodo e vai transformar em entidade pra salvear no banco
        Produto produto = mapper.toEntity(produtoRequestDTO);

        //salvei no banco
        produto = repository.save(produto);

        return mapper.toResponse(produto);
    }
}
