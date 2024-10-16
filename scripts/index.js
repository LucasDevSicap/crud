$(document).ready(function() {
    function initializeSelects() {
        $('.form-select').select2({
            width: '100%',
            dropdownParent: $(".modal-content")
        });
        $('.form-multiple-select').select2({
            width: '100%',
            multiple: true,
            tags: true,
            dropdownParent: $(".modal-content"),
            createSearchChoice: function(term) {
                return term;
            },
            escapeMarkup: function(markup) {
                return markup;
            }
        });
    }
    function applyMasks() {
        $('#cpf').mask('000.000.000-00');
        $('#telephone').mask('(00) 9 0000-0000')
    }

    $('#cadastroModal').on('show.bs.modal', function () {
        initializeSelects();
        applyMasks();
    });
});


function createUser() {
    const userData = {
        name: $('#name').val(),
        cpf: $('#cpf').val(),
        telephone: $('#telephone').val(),
        email: $('#email').val(),
        cidade: $('#cidade').val(),
        estado: $('#estado').val(),
        especialidade: $('#especialidade').val(),
        stack: $('#stack').val(),
        linguagens: $('#linguagens').val(),
        nivel: $('#nivel').val()
    };

    $.ajax({
        url: 'http://localhost/crud-php/cadastro.php',
        type: 'POST',
        data: userData,
        success: function(response) {
            Swal.fire('Sucesso!', response.message, 'success');
            $('#cadastroModal').modal('hide'); 
            $('#results').append(`
                <tr>
                    <td>${userData.name}</td>
                    <td>${userData.cpf}</td>
                    <td>${userData.cidade}</td>
                    <td>${userData.email}</td>
                    <td>${userData.telephone}</td>
                </tr>
            `);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            Swal.fire('Erro!', 'Ocorreu um erro ao cadastrar. Tente novamente.', 'error');
        }
    });
}

