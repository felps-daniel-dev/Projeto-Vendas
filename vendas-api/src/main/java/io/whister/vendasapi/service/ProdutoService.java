package io.whister.vendasapi.service;


import io.whister.vendasapi.dto.ProdutoRequestDTO;
import io.whister.vendasapi.dto.ProdutoResponseDTO;
import io.whister.vendasapi.entity.Produto;
import io.whister.vendasapi.mapper.ProdutoMapper;
import io.whister.vendasapi.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.Optional;

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
        produto.setDataCadastro(LocalDate.now());

        //salvei no banco
        produto = repository.save(produto);

        return mapper.toResponse(produto);
    }

    public ProdutoResponseDTO atualizar(Long id, ProdutoRequestDTO produtoRequestDTO) {
        if (!repository.existsById(id)) { // se não tiver nenhum registro com esse id
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado");
        }
        Produto produtoParaSalvar = mapper.toEntity(produtoRequestDTO);
        produtoParaSalvar.setId(id);// sempre chamar o set id pra que o spring entenda que é atualizar e não cadastrar
        Produto produtoAtualizado = repository.save(produtoParaSalvar);

        return mapper.toResponse(produtoAtualizado);
    }


}
