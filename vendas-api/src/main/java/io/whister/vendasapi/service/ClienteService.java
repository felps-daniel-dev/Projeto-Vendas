package io.whister.vendasapi.service;

import io.whister.vendasapi.dto.ClienteRequestDTO;
import io.whister.vendasapi.dto.ClienteResponseDTO;
import io.whister.vendasapi.entity.Cliente;
import io.whister.vendasapi.mapper.ClienteMapper;
import io.whister.vendasapi.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ClienteService {

    @Autowired
    ClienteMapper mapper;

    @Autowired
    ClienteRepository repository;

    public ClienteResponseDTO cadastrarCliente(ClienteRequestDTO clienteRequestDTO) {

        Cliente cliente = mapper.toEntity(clienteRequestDTO);
        cliente.setDataCadastro(LocalDateTime.now());
        repository.save(cliente);

        return mapper.toResponse(cliente);

    }

    public ClienteResponseDTO atualizarCliente(Long id, ClienteRequestDTO clienteRequest) {
        return null;
    }

    public List<ClienteResponseDTO> listarClientes() {
        return mapper.toResponseList(repository.findAll());
    }

    public ClienteResponseDTO buscarPorId(Long id) {
        Cliente cliente = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cliente Não encontrado!"));
        return mapper.toResponse(cliente);
    }

    public void deletarCliente(Long id) {
        repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado!"));
        repository.deleteById(id);
    }
}
